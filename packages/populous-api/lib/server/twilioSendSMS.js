import { Meteor } from 'meteor/meteor';
import Twilio from 'twilio';

const accountSid = process.env.twilioAccountSid;
const authToken = process.env.twilioAuthToken;
const fromNumber = process.env.twilioFromNumber;
const twilioInstance = new Twilio(accountSid, authToken);


const twilioSendSMS = async (body, to) => {
  return twilioInstance.messages
      .create({
        body: body,
        from: fromNumber,
        to: to
      })
      .then(message => {
        console.log(message.sid);
        return true;
      })
      .catch((error) => {
        console.log('Twilio API ERROR', error.message);
        throw new Meteor.Error(400, error.message);
      })
};

export default twilioSendSMS;
