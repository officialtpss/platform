import {Meteor} from "meteor/meteor";
import {toastr} from "react-redux-toastr";

export function saveSecret(user, secret, token){
  return new Promise((resolve, reject) => {
    Meteor.call('user.verify2faCode', {
      token,
      secret,
    }, (error) => {
      if(error){
          return reject(true)
        }

      user.save2FASecret(secret, (err, user) => {
        if (err) {
          return reject(false);
        }

        resolve(user);
      });
    });
  });

}

export function verifycode(params) {
  return new Promise((resolve, reject) => {
    Meteor.call('user.verify2faCode', params, (error) => {
      if (error) {
        return reject();
      }

      resolve();
    });
  });
}

