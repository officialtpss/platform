import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { configServices } from 'meteor/populous:config';
import stream from 'stream';
import fs from 'fs';
import {Random} from 'meteor/random';
import CryptoJS from 'crypto-js';

import { s3Instance, getOptions } from "../../../server/s3Server";
import File from '../model';
import {encryptKey} from "../../../server/config";

const {lastBucketKeyService} = configServices;
const isS3enabled = ( process.env.S3_SECRET && process.env.S3_ACCESS_KEY && process.env.S3_REGION && process.env.S3_BUCKET_NAME);
const directory = process.env.S3_BUCKET_DIRECTORY || 'local';

File.encrypt = function (filePath, ownerId, shouldSave = true) {
  const dataFile = fs.readFileSync(filePath);
  const dataBase64 = dataFile.toString('base64');
  const encryptFile = CryptoJS.AES.encrypt(dataBase64, encryptKey, {iv: ownerId});
  const buffer =  new Buffer(encryptFile.toString(), 'base64');

  if(shouldSave){
    fs.writeFileSync(filePath, buffer);
  }else{
    return buffer;
  }
};

const originOnAfterUpload = File.onAfterUpload;
File.onAfterUpload = async function(fileObj){
  await originOnAfterUpload.call(this, fileObj);

  for (const version in fileObj.versions) {

    const vRef = fileObj.versions[version];

    let fileReadBuffer;
    if (fileObj.meta && fileObj.meta.crypto) {
      fileReadBuffer = this.encrypt(vRef.path, fileObj.userId, !isS3enabled);
    } else if (isS3enabled){
    fileReadBuffer = fs.createReadStream(vRef.path);
  }

  if(!isS3enabled){
    return true;
  }

    // We use Random.id() instead of real file's _id
    // to secure files from reverse engineering on the AWS client
    const filePath = `${directory}/zzzz-${moment().utc().unix()}-${Random.id()}-${version}.${fileObj.extension}`;

    // Create the AWS:S3 object.
    // Feel free to change the storage class from, see the documentation,
    // `STANDARD_IA` is the best deal for low access files.
    // Key is the file name we are creating on AWS:S3, so it will be like files/XXXXXXXXXXXXXXXXX-original.XXXX
    // Body is the file stream we are sending to AWS
    await s3Instance.putObject({
      // ServerSideEncryption: 'AES256', // Optional
      StorageClass: 'STANDARD',
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filePath,
      Body: fileReadBuffer,
      ContentType: vRef.type,
    }, async (error) => {
        if (error) {
          console.error(error);
        } else {
          // Update FilesCollection with link to the file at AWS
          const upd = {$set: {}};
          upd['$set']['versions.' + version + '.meta.pipePath'] = filePath;

          await this.collection.update(
            {
            _id: fileObj._id
          },
            upd,
            (updError) => {
            if (updError) {
              console.error(updError);
            } else {
              // Unlink original files from FS after successful upload to AWS:S3
             this.unlink(this.collection.findOne(fileObj._id), version);
            }
          });
        }
    });
  }
};


const originInterceptDownload = File.interceptDownload;

File.interceptDownload = function(http, fileRef, version) {
  const opts = getOptions(fileRef);

  if (opts) {
    // If file is successfully moved to AWS:S3
    // We will pipe request to AWS:S3
    // So, original link will stay always secure

    // To force ?play and ?download parameters
    // and to keep original file name, content-type,
    // content-disposition, chunked "streaming" and cache-control
    // we're using low-level .serve() method
    const opts = getOptions(fileRef);

    if (http.request.headers.range) {
      const vRef = fileRef.versions[version];
      let range = _.clone(http.request.headers.range);
      const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
      const start = parseInt(array[1]);
      let end = parseInt(array[2]);
      if (isNaN(end)) {
        // Request data from AWS:S3 by small chunks
        end = (start + this.chunkSize) - 1;
        if (end >= vRef.size) {
          end = vRef.size - 1;
        }
      }
      opts.Range = `bytes=${start}-${end}`;
      http.request.headers.range = `bytes=${start}-${end}`;
    }

    const fileColl = this;
    s3Instance.getObject(opts, function (error) {
      if (error) {
        console.error(error);
        if (!http.response.finished) {
          http.response.end();
        }
      } else {
        if (http.request.headers.range && this.httpResponse.headers['content-range']) {
          // Set proper range header in according to what is returned from AWS:S3
          http.request.headers.range = this.httpResponse.headers['content-range'].split('/')[0].replace('bytes ', 'bytes=');
        }

        let fileBuffer = this.data.Body;
        if (fileRef.meta && fileRef.meta.crypto) {
          throw new Meteor.Error(403, 'Access forbidden');
        }

        const dataStream = new stream.PassThrough();
        fileColl.serve(http, fileRef, fileRef.versions[version], version, dataStream);
        dataStream.end(fileBuffer);
      }
    });

    return true;
  }
  // While file is not yet uploaded to AWS:S3
  // It will be served file from FS
  return false;
};

File.deleteS3Objects = function(filesIds = []) {

  if(!filesIds.length){
    return;
  }

  const filesOptions = {
    Delete: {
      Objects: [],
      Quiet: false
    }
  };

  if (isS3enabled) {
    filesIds.forEach(documentId => {
      const file = File.findOne(documentId);
      const fileS3Opts = getOptions(file);

      if (fileS3Opts) {
        filesOptions.Bucket = fileS3Opts.Bucket;
        filesOptions.Delete.Objects.push({Key: fileS3Opts.Key});
      }
    });
  }

  if(!filesOptions.Delete.Objects.length){
    File.collection.remove({_id: {$in: filesIds}});
    return;
  }

  (new Promise((resolve, reject) => {

    if (isS3enabled) {
      s3Instance.deleteObjects(filesOptions, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    } else {
      resolve(null);
    }
  }))
    .then((response) => {
      File.collection.remove({_id: {$in: filesIds}});
    })
    .catch((error) => {
      throw new Meteor.Error(500, error.message);
    });
};

const getBucketFiles = async (previousResponse) => {
  const query = {
    Bucket: process.env.S3_BUCKET_NAME,
    'Prefix': directory,
  };

  if(previousResponse && previousResponse.NextContinuationToken){
    query.ContinuationToken = previousResponse.NextContinuationToken;
  }else if(!previousResponse){
    const lastBucketKey = await lastBucketKeyService.getCurrent();

    if(lastBucketKey){
      query.StartAfter = lastBucketKey;
    }
  }

  return new Promise((resolve, reject) => {
    s3Instance.listObjectsV2(query,
      (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response);
      })
  })
};

const clearBucketMethod = async (previousResponse) => {
  getBucketFiles(previousResponse)
    .then(async (response) => {
      const {Contents, IsTruncated} = response;

      if (!Contents.length) {
        return;
      }

      for (let i = 0; i < Contents.length; i++) {
        const currentBucketFile = Contents[i];

        if (await !File.findOne({'versions.original.meta.pipePath': currentBucketFile.Key})) {
          s3Instance.deleteObject(
            {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: currentBucketFile.Key,
            },
            (deleteError, deleteResponse) => {
              if (deleteError) {
                return console.log(`Clear file ${currentBucketFile.Key} error: `, deleteError.message);
              }
            });
        }
      }

      if (IsTruncated) {
        setTimeout(() => {
          clearBucketMethod(response);
        }, 1500);
      } else {
        await lastBucketKeyService.saveOrUpdate(Contents[Contents.length - 1].Key);
      }
    })
};

File.clearBucket = () => {
  clearBucketMethod();
};
