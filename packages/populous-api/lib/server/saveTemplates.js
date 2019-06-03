import {Meteor} from "meteor/meteor";
import {EmailTemplate} from 'meteor/populous:api';
import {TermsAndConditions} from 'meteor/populous:api';

Meteor.startup(async() => {
  await (new EmailTemplate()).setDefaultTemplates();
  await (new TermsAndConditions()).setDefaultTemplates();
});