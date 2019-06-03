import {Meteor} from 'meteor/meteor';
import axios from 'axios';
import {
  sicList,
  averageInvoiceValues,
  averageInvoiceVolumes,
  companyDetails,
  getTierFee,
  ledgerActionsTypes,
  invoiceStatuses,
  blockchainActionTypes,
  blockchainActionStatuses,
  requestTypes,
  statuses,
  countries,
  userProviderStatuses,
  userProviderDefault,
  userSettingsDefault,
  emailTemplates,
  getEmailTemplate,
  populousEvents,
  userSubscriptionTypes,
} from 'meteor/populous:constants';
import ethApi from 'meteor/populous:eth-connect';
import {Random} from 'meteor/random';
import moment from "moment";

import User from '../model';
import LedgerBalance from '../../ledger_balance/model';
import Wallet from "../../wallet/model";
import Currency from "../../currencies/model";
import BlockchainAction from "../../blockchainAction/model";
import DepositLog from "../../deposit_log/model";
import ExchangeRate from "../../exchange_rate/model";
import LedgerLog from "../../ledger_log/model";
import Bid from "../../bid/model";
import Invoice from "../../invoices/model";
import SIC from "../../SIC/model";
import Request from "../../requests/model";
import EmailTemplate from "../../email_template/model";
import {DDP} from "meteor/ddp-client";
import File from "../../files/model";
import checkAuth from "../../helpers/checkAuth";
import verificationKYC from "../../../server/verificationKYC";
import twilioSendSMS from "../../../server/twilioSendSMS";
import {Email} from "meteor/email";
import ZohoSDK from "../../../server/ZohoSDK";
import roundNumber from "../../helpers/roundNumber";
import PopulousEmitter from "../../../server/PopulousEmitter";
import xbrlApiService from "../../../server/xbrlApiService";
import UserSubscription from "../../UserSubscription/model";
import { getZScoreForCompanyYear } from '../../helpers/zscore';


const {
  config: {contract: {_build: buildContract}},
  contracts: {
    dataManager: {getDepositAddress, getVersion, },
  }
} = ethApi;

