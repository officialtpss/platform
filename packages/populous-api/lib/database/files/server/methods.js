import fs from 'fs';
import { Meteor } from 'meteor/meteor';
import User from "../../accounts/model";
import CryptoJS from 'crypto-js';
import { s3Instance, getOptions } from "../../../server/s3Server";
import File from "../model";
import {encryptKey} from "../../../server/config";
import checkAuth from "../../helpers/checkAuth";

// Functions should return nothing or it will break create invoice logic
export async function removeFile(fileId){
  const file = await File.findOne(fileId);
  const user = await User.findOne(Meteor.userId());
  if (!file || (file.userId !== user._id && !user.isAdmin())) {
    throw new Meteor.Error(403, 'Access forbidden');
  }

  File.deleteS3Objects([fileId]);
}

Meteor.methods({
  async 'file.getDecryptFile'(fileId, fileType, ownerId) {
    const file = File.findOne(fileId);
    const user = await User.findOne(checkAuth());

    if (!user.isAdmin() && user._id !== ownerId) {
      throw new Meteor.Error(403, 'Access forbidden');
    }
    try {

      const opts = getOptions(file);
      let fileBase64;

      if (opts) {
        fileBase64 = await new Promise((resolve, reject) => {
          s3Instance.getObject(opts, function (error) {
            if (error) {
              reject(error);
            } else {
              resolve(this.data.Body.toString('base64'));
            }
          });
        });

      } else {
        fileBase64 = fs.readFileSync(file.versions.original.path).toString('base64');
      }

      const decryptFile = CryptoJS.AES.decrypt(fileBase64, encryptKey, {iv: ownerId});

      return 'data:' + fileType + ';base64,' + decryptFile.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.log('Unexpected file decrypt error', file._id, error.message);
      throw new Meteor.Error(400, 'File is not found');
    }
  },

  async 'file.upload'(file, type = 'image/png', fileName) {
    return await new Promise((resolve, reject) => {
      File.write(file, { fileName, type, meta: { crypto: true } }, (err, fileRef) => {
        if(!err) {
          if(fileRef.size > 3000000 || fileRef.size < 150000) {
            reject(new Meteor.Error('Error', 'File size must be at least 150 KB and not more than 3 MB'));
          } else {
            resolve(fileRef);
          }
        } else {
          reject(err);
        }
      });
    });
  },

  'file.remove': removeFile
});
