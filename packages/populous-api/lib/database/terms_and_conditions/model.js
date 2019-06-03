import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { defaultTermsAndConditions } from 'meteor/populous:constants';
import moment from 'moment';


const termsAndConditions = new Mongo.Collection('terms_and_conditions');

const TermsAndConditions = Class.create({
  name: 'TermsAndConditions',
  collection: termsAndConditions,

  fields: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    position: {
      type: Number
    },
    version: {
      type: Number,
      default: 1
    }
  },

  behaviors: ['timestamp'],

  helpers: {
    getCurrentVersion() {
      const termsAndConditions = TermsAndConditions.find({}).fetch();
      return termsAndConditions.length ? Math.max.apply(Math, termsAndConditions.map((item) => (item.version))) : 1;
    },

    getLastUpdate() {
      const termsAndConditions = TermsAndConditions.findOne({version: this.getCurrentVersion()});
      return termsAndConditions ?  moment(termsAndConditions.updatedAt).format('DD[-]MM[-]YYYY') : null;
    },
  },

  meteorMethods: {
    async setDefaultTemplates(){
      const isExists = TermsAndConditions.findOne({});
      if(!isExists){
        defaultTermsAndConditions.forEach((item, index) => {
          const newTemplate = new TermsAndConditions({
            title: item.title,
            content: item.content,
            position: ++index
          });
          newTemplate.save();
        });
      }
    },
  },
});

export default TermsAndConditions;
