import getSupportedDocuments from './getTruliooSupportedDocuments';
import { sendToVerifyKYCDocuments, saveTempData } from './upload-kyc-documents';
import { confirmPhoneNumber, verifySmsCode } from './confirmPhoneNumber';
import { getInitialLifePhoto } from './getLifePhoto';
import { setStep } from './setStep';

export {
  sendToVerifyKYCDocuments,
  saveTempData,
  getSupportedDocuments,
  confirmPhoneNumber,
  verifySmsCode,
  getInitialLifePhoto,
  setStep
};
