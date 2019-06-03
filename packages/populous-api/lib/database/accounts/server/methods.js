import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { statuses, populousEvents } from 'meteor/populous:constants';
import speakeasy from 'speakeasy';
import User from "../model";
import File from "../../files/model";
import PopulousEmitter from "../../../server/PopulousEmitter";
import checkAuth from "../../helpers/checkAuth";
import trulioService from "../../../server/trulioService";

Meteor.methods({
  'account.emailExist'(email) {
    return Accounts.findUserByEmail(email) != null;
  },
  'users.getUserByEmail'(email) {
    return Accounts.findUserByEmail(email);
  },
  'users.token'(token){
    return User.findOne({ 'services.password.reset.token': token });
  },
  'users.checkToken'(){
    const user = Meteor.user();
    if (user) {
      return user.services.resume.loginTokens.length === 1;
    }
  },
  'users.checkEmailVerified'(userId){
    const user = User.findOne({ '_id': userId });
    if (user) {
      return user.emailAddressVerified();
    }

    return false;
  },
  // uses on mobile and desktop
  'users.onAfterInsert' : (userId) => {
    const astronomyUser = User.findOne(userId);

    if(!astronomyUser){
      return;
    }

    if(astronomyUser.isBorrower()){
      try{
        astronomyUser.getSics();
      }catch(error){
        console.log('sic code error ' + astronomyUser._id + ': ', error);
      }
    }

    // Autocomplete default fields
    astronomyUser.save();
  },
  'users.verifyEmailByToken'(token) {
    const astronomyUser = User.findOne({"services.email.verificationTokens.0.token": token});

    if(astronomyUser){
      if(!astronomyUser.emails[0].verified){
        astronomyUser.emails[0].verified = true;
        astronomyUser.save();
      }

      return true;
    } else {
      throw new Meteor.Error(400, 'Token is invalid!');
    }
  },
  'users.generate2faKey'(){
    return speakeasy.generateSecret({
      length: 20,
      name: 'Populous-mobile'
    });
  },
  'user.verify2faSetup'(code, string){
    const userId = checkAuth();
    const isVerified = speakeasy.totp.verifyDelta({
      secret: string,
      encoding: 'hex',
      token,
      window: 1,
    });

    if(!isVerified){
      throw new Meteor.Error('Error', 'That code is invalid, please try again');
    }

    const currentUser = User.findOne(userId);

    if(currentUser){
      currentUser.save2FASecret(string, (err, user) => {
        if (err) {
          throw new Meteor.Error('Error', err.reason);
        }
        return user;
      });
    } else {
      throw new Meteor.Error('Error', 'User not found');
    }
  },
  'user.verify2faCode'({secret: secretInput, user: userInput, token, resetPasswordToken}) {
    let secret = secretInput;

    if (!secret) {
      let user = userInput;

      if (!user || typeof user !== 'object') {
        if (resetPasswordToken) {
          user = User.findOne({'services.password.reset.token': resetPasswordToken})
        } else {
          user = User.findOne(Meteor.userId())
        }
      }

      if (!user) {
        throw new Meteor.Error('Error', 'User not found');
      }

      secret = user.twoFAKey;
    }

    const isVerified = speakeasy.totp.verifyDelta({
      secret,
      encoding: 'hex',
      token,
      window: 1,
    });

    if (!isVerified) {
      throw new Meteor.Error('Error', 'That code is invalid, please try again');
    }
  },
  'user.tryToUpdateUnsupportedCountry'() {
    const userId = checkAuth();
    const user = User.findOne(userId);

    if (user && user.hasUnsupportedCountry()) {
      if (user.KYCResult
        && user.KYCResult.TransactionRecordID) {
        Meteor.defer(() => {
          trulioService
            .getUserRecord(user.KYCResult.TransactionRecordID)
            .then(({data: {CountryCode}}) => {
              if (!CountryCode) {
                console.log(`Country is not exits for verified user ${userId} in twilio record`);
                return;
              }
              user.updateUnsupportedCountry(CountryCode);
            })
            .catch(console.log.bind(undefined, 'Unsupported country update error from trulio: '));
        });
      } else if (user.isVerifiedKyc() && !user.KYCResult) {
        // Update user omit any validations and other astronomy logic
        Meteor.users.update(
          {
            _id: user._id
          },
          {
            $set: {
              KYCStatus: statuses.unverified,
            }
          },
        );
      }
    }
  },
  async 'user.update'(updateObj){
    const userId = checkAuth();
    const user = User.findOne(userId);
    for (let prop in updateObj) {
      if(updateObj.hasOwnProperty(prop) && user.hasOwnProperty(prop)) {
        user[prop] = updateObj[prop];
      }
    }
    user.validate();

    PopulousEmitter.emit(populousEvents.changesProfile, userId);

    return user.save();
  },
  async 'user.getSupportedDocuments'(countryISO){
    if(!countryISO) {
      throw new Meteor.Error('Error', 'Country code is missing')
    }
    const userId = checkAuth();
    const user = User.findOne(userId);
    const documents = await user.getSupportedDocuments(countryISO);
    if(!documents && countryISO) {
      throw Meteor.Error('Error', 'Wrong country code')
    }
    return documents;
  },
  async 'user.getAvatar'(){
    const userId = checkAuth();
    const user = User.findOne(userId);
    const avatar = user.avatar();
    if(!avatar) {
      throw Meteor.Error('Error', 'Avatar not found')
    }
    return avatar.link();
  },
  async 'user.updateBidPresets'(fixedAmounts, step){
    const userId = checkAuth();
    const user = User.findOne(userId);
    await user.updateBidPresets(fixedAmounts, step);
  },
  'user.confirmTerms'(){
    const userId = checkAuth();
    const user = User.findOne(userId);
    return user.confirmTerms();
  },
  async 'user.checkKYCFiles'() {
    const userId = checkAuth();
    const user = User.findOne(userId);
    const {addressDocumentIds = [], bankStatementDocumentIds = [], idDocumentIds = [], livePhotoIds = []} = user;

    const kycFilesIds = [
      ...bankStatementDocumentIds,
      ...idDocumentIds,
      ...addressDocumentIds,
      ...livePhotoIds,
    ];

    const existingFilesIds = await File
      .find({
        _id: {$in: kycFilesIds},
      })
      .map(({_id}) => _id);

    const removeLinksToMissingFiles = (userFiles) => {
      if (!userFiles) {
        return userFiles;
      }

      return userFiles.filter(userFileId => existingFilesIds.includes(userFileId))
    };

    user.bankStatementDocumentIds = removeLinksToMissingFiles(bankStatementDocumentIds);
    user.idDocumentIds = removeLinksToMissingFiles(idDocumentIds);
    user.addressDocumentIds = removeLinksToMissingFiles(addressDocumentIds);
    user.livePhotoIds = removeLinksToMissingFiles(livePhotoIds);
    await user.save();
  },
});