User.extend({
  fields: {
    services: {
      // handle the password field
      type: Object,
      immutable: true,
      optional: true
    }
  },

  meteorMethods: {
    async isReferenceIdExists(referenceId) {
      const userId = checkAuth();

      if (referenceId === userId) {
        return false;
      }

      return !!(await User.findOne(referenceId));
    },
    async sendEmail({templateName, replaceObject = {}, body: providedBody, header,  subject: providedSubject}) {
      let body, subject;

      if (providedBody) {
        body = providedBody;
        subject = providedSubject;
      } else if (templateName) {
        const template = await EmailTemplate.findOne({systemName: templateName});
        if (template) {
          body = template.body;
          subject = template.subject;

          Object.keys(replaceObject).forEach((textKey) => {
            body = body.replace(textKey, replaceObject[textKey]);
          });
        }
      }

      if (!body || !subject) {
        console.log('Not enough of data for send email');
        return;
      }

      await Email.send({
        to: this.emailAddress(),
        from: companyDetails.supportEmail,
        subject,
        html: getEmailTemplate(body, header)
      });
    },
    getReferenceId() {
      if (this.isBorrower()
        && moment(this.createdAt).utc().add(1, 'year').isSameOrAfter(moment().utc())
        && this.isReferenceIdExists(this.referenceId)
      ) {
        return this.referenceId;
      }

      return undefined;
    },
    isUserHasInvoices() {
      const userId = checkAuth();

      return !!Invoice.findOne({borrowerId: userId})
    },
    blockUserByEmail(email) {
      const user = User.findOne({'emails.0.address': email});
      user.isBlocked = !user.isBlocked;
      user.save();
    },
    verifyUserByEmail(email) {
      const user = this.findUserByEmail(email);
      Meteor.users.update({_id: user._id}, {$set: {'emails.0.verified': !user.emails[0].verified}});
    },
    removeUserByEmail(email) {
      const user = this.findUserByEmail(email);
      user.remove();
    },

    // This allows `Accounts.findUserByEmail` to be called
    // on the client with `User.callMethod('findUserByEmail', ...)`
    findUserByEmail(email) {
      return new User(Accounts.findUserByEmail(email));
    },
    // This allows `Accounts.sendResetPasswordEmail` to be called
    // on the client by a users email
    sendPasswordResetForEmail(email) {
      const user = Accounts.findUserByEmail(email);

      if (!user) {
        throw new Meteor.Error('Not found', 'No user found with that email address');
      }

      return Accounts.sendResetPasswordEmail(user._id);
    },

    // This allows `Accounts.sendVerificationEmail` to be called
    // on the client by a users email
    sendEmailVerificationForEmail(email) {
      const user = Accounts.findUserByEmail(email);

      if (!user) {
        throw new Meteor.Error('Not found', 'No user found with that email address');
      }

      return Accounts.sendVerificationEmail(user._id);
    },

    updateUnsupportedCountry(country) {
      const currentUserId = checkAuth();
      const availableCountries = countries.map(({key}) => key);

      if(!country || !availableCountries.includes(country)){
        throw new Meteor.Error(400, 'Country is required and should be valid');
      }

      if (country && this._id === currentUserId && this.hasUnsupportedCountry()) {
        if (this.residentalCountry && !availableCountries.includes(this.residentalCountry)) {
          this.residentalCountry = country;
        }

        if (this.country && this.isBorrower() && !availableCountries.includes(this.country)) {
          this.country = country;
        }

        this.save();
      }
    },

    sendTwoFAKeyResetForEmail(email, shouldSearchByRecovery = false) {
      let user;

      if (shouldSearchByRecovery) {
        user = User.findOne({recoveryEmail: email});
      } else {
        user = User.findOne({"emails.address": email});
      }

      if (!user) {
        throw new Meteor.Error('Not found', 'No user found with that email address');
      }

      var tokenRecord = {
        token: Random.secret(),
        when: new Date()
      };
      Meteor.users.update({_id: user._id}, {$push: {twoFAToken: tokenRecord}});
      const verifyEmailUrl = Meteor.absoluteUrl(`reset-2-fa/${tokenRecord.token}`);
      const template = EmailTemplate.findOne({systemName: emailTemplates.ResetTwoFaKey.systemName});
      const userName = user.fullName();

      if (template) {
        const emailBody = template.body
          .replace('{{name}}', userName)
          .replace('{{link}}', verifyEmailUrl)
          .replace(new RegExp('{{supportMail}}', 'g'), companyDetails.supportEmail);

        Email.send({
          to: email,
          from: companyDetails.supportEmail,
          subject: template.subject,
          html: getEmailTemplate(emailBody)
        });
      }
    },
    checkTwoFAToken(token) {
      const user = User.findOne({twoFAToken: {$elemMatch: {token: token}}});
      if (!user || typeof user === "undefined") {
        throw new Meteor.Error('Error', 'Invalid Token');
      }
      if (!user.emails[0].verified) {
        throw new Meteor.Error('Not verified', 'Verify your email first');
      }
      user.twoFAKey = null;
      const index = user.twoFAToken.findIndex(comment => comment.token == token);
      user.twoFAToken.splice(index, 1);
      user.save();
    },
    sendInvoiceDeclinedEmail(invoice) {
      const template = EmailTemplate.findOne({systemName: emailTemplates.InvoiceDecline.systemName});
      const user = User.findOne({_id: invoice.borrower});
      const userName = user.fullName();
      const body = template.body.replace('{{name}}', userName).replace('{{invoiceNumber}}', invoice.invoiceNumber);

      if (template) {
        Email.send({
          to: this.emailAddress(),
          from: companyDetails.supportEmail,
          subject: template.subject,
          html: getEmailTemplate(body)
        });
      }
    },
    async createPPTAddress() {
      if (!this.isInvestor()) {
        throw new Meteor.Error(403, 'This action is forbidden');
      }

      const existingPPTAddress = await Wallet.findOne({userId: this._id});

      if (existingPPTAddress) {
        throw new Error('PPT address already exists');
      }


      const wallet = new Wallet({userId: this._id});
      await wallet.save();

      // NOTE: if user has outdated wallet version, should be handled by CRON for all users.

      const blockchainAction = new BlockchainAction({
        userId: this._id,
        type: blockchainActionTypes.createAddress,
      });
      await blockchainAction.save();
    },

    async getBalance() {
      const wallet = await Wallet.findOne({userId: this._id});

      if (wallet && !wallet.isPending) {
        await wallet.getBalance();
      }
    },
    uploadTwoFAKeyIDFile(email, fileId) {
      const user = Accounts.findUserByEmail(email);
      if (!user) {
        throw new Meteor.Error('Not found', 'No user found with that email address');
      }

      const requestId = Request.insert({
        type: requestTypes.reset2fa,
        dataId: fileId,
        userId: user._id
      });

      Meteor.users.update({_id: user._id}, {$push: {twoFAKeyIDFiles: fileId}});
      PopulousEmitter.emit(populousEvents.authReset, user._id, requestId)
    },

    async getCurrencyBalance() {
      const meteor = DDP._CurrentInvocation.get();
      if (!meteor.userId) {
        throw new Error('No user logged in');
      }

      let result = {};

      const user = User.findOne({_id: meteor.userId});
      const currencies = Currency.find({isPending: false});

      if (currencies) {
        currencies.forEach((currency) => {
          const balance = LedgerBalance.findOne({
            userId: user.isAdmin() ? 'Populous' : meteor.userId,
            currency: currency.symbol,
          });

          if (balance) {
            result[balance.currency] = balance.amount;
          } else {
            result[currency.symbol] = 0;
          }
        })
      }

      return result;
    },

    /*
     * @desc update the borrower z-score at the time of login
     * this.zscore = {
     *   "2017": "2.4",
     *   "2016": "2.71",
     *   "2014": "2.58",
     * }
     */
    updateZScore() {
      if (!this.isBorrower()) return;
      const database = new MongoInternals.RemoteCollectionDriver(process.env.XBRL_MONGO);
      const zScoreDoc = database.open('z_scores').findOne({company_number: this.companyNumber})
      let _zScore = {};
      if (!zScoreDoc) {


        let latestYear = moment().year() - 1;
        _zScore[latestYear] = 0;
      } else {
        for (let key in zScoreDoc) {
          if (key !== '_id' && key !== 'company_number') {
            _zScore[key] = getZScoreForCompanyYear(zScoreDoc, key)
          }
        }
      }
      this.latestZScore = parseFloat(_zScore[Math.max(...Object.keys(_zScore))] || 0);
      if (this.latestZScore < 0)
        this.latestZScore = 0;
      this.tier = getTierFee(this.latestZScore);
      this.zscore = _zScore;
      this.save();
    },

    getSics() {
      if (!this.isBorrower()) return;
      if (!this.companyNumber) return;

      const database = new MongoInternals.RemoteCollectionDriver(process.env.XBRL_MONGO);
      const profile = database.open('CH_company_profile').findOne({company_number: this.companyNumber});
      if (profile) {
        this.sic = profile.profile.sic_codes;
        this.save();
      }
    },

    async getMaximumCollateralReturn() {

      const baseCurrency = 'USD',
        exchangeRates = {};

      let ledgerSum = 0,
        collateralSum = 0;

      await ExchangeRate
        .find({to: baseCurrency})
        .forEach(({from, ask}) => {
          exchangeRates[from] = ask;
        });

      const depositLogIds = await DepositLog
        .find({
          userId: this._id,
          returned: false,
        })
        .map(({_id}) => _id);


      const getRate = (currency) => {
        let rate = 1;

        if (currency !== baseCurrency && exchangeRates[currency]) {
          rate = exchangeRates[currency];
        }

        return rate;
      };

      await LedgerLog
        .find({
          type: ledgerActionsTypes.deposit,
          dataId: {$in: depositLogIds},
        })
        .forEach(({toCurrency, toValue}) => {
          collateralSum += (toValue * getRate(toCurrency));
        });

      await LedgerBalance
        .find({userId: this._id})
        .forEach(({currency, amount}) => {
          ledgerSum += (amount * getRate(currency))
        });

      return ledgerSum - collateralSum;
    },
    getSicCodesWithInvoicesCount() {

      if (!this.isInvestor()) {
        return {};
      }

      const invoicesCountByBorrower = {},
        invoicesCountBySicCodeAndCountry = {};

      const invoiceIds = Bid.find({
        $or: [
          {userId: this._id,},
          {
            bidders: {
              $elemMatch: {userId: this._id,},
            },
          },
        ]
      }, {fields: {invoiceId: 1}})
        .map(bid => bid.invoiceId);

      const invoiceQuery = {
        _id: {$in: invoiceIds},
        status: {
          $in: [
            invoiceStatuses.repaymentPending,
            invoiceStatuses.repaymentPaid,
          ]
        }
      };

      Invoice
        .find(invoiceQuery)
        .forEach(({borrowerId}) => {
          if (!invoicesCountByBorrower.hasOwnProperty(borrowerId)) {
            invoicesCountByBorrower[borrowerId] = 0;
          }

          invoicesCountByBorrower[borrowerId]++;
        });

      User
        .find({
          _id: {$in: Object.keys(invoicesCountByBorrower)}
        })
        .forEach(({_id, country, sic: sicsArray = []}) => {

          if (!sicsArray.length) {
            return;
          }
          if (!invoicesCountBySicCodeAndCountry.hasOwnProperty(country)) {
            invoicesCountBySicCodeAndCountry[country] = {};
          }

          const countrySicCodes = invoicesCountBySicCodeAndCountry[country];


          sicsArray.forEach(sicCode => {
            if (!countrySicCodes.hasOwnProperty(sicCode)) {
              countrySicCodes[sicCode] = 0;
            }

            countrySicCodes[sicCode] += invoicesCountByBorrower[_id];
          });
        });

      const sicInfoByCountry = {};


      for (const countryCode in invoicesCountBySicCodeAndCountry) {
        if (invoicesCountBySicCodeAndCountry.hasOwnProperty(countryCode)) {
          const invoicesCountBySicCode = invoicesCountBySicCodeAndCountry[countryCode];

          const infoBySection = {};
          let totalCount = 0;
          SIC
            .find({
              country: countryCode,
              code: {$in: Object.keys(invoicesCountBySicCode)}
            })
            .forEach(({code, sectionName, sectionDescription}) => {
              if (!infoBySection.hasOwnProperty(sectionName)) {
                infoBySection[sectionName] = {
                  sectionName,
                  sectionDescription,
                  count: 0,
                }
              }

              const sectionInfo = infoBySection[sectionName];

              sectionInfo.count += invoicesCountBySicCode[code];
              totalCount += invoicesCountBySicCode[code];
            });

          if (totalCount) {
            sicInfoByCountry[countryCode] = {
              totalCount,
              sections: Object.values(infoBySection)
            };
          }
        }

      }
      return sicInfoByCountry;
    },

    async sendToVerifyKYCDocuments() {
      this.isAbleToRequestKycVerification();

      if (this.companyNumber && this.country === 'GB') {
        const response = await xbrlApiService.getCompanyInfo(this.companyNumber);

        const { profile } = response.data.message;
        const { sic_codes: sicCodes, company_name: companyName, registered_office_address: officeAddress } = profile;
        const { address_line_1: addressLine1, address_line_2: addressLine2, region, postal_code: postcode } = officeAddress;

        this.companyName = companyName;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = region;
        this.postcode = postcode;
        this.companyDescription = sicCodes.map(code => sicList.find(item => item.SIC === code).description).join();

      }
      // Set the KYS status to pending
      if (!this.isVerifiedKyc()) {
        this.KYCStatus = statuses.pending;
      }
      this.save();

      this.updateZohoDocument();

      // Check KYC doc
      // Used setTimeout by the fact that you need to wait for the result of the function 's3Instance.putObject'
      if (!this.isVerifiedKyc()) {
        Meteor.setTimeout(() => Meteor.defer(() => verificationKYC(this)), 7000);
      }

      PopulousEmitter.emit(populousEvents.changesProfile, this._id);

      return this;
    },

    async removeUnassignedFiles(oldFiles){
      const {addressDocumentIds = [], bankStatementDocumentIds = [], idDocumentIds = [], livePhotoIds = []} = this;

      const currentkycFilesIds = [
        ...bankStatementDocumentIds,
        ...idDocumentIds,
        ...addressDocumentIds,
        ...livePhotoIds,
      ];

      const fileIdsForDelete = oldFiles.filter((fileId) => !currentkycFilesIds.includes(fileId));

      if(fileIdsForDelete.length){
        await File.deleteS3Objects(fileIdsForDelete);
      }
    },

    saveTempKYCData(data, borrower = true) {
      this.isAbleToRequestKycVerification();

      const {
        averageInvoiceValue = null,
        averageInvoiceVolume = null,
        currencySelector = null,
        uploadedBankStatements = null,
        uploadedPersonalIdDocuments = null,
        uploadedAddressDocuments = null,
        uploadedLivePhoto = null,
        ...personalDetailsFields
      } = data;

      // Get String values
      const aIValue = averageInvoiceValue ? averageInvoiceValues[averageInvoiceValue] : null;
      const aIVolume = averageInvoiceVolume ? averageInvoiceVolumes[averageInvoiceVolume] : null;
      const {addressDocumentIds = [], bankStatementDocumentIds = [], idDocumentIds = [], livePhotoIds = []} = this;

      const kycFilesIdsBeforeUpdate = [
        ...bankStatementDocumentIds,
        ...idDocumentIds,
        ...addressDocumentIds,
        ...livePhotoIds,
      ];

      if (borrower) {
        this.averageInvoiceValue = aIValue || this.averageInvoiceValue;
        this.averageInvoiceVolume = aIVolume || this.averageInvoiceVolume;
        this.preferredCurrency = currencySelector || this.preferredCurrency;
        this.bankStatementDocumentIds = uploadedBankStatements || this.bankStatementDocumentIds;
      }

      this.addressDocumentIds = uploadedAddressDocuments || this.addressDocumentIds;

      // Set the KYS status to pending
      if (!this.isVerifiedKyc()) {
        this.livePhotoIds = uploadedLivePhoto || this.livePhotoIds;
        this.idDocumentIds = uploadedPersonalIdDocuments || this.idDocumentIds;
        this.KYCStatus = statuses.pending;
      }

      this.save();

      this.removeUnassignedFiles(kycFilesIdsBeforeUpdate);

      // Save the rest of the data
      return this.updatePersonalDetails(personalDetailsFields);
    },

    async updateZohoDocument() {
      Meteor.defer(async () => {
        if (!this.isBorrower() || !this.isVerifiedKyc() || !ZohoSDK.isConnected()) {
          return;
        }

        const {contactId, accountId,} = this.zohoInfo;

        const accountObject = {
          Account_Name: this._id,
          Description: this.companyDescription,


          Billing_Street: this.addressLine1 + ', ' + this.addressLine2,
          Billing_City: this.city,
          Billing_Code: this.postcode,
          Billing_Country: this.country,

          Employees: this.employeeNumber,
          Ticker_Symbol: this.preferredCurrency,
          Rating: String(this.latestZScore),

          // Custom fields

          Company_Name: this.companyName,
          Company_Number: this.companyNumber,
          Average_Invoice_Count: this.averageInvoiceValue,
          Average_Invoice_Volume: this.averageInvoiceVolume,
        };

        const contactObject = {
          Account_Name: this._id,
          First_Name: this.firstName,
          Last_Name: this.lastName,
          Title: this.titlePosition,
          Email: this.emailAddress(),
          Secondary_Email: this.recoveryEmail,
          Phone: this.getPhoneNumber(),
          Date_of_Birth: this.dateOfBirth.split('T')[0],

          Mailing_Street: this.residentalAddressLine1 + ', ' + this.residentalAddressLine2,
          Mailing_City: this.residentalCity,
          Mailing_Zip: this.residentalPostcode,
          Mailing_Country: this.residentalCountry,

          // Custom fields

          Insurance_Number: this.socialInsuranceNumber,
          Gender: this.gender,
        };

        let accountResponse, contactResponse;
        const accountMethod = accountId ? 'put' : 'post',
          contactMethod = contactId ? 'put' : 'post';

        const parseResult = ({body: responseJSON}) => {
          const response = JSON.parse(responseJSON);

          const result = response.data
            ? (
              Array.isArray(response.data)
                ? response.data[0]
                : response.data
            )
            : response;

          if (result.status === 'error') {
            throw new Meteor.Error(500, JSON.stringify(result));
          }

          return result.details;
        };

        try {
          accountResponse = await ZohoSDK.api.MODULES[accountMethod]({
            module: 'Accounts',
            id: accountId,
            body: {
              data: [
                accountObject,
              ]
            },
          })
            .then(parseResult);
        } catch (error) {
          console.log('Account save to ZOHO was failed', error.message);
        }

        try {
          contactResponse = await ZohoSDK.api.MODULES[contactMethod]({
            module: 'Contacts',
            id: contactId,
            body: {
              data: [
                contactObject,
              ]
            },
          })
            .then(parseResult);

        } catch (error) {
          console.log('Contact save to ZOHO was failed', error.message);
        }

        if (!contactId || !accountId) {

          const zohoInfo = {
            contactId: undefined,
            accountId: undefined,
            ...this.zohoInfo
          };

          if (accountResponse && !accountId) {
            zohoInfo.accountId = accountResponse.id;
          }

          if (contactResponse && !contactId) {
            zohoInfo.contactId = contactResponse.id;
          }

          await User.update({_id: this._id}, {
            $set: {
              zohoInfo,
            }
          });

          this.zohoInfo = zohoInfo;
        }
      });
    },

    async getSupportedDocuments(countryCode) {
      const buff = new Buffer(`${process.env.truliooUsername}:${process.env.truliooPassword}`);
      const base64data = buff.toString('base64');
      const apiInstance = axios.create({
        baseURL: 'https://api.globaldatacompany.com',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64data
        }
      });

      let supportedDocuments;
      try {
        const {data} = await apiInstance.get('/configuration/v1/documentTypes/' + countryCode);
        supportedDocuments = data[countryCode];
      } catch (error) {
        console.log('Trulioo API ERROR', error.message);

      }

      return supportedDocuments;
    },

    async becomeProviderRequest() {
      if (!this.isSubmitProviderRequestPossible()) {
        throw new Meteor.Error(400, 'Provider request is not possible')
      }

      this.provider = userProviderDefault;
      await this.save();

      await (new BlockchainAction({
        type: blockchainActionTypes.newProvider,
        userId: this._id,
      })).save();
    },
    async toggleProviderLogic() {

      const userId = checkAuth();
      const user = await User.findOne(userId);

      if (!user || !user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      if (typeof this.provider === 'object') {
        this.provider.isEnabled = !this.provider.isEnabled;
        await this.save();
      } else {
        await this.becomeProviderRequest({});
      }
    },
    async toggleProviderPermissions(permission) {

      if (!this.isProvider()) {
        return;
      }

      this.provider[permission] = !this.provider[permission];
      await this.save();
    },

    async saveFilters(type, data) {
      if (typeof this.settings === 'object') {
        this.settings[type] = data;
      } else {
        this.settings = userSettingsDefault;
        this.settings[type] = data;
      }

      await this.save();
    },

    async verifySmsCode(smsCode, is2FAReset = false) {
      const user = await User.findOne(this._id);
      const isValid = user.smsVerificationCode !== undefined && user.smsVerificationCode === smsCode;

      if (isValid) {
        delete user.smsVerificationCode;
        if (is2FAReset) {
          delete user.twoFAKey;
        }
        user.save();
      }

      return isValid;
    },

    async sendVerificationCode(phoneNumber = this.getPhoneNumber()) {
      const minNumber = 100000;
      const maxNumber = 999999;
      const uniqCode = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

      this.smsVerificationCode = uniqCode;
      await this.save();

      const message = 'Your Populous verification code is: ' + uniqCode;

      return await twilioSendSMS(message, phoneNumber);
    },

    async updateBidPresets(fixedAmounts, step) {
      const currentUerId = checkAuth();

      if (currentUerId !== this._id) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      if (!Array.isArray(fixedAmounts) || fixedAmounts.length !== 3) {
        throw new Meteor.Error(400, 'Provided data is invalid');
      }
      if (typeof step !== 'number' || step <= 0) {
        throw new Meteor.Error(400, 'Step should be greater than zero');
      }

      this.settings.auctions = {
        ...this.settings.auctions,
        bidPresets: {
          fixedAmounts: fixedAmounts.map(input => roundNumber(input)),
          step: roundNumber(step),
        }
      };

      await this.save();
    },
// TODO: should be reworked for use subscription independent from events
    async toggleSubscription(type, additionalData, shouldUnsubscribe) {
      checkAuth();

      const query = {
        userId: this._id,
        type,
      };

      if (additionalData && typeof additionalData === 'object') {
        query.data = additionalData;
      }

      let method = shouldUnsubscribe ? availableSubscMethods.remove : availableSubscMethods.insert;
      const subscriptionExists = await UserSubscription.findOne(query);


      if (shouldUnsubscribe === undefined) {
        if (subscriptionExists) {
          method = availableSubscMethods.remove;
        }
      }

      if (method === availableSubscMethods.insert && subscriptionExists) {
        return;
      }

      if (method === availableSubscMethods.insert) {
        validateSubscribeData(query);
      }

      await UserSubscription[method](query);
    },
  }
});

const availableSubscMethods = {
  insert: 'insert',
  remove: 'remove',
};

function validateSubscribeData(subscription = {}) {
  switch (subscription.type) {
    case userSubscriptionTypes.borrower:
      if (!subscription.data || subscription.userId === subscription.data.borrowerId) {
        throw  new Meteor.Error(400, 'You are not able to subscribe');
      }
      break;
  }
}
