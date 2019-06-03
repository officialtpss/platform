import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import {
  ledgerActionsTypes,
  requestTypes,
  debtorStatuses
} from 'meteor/populous:constants';
import checkAuth from '../../helpers/checkAuth';
import Debtor from '../model';
import User from '../../accounts/model';
import {ForbiddenError} from "../../helpers/Errors";
import Request from "../../requests/model";
import xbrlApiService from "../../../server/xbrlApiService";
import { getZScoreForCompanyYear } from '../../helpers/zscore';

Debtor.extend({
  meteorMethods: {
    create() {
      this.userId = checkAuth();

      if(!this.isCompanyNumberUnique(this.companyNumber)){
        throw new Meteor.Error(400, 'Borrower company number already exist');
      }

      this.save((err, id) => {
        const request = new Request({
          type: requestTypes.debtorList,
          dataId: id
        });
        request.save();
      });

      // Return the new file object
      return this;
    },

    async isCompanyNumberUnique(number) {
      checkAuth();

      return !(await Debtor.findOne({companyNumber: number}));
    },
    async updateDebtor(debtorId, values) {
      checkAuth();

      const user = await User.findOne(Meteor.userId());

      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const debtor = await Debtor.findOne(debtorId);
      debtor.debtorName = values.debtorName;
      debtor.country = values.country;
      debtor.companyNumber = values.companyNumber;

      await debtor.save();
    },

    /*
     * @desc update the debtor z-score at the time of creation
     * this.zscore = "2.4"
     */
    getZScore() {

      const database = new MongoInternals.RemoteCollectionDriver(process.env.XBRL_MONGO);
      const zScoreDoc = database.open('z_scores').findOne({ company_number: this.companyNumber});

      let _zScore = {};
      if (!zScoreDoc) {
        xbrlApiService.getCompanyInfo(this.companyNumber);
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
      this.zscore = _zScore;
      this.save();
    },
    delete(){
      const userId = checkAuth();

      if(this.userId !== userId){
        throw ForbiddenError;
      }

      if(this.hasConnectedInvoices()){
        throw new Meteor.Error(403, 'You can not remove debtor that connected to invoice');
      }

      this.remove();

      Request.remove({
        type: requestTypes.debtorList,
        dataId: this._id
      });
    },
    async updateDebtorName(newName) {
      const userId = checkAuth();
      const admin = User.findOne({_id: userId});
      if (!admin || !admin.isAdmin()) {
        throw ForbiddenError;
      }

      if (!newName) {
        throw new Meteor.Error(400, 'Data is incorrect');
      }

      this.name = newName;
      this.save();
    },
    async verify(isVerified) {
      const userId = checkAuth();
      const admin = User.findOne({_id: userId});
      if (!admin || !admin.isAdmin()) {
        throw ForbiddenError;
      }

      this.status = isVerified ? debtorStatuses.verified : debtorStatuses.unverified;
      this.save();
    },
  },
});
