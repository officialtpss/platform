import axios from 'axios';
import CryptoJS from 'crypto-js';
import {statuses} from 'meteor/populous:constants';
import moment from 'moment';

import File from "../database/files/model";
import {s3Instance, getOptions} from "./s3Server";
import {encryptKey} from "./config";
import trulioService from "./trulioService";


const getDocumentFromS3 = async (documentId, ownerId) => {
  const file = File.findOne(documentId);
  const opts = getOptions(file);
  const documentBase64 = await new Promise((resolve, reject) => {
    s3Instance.getObject(opts, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this.data.Body.toString('base64'));
      }
    });
  });

  const decryptFile = CryptoJS.AES.decrypt(documentBase64, encryptKey, {iv: ownerId});
  return decryptFile.toString(CryptoJS.enc.Utf8);
};

const verificationKYC = async (user) => {
  user.isAbleToRequestKycVerification();

  // If logic came here, it means that counter less that maximum or last request was before today
  const now = moment().utc().startOf('day');
  const lastVerifyRequestDate = moment(user.lastKycVerificationAttemptDate).utc().startOf('day');

  if (!lastVerifyRequestDate.isSame(now, 'day')) {
    // Reset counter if last request date was before today
    delete user.kycVerificationAttemptsCount;
    user.save();
  }

  const userResidentalCountry = user.residentalCountry;
  const requestDocumments = {};
  if (user.idDocumentIds && user.idDocumentIds[0]) {
    requestDocumments.DocumentFrontImage = await getDocumentFromS3(user.idDocumentIds[0], user._id);
  }
  if (user.idDocumentIds && user.idDocumentIds[1]) {
    requestDocumments.DocumentBackImage = await getDocumentFromS3(user.idDocumentIds[1], user._id);
  }
  if (user.livePhotoIds && user.livePhotoIds[0]) {
    requestDocumments.LivePhoto = await getDocumentFromS3(user.livePhotoIds[0], user._id);
  }

  requestDocumments.DocumentType = user.idDocumentType;

  const requestData = {
    "AcceptTruliooTermsAndConditions": true,
    "CleansedAddress": false,
    "VerboseMode": true,
    "ConfigurationName": "Identity Verification",
    "CountryCode": userResidentalCountry,
    "DataFields": {
      "PersonInfo": {
        "FirstGivenName": user.firstName,
        "FirstSurName": user.lastName
      },
      "Document": requestDocumments
    }
  };

  try {
    const {data: {TransactionID, Record: {TransactionRecordID, RecordStatus}}} = await trulioService.verifyUser(requestData);

    user.KYCResult = {
      TransactionID: TransactionID,
      TransactionRecordID: TransactionRecordID
    };
    user.KYCStatus = RecordStatus === 'match' ? statuses.verified :  statuses.unverified;
    user.kycVerificationAttemptsCount = (user.kycVerificationAttemptsCount || 0) + 1;
    user.lastKycVerificationAttemptDate = moment().utc().toDate();

    await user.save();

    user.updateZohoDocument()
  } catch (error) {
    console.log('Trulioo API ERROR', error.message);
  }
};

export default verificationKYC;
