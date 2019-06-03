import { Meteor } from 'meteor/meteor';
import { DDP } from 'meteor/ddp-client';
import { Accounts } from 'meteor/accounts-base';
import { Class } from 'meteor/jagi:astronomy';
import { Random } from 'meteor/random';
import moment from 'moment';
import {
  requestTypes,
  areaCodes,
  averageInvoiceValues,
  averageInvoiceVolumes,
  bankDetailsFields,
  countries,
  currencies,
  personalDetailsFields,
  statuses,
  accountStatuses,
  userRoles,
  tierFees,
  blockchainActionTypes,
  blockchainActionStatuses,
  genders,
  userProviderStatuses,
  nonEditableVerifiedFields,
  documentTypes
} from 'meteor/populous:constants';

import Request from "../requests/model";
import EthId from '../eth_ids/model';
import File from '../files/model';
import '../validators';
import Wallet from "../wallet/model";
import BlockchainAction from "../blockchainAction/model";
import TermsAndConditions from "../terms_and_conditions/model";


// Email sub-type
const UserEmail = Class.create({
  name: 'UserEmail',
  fields: {
    address: {
      type: String,
      validators: [{ type: 'required' }, { type: 'email' }]
    },
    verified: Boolean
  }
});

const twoFAToken = Class.create({
  name: 'twoFAToken',
  fields: {
    token: {
      type: String
    },
    when: {
      type: Date
    }
  }
});


const UserProvider = Class.create({
  name: 'UserProvider',
  /* No collection attribute */
  fields: {
    isEnabled: {
      type: Boolean,
    },
    canRecord: {
      type: Boolean,
    },
    status: {
      type: String,

      validators: [
        {
          type: 'choice',
          param: Object.values(userProviderStatuses)
        }
      ]
    },
  },
});

const settingsDefaults = {
  auctions: {
    marketFilter: {},
    bidPresets: {
      fixedAmounts: [50, 100, 100],
      step: 10,
    },
  }
};

const BidPresets = Class.create({
  name: 'UserSettingsAuctionsBidPresets',
  fields: {
    fixedAmounts: {
      type: [Number],
    },
    step: {
      type: Number
    },
  }
});

const Auctions = Class.create({
  name: 'UserSettingsAuctions',
  fields: {
    bidPresets: {
      type: BidPresets,
      default: {
        ...settingsDefaults.auctions.bidPresets,
      },
    },
  }
});

const UserSettings = Class.create({
  name: 'UserSettings',
  fields: {
    marketFilter: {
      type: Object,
      default: {
        ...settingsDefaults.marketFilter,
      },
    },
    auctions:{
      type: Auctions,
      default: {
        ...settingsDefaults.auctions,
      }
    }
  },
});

const ZohoInfo = Class.create({
  name: 'ZohoInfo',
  fields: {
    contactId: {
      type: String,
      optional: true,
    },
    accountId: {
      type: String,
      optional: true,
    },
  },
});

