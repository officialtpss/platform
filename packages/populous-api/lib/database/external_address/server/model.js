import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { companyDetails, emailTemplates, getEmailTemplate, populousEvents } from 'meteor/populous:constants';
import ethConnect from 'meteor/populous:eth-connect';
import ExternalAddress from '../model';
import EmailTemplate from "../../email_template/model";
import User from "../../accounts/model";
import connectInstance from "../../../server/connectInstance";
import PopulousEmitter from "../../../server/PopulousEmitter";


ExternalAddress.extend({
  meteorMethods: {
    async addAddress(address, name) {
      if (!address) {
        throw new Meteor.Error(400, 'Wallet address is required');
      }
      if (!name) {
        throw new Meteor.Error(400, 'Wallet name is required');
      }
      const addressObject = ExternalAddress.findOne({$or: [{newAddress: address}, {address: address}]});
      if (addressObject) {
        throw new Meteor.Error(400, 'Address already used, enter a different wallet address');
      }

      const user = await User.findOne(Meteor.userId());

      this.userId = user.isAdmin() ? 'Populous' : user._id;
      this.name = name;
      this.newAddress = address;
      this.save();
    },

    async removeAddress() {
      if (this.userId !== Meteor.userId()) {
        const admin = User.findOne({ _id: Meteor.userId() });
        if (!admin || !admin.isAdmin()) {
          throw new Meteor.Error(403, 'Access forbidden');
        }
      }

      this.remove();
    },

    async editAddress(newAddress, newName) {
      if (this.userId !== Meteor.userId()) {
        if (this.userId === 'Populous') {
          const admin = User.findOne({ _id: Meteor.userId() });
          if (!admin || !admin.isAdmin()) {
            throw new Meteor.Error(403, 'Access forbidden');
          }
        } else {
          throw new Meteor.Error(403, 'Access forbidden');
        }
      }
      if (!newAddress) {
        throw new Meteor.Error(400, 'Wallet address is required');
      }
      const addressObject = ExternalAddress.findOne({$or: [{newAddress: newAddress}, {address: newAddress}]});
      if (!addressObject) {
        delete this.address;
        this.newAddress = newAddress;
      }

      this.name = newName;
      this.save();
    },

    async confirmationAddress() {
      const user = await User.findOne(Meteor.userId());

      if (!user.isAdmin() && this.userId !== Meteor.userId()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      if (!this.newAddress) {
        throw new Meteor.Error(400, 'Missing newAddress');
      }

      this.address = this.newAddress;
      delete this.newAddress;
      this.save();
    },

    sendEmailNotification(type) {
      if (!this.newAddress) {
        return;
      }

      const isUpdate = type==='updated';
      const systemName = isUpdate
        ? emailTemplates.UpdateExternalAddress.systemName
        : emailTemplates.AddExternalAddress.systemName;
      const template = EmailTemplate.findOne({systemName: systemName});

      if(template){
        const toUser = User.findOne({_id: this.userId});
        const from = companyDetails.fromEmail;
        const subject = template.subject.replace('{{type}}', type);
        const userName = toUser.fullName();
        const body = template.body.replace('{{address}}', this.address)
          .replace('{{newAddress}}', this.newAddress)
          .replace('{{name}}', userName);

        toUser.emails.forEach((email) => {
          if (email.verified) {
            Email.send({
              to: email.address,
              from: from,
              subject: subject,
              html: getEmailTemplate(body)
            });
          }
        });

        PopulousEmitter.emit(populousEvents.updateExternalAddress, this, isUpdate);
      }
    },

    async generateRandomBalanceString(){
      const possible = "012345678";
      let string = "";
      for(let i = 0; i < 8; i++) {
        string += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return `0.${string}`;
    },

    async compareBalances(compareBalance, address){
      const {
        config: {
          network: {ropsten},
          contract: {populousToken},
        },
        contracts: {populousToken: {balanceOf}},
      } = ethConnect;
      const currentBalance = await balanceOf(connectInstance, populousToken, ropsten.ethAddress, address);

      return currentBalance===compareBalance;
    }
  }
});
