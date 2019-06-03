import { Meteor } from 'meteor/meteor';
import { SET_INITIAL_LIVE_PHOTO } from '../';


const getInitialLifePhoto = (file, ownerId) => {
  return (dispatch) => {
    Meteor.call('file.getDecryptFile', file._id, file.type, ownerId, (error, responce) => {
      if (!error) {
        dispatch({type: SET_INITIAL_LIVE_PHOTO, payload: responce});
      }
    });
  }
};

export {
  getInitialLifePhoto
};