const User = Class.create({
  name: 'User',
  collection: Meteor.users,

  fields: {
    // Meteor & package fields \\

    emails: {
      type: [UserEmail],
      immutable: false,
    },

    recoveryEmail: {
      type: String,
      validators: [{ type: 'email' }],
      optional: true,
    },

    status: {
      type: Object,
      optional: true,
      immutable: true,
      default: () => {
        return { online: false };
      }
    },

    // Custom user fields \\

    role: {
      type: String,
      immutable: true,
      validators: [
        {
          type: 'choice',
          param: Object.values(userRoles)
        }
      ]
    },
    firstName: {
      optional: true,
      type: String,
      validators: [{ type: 'required' }, { type: 'minLength', param: 1 }, { type: 'maxLength', param: 20 }]
    },
    lastName: {
      optional: true,
      type: String,
      validators: [{ type: 'required' }, { type: 'minLength', param: 1 }, { type: 'maxLength', param: 20 }]
    },
    gender: {
      type: String,
      optional: true,
      validators: [
        {
          type: 'choice',
          param: Object.values(genders)
        }
      ]
    },
    dateOfBirth: {
      type: String,
      optional: true,
    },
    nickname: {
      type: String,
      optional: true,
      validators: [{ type: 'required' }, { type: 'minLength', param: 1 }, { type: 'maxLength', param: 20 }]
    },
    phoneAreaCode: {
      type: String,
      optional: true,
      validators: [
        {
          type: 'choice',
          param: areaCodes.map(c => c.code)
        }
      ],
    },
    phoneNumber: {
      type: String,
      optional: true,
      validators: [{ type: 'onlyNumbers' }, { type: 'maxLength', param: 14 }]
    },
    timezone: {
      type: String,
      optional: true,
      validators: [{ type: 'required' }]
    },
    occupation: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 20 }]
    },

    titlePosition: {
      type: String,
      optional: true,
    },

    // Business info fields \\

    companyName: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 70 }]
    },
    companyNumber: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 20 }]
    },
    companyDescription: {
      type: String,
      optional: true
    },
    employeeNumber: {
      type: String,
      optional: true
    },

    sic: {
      type: [String],
      optional: true
    },

    latestZScore: {
      type: Number,
      optional: true,
      default: 1,
    },
    zscore: {
      type: Object,
      optional: true,
      default: {}
    },

    // Address fields \\

    addressLine1: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 70 }]
    },
    addressLine2: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 70 }]
    },
    residentalAddressLine1: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 70 }]
    },
    residentalAddressLine2: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 70 }]
    },
    city: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 70 }]
    },
    residentalCity: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 70 }]
    },
    postcode: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 10 }]
    },
    residentalPostcode: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 10 }]
    },
    country: {
      optional: true,
      type: String,
      validators: [
        {
          type: 'choice',
          param: countries.map(c => c.key),
          resolveError: ({ name, param, doc })=>{
            return Meteor.user().role===userRoles.admin
              ? "User's country is not present in country list."
              : 'Your country is currently not supported. Please try again, or contact Populous info@populous.world';
          }
        }
      ],
    },
    residentalCountry: {
      type: String,
      optional: true,
      validators: [
        {
          type: 'choice',
          param: countries.map(c => c.key),
          resolveError: ({ name, param, doc })=>{
            return Meteor.user().role===userRoles.admin
              ? 'Residential country is not present in country list.'
              : 'Residential country, that you specified, where you are live, is not supported by automated verification system.\n' +
              'Our admin will contact you in closest time or you can email us to kyc@populous.world';
          }
        }
      ],
    },
    socialInsuranceNumber: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 70 }]
    },
    passport: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 70 }]
    },

    // Bank details \\

    accountNumber: {
      type: String,
      optional: true,
      validators: [{ type: 'onlyNumbers' }, { type: 'length', param: 8 }]
    },

    sortCode: {
      type: String,
      optional: true,
      validators: [{ type: 'onlyNumbers' }, { type: 'length', param: 6 }]
    },

    iban: {
      type: String,
      optional: true,
      validators: [{ type: 'maxLength', param: 32 }]
    },

    // KYC data \\

    averageInvoiceValue: {
      type: String,
      optional: true,
      validators: [
        {
          type: 'choice',
          param: Object.values(averageInvoiceValues)
        }
      ]
    },

    averageInvoiceVolume: {
      type: String,
      optional: true,
      validators: [
        {
          type: 'choice',
          param: Object.values(averageInvoiceVolumes)
        }
      ]
    },

    preferredCurrency: {
      type: String,
      optional: true,
    },

    bankStatementDocumentIds: {
      type: [String],
      optional: true
    },

    idDocumentIds: {
      type: [String],
      optional: true
    },

    idDocumentType: {
      type: String,
      validators: [
        {
          type: 'choice',
          param: Object.keys(documentTypes)
        }
      ],
      optional: true
    },

    livePhotoIds: {
      type: [String],
      optional: true
    },

    addressDocumentIds: {
      type: [String],
      optional: true
    },

    KYCStatus: {
      type: String,
      validators: [
        {
          type: 'choice',
          param: Object.values(statuses)
        }
      ],
      default: statuses.unverified
    },

    KYCResult: {
      type: Object,
      optional: true
    },

    // 2 factor auth \\

    // the key is a 20 character hex string (40 chars)
    twoFAKey: {
      type: String,
      optional: true,
      validators: [{ type: 'length', param: 40 }]
    },

    twoFAKeyIDFiles: {
      type: [String],
      optional: true
    },

    smsVerificationCode: {
      type: Number,
      optional: true
    },

    // Ethereum properties \\

    PPTAddress: {
      type: String,
      optional: true,
      validators: [{ type: 'length', param: 42 }]
    },
    twoFAToken: {
      type: [twoFAToken],
      optional: true
    },
    isBlocked: {
      type: Boolean,
      optional: true
    },
    isTermsConfirmed: {
      type: Boolean,
      optional: true,
    },
    termsVersionConfirmed: {
      type: Number,
      optional: true,
      default: 0
    },

    // Avatar \\
    avatarId: {
      type: String,
      optional: true
    },

    // Account Status \\

    accountStatus: {
      type: String,
      validators: [
        {
          type: 'choice',
          param: Object.values(accountStatuses)
        }
      ],
      default: accountStatuses.active
    },

    tier: {
      type: Number,
      default: tierFees[3],
      validators: [
        {
          type: 'choice',
          param: Object.values(tierFees),
        },
      ]
    },
    provider: {
      type: UserProvider,
      optional: true,
    },
    settings: {
      type: UserSettings,
      default: settingsDefaults,
    },

    referenceId: {
      type:String,
      optional: true,
      immutable: true,
    },

    kycVerificationAttemptsCount:{
      type: Number,
      optional: true,
      default: 0,
    },

    lastKycVerificationAttemptDate:{
      type: Date,
      optional: true,
    },

    zohoInfo:{
      type: ZohoInfo,
      default: {},
    },

  },

  helpers: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    getPhoneNumber() {
      return this.phoneAreaCode + this.phoneNumber;
    },
    emailAddress() {
      return this.emails[0].address;
    },
    emailAddressVerified() {
      return this.emails[0].verified;
    },
    isAdmin() {
      return this.role === userRoles.admin;
    },
    isInvestor() {
      return this.role === userRoles.investor;
    },
    isBorrower() {
      return this.role === userRoles.borrower;
    },
    ethId() {
      return EthId.findOne({ userId: this._id }).ethId;
    },
    getPPTAddress() {
      return Wallet.findOne({ userId: this._id });
    },
    isVerifiedKyc() {
      return this.KYCStatus === statuses.verified;
    },
    isActive() {
      return this.accountStatus === accountStatuses.active;
    },
    getBidName(){
      return this.nickname || this.firstName;
    },
    address() {
      var address = '';
      let country = '';
      if (this.addressLine1) address += this.addressLine1 + ', ';
      if (this.addressLine2) address += this.addressLine2 + ', ';
      if (address.slice(-2) == ', ') address = address.slice(0, -2);
      if (address != '') address += '\n';
      if (this.city) address += this.city + ', ';
      if (this.country){
        country = countries.find((country) => {
          return country.key == this.country
        });
        address += country ? country.name + ', ' : '[not found], '
      }
      if (this.postcode) address += this.postcode;
      if (address.slice(-2) == ', ') address = address.slice(0, -2);
      if (address == '') address = '-'
      return address;
    },
    avatar() {
      return File.findOne({ _id: this.avatarId });
    },
    twoFAKeyIDFile() {
      let files = this.twoFAKeyIDFiles || [];
      const file = files[files.length - 1];
      return File.findOne({ _id: file, verified: false });
    },
    canWithdrawPPT() {
      return !BlockchainAction.findOne({
        userId: this._id,
        status: blockchainActionStatuses.pending,
        title: 'PPT',
        type: blockchainActionTypes.withdraw,
      });
    },
    canWithdrawXAUp() {
      return !BlockchainAction.findOne({
        userId: this._id,
        status: blockchainActionStatuses.pending,
        title: 'XAU',
        type: blockchainActionTypes.withdraw,
      });
    },
    canExchangeXAUp() {
      return !BlockchainAction.findOne({
        userId: this._id,
        status: blockchainActionStatuses.pending,
        type: blockchainActionTypes.exchangeXaup,
      });
    },
    async canImportPokens(currencySymbol){
      return !await BlockchainAction.findOne({
        userId: this._id,
        status: blockchainActionStatuses.pending,
        type: blockchainActionTypes.import,
        title: currencySymbol
      });
    },
    isSubmitProviderRequestPossible(){
      return (this.isVerifiedKyc()
        && (this.companyName && this.companyNumber));
    },
    isProvider(){
      return (this.isInvestor()
        && typeof this.provider === 'object'
        &&  this.provider.isEnabled
        && this.provider.status === userProviderStatuses.completed);
    },
    isProviderPending(){
      return (this.isInvestor()
        && typeof this.provider === 'object'
        &&  this.provider.isEnabled
        && this.provider.status === userProviderStatuses.pending);
    },
    hasProviderPermissions(permission){
      return !!(this.provider && this.provider[permission]);
    },
    isAbleToRequestKycVerification(returnBool = false) {
      // Always pass check if attempts counter less then maximum
      if (this.kycVerificationAttemptsCount < 10 || !this.lastKycVerificationAttemptDate) {
        return true;
      }

      // If attempts counter is higher or equal then maximum then check is last request was today
      const now = moment().utc().startOf('day');
      const lastVerifyRequestDate = moment(this.lastKycVerificationAttemptDate).utc().startOf('day');
      const result = !lastVerifyRequestDate.isSame(now, 'day');

      if (returnBool) {
        return result
      } else {
        if (!result) {
          throw new Meteor.Error(403, 'KYC verification is forbidden. Please try later');
        }
      }
    },
    hasUnsupportedCountry(){
      // skip this method if country isn't set or status verified
      if(!this.residentalCountry || (!this.country && this.isBorrower())){
        return false;
      }

      const availableCountries = countries.map(({key}) => key);

      return (!availableCountries.includes(this.residentalCountry )
        || (this.isBorrower() && !availableCountries.includes(this.country)));
    },
    checkTerms(){
      return (
        this.isTermsConfirmed
        && this.termsVersionConfirmed === (new TermsAndConditions().getCurrentVersion())
      );
    },
  },

  behaviors: ['timestamp'],

  meteorMethods: {
    updatePersonalDetails(updates) {
      // Loop through the personal detail fields
      // and update the values of the current user
      personalDetailsFields.forEach(f => {
        if (updates.hasOwnProperty(f) && !(this.isVerifiedKyc() && nonEditableVerifiedFields.includes(f))) {
          this[f] = updates[f];
        }
      });
      this.save();

      return this;
    },

    updateBankDetails(updates) {
      // Loop through the bank details fields
      // and update the values of the current user
      bankDetailsFields.forEach(f => {
        const val = updates[f];
        if (val) {
          this[f] = updates[f];
        }
      });

      this.save();

      return this;
    },

    save2FASecret(key) {
      this.twoFAKey = key;
      this.save();
      return this; // return the user object
    },

    remove2FASecret() {
      this.twoFAKey = null;
      this.save();
      const files = this.twoFAKeyIDFiles || [];
      File.update({ _id: { $in: files } }, { $set: { verified: true } }, { multi: true });

      const requests = Request.find({
        userId: this._id,
        type: requestTypes.reset2fa,
        isComplete: false
      });

      requests.forEach((request)=>{
        request.isComplete = true;
        request.save();
      });

      return this;
    },

    decline2FASecret() {
      const files = this.twoFAKeyIDFiles || [];
      File.update({ _id: { $in: files } }, { $set: { verified: true } }, { multi: true });

      const requests = Request.find({
        userId: this._id,
        type: requestTypes.reset2fa,
        isComplete: false
      });

      requests.forEach((request)=>{
        request.isComplete = true;
        request.save();
      });

      return this;
    },

    changePassword(newPassword) {
      const meteor = DDP._CurrentInvocation.get();
      if (!meteor.userId) {
        throw new Meteor.Error('Not found', 'No user found');
      }
      const admin = User.findOne(meteor.userId);
      if (!admin || !admin.isAdmin()) {
        throw new Meteor.Error('Permission', 'Action not allowed');
      }

      Accounts.setPassword(this._id, newPassword);
      return this;
    },

    suspendAccount() {
      const meteor = DDP._CurrentInvocation.get();
      if (!meteor.userId) {
        throw new Meteor.Error('Not found', 'No user found');
      }
      const admin = User.findOne(meteor.userId);
      if (!admin || !admin.isAdmin()) {
        throw new Meteor.Error('Permission', 'Action not allowed');
      }
      this.accountStatus = accountStatuses.suspended;
      this.save();
      return this;
    },

    activateAccount() {
      const meteor = DDP._CurrentInvocation.get();
      if (!meteor.userId) {
        throw new Meteor.Error('Not found', 'No user found');
      }
      const admin = User.findOne(meteor.userId);
      if (!admin || !admin.isAdmin()) {
        throw new Meteor.Error('Permission', 'Action not allowed');
      }
      this.accountStatus = accountStatuses.active;
      this.save();
      return this;
    },

    destroy() {
      const meteor = DDP._CurrentInvocation.get();
      if (!meteor.userId) {
        throw new Meteor.Error('Not found', 'No user found');
      }
      const admin = User.findOne(meteor.userId);
      if (!admin || !admin.isAdmin()) {
        throw new Meteor.Error('Permission', 'Action not allowed');
      }
      return this.remove();
    },

    updateUserByEmail(email) {
      const meteor = DDP._CurrentInvocation.get();
      Meteor.users.update({ _id: meteor.userId }, { $set: { 'emails.0.address': email, 'emails.0.verified': false } });
      this.emails[0].address = email;
      return this;
    },

    updateUserRecoveryEmail(email) {
      const meteor = DDP._CurrentInvocation.get();
      Meteor.users.update({ _id: meteor.userId }, { $set: { 'recoveryEmail': email } });
      this.recoveryEmail = email;
      return this;
    },

    saveAvatar(fileId) {
      this.avatarId = fileId;
      this.save();
      return this;
    },

    removeNickname() {
      this.nickname = null;
      this.save();
      return this;
    },

    confirmTerms() {
      this.isTermsConfirmed = true;
      this.termsVersionConfirmed = new TermsAndConditions().getCurrentVersion();
      this.save();
      return this;
    }
  }
});

export default User;
