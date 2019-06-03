import { File, User } from 'meteor/populous:api';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';

import {
  RESET_PAGE_ADD_CONFIRM_PHOTO,
  RESET_PAGE_RESET_PHOTO
} from './index';

const confirmTwoFAKeyReset = photo => {
  if(photo) {
    return dispatch => {
      dispatch({ type: RESET_PAGE_ADD_CONFIRM_PHOTO, file: photo });
    };
  }
  else {
    return dispatch => {
      dispatch({ type: RESET_PAGE_RESET_PHOTO });
    };
  }
};

const uploadFile = (propsUser) => {
  return (dispatch, getState) => {
    const { confirmReset: { savedFile }, requires2FA: { args, data }, app: { currentUser } } = getState();

    const user = currentUser || propsUser;
    if(!savedFile || savedFile.length === 0) {
      toastr.warning("You need to upload the file!");
    } else if(!user) {
      dispatch(push('/login'));
    } else {
      const upload = File.insert(
        {
          file: savedFile[0],
          streams: 'dynamic',
          chunkSize: 'dynamic',
          meta: {crypto: true},
        },
        false
      ).on('end', (error, fileObj) => {
        if (error) {
          toastr.error('Error', 'File reading failed. Please try again');
          dispatch({ type: RESET_PAGE_RESET_PHOTO });
        } else {

          new User().callMethod('uploadTwoFAKeyIDFile', user.emails[0].address, fileObj._id, err => {
            if (err) {
              toastr.error('Error while saving', err.reason);
            } else {
              dispatch(push('/login'));
              toastr.success(
                'Submitted successfully',
                "We'll review your document soon."
              );
            }
            dispatch({ type: RESET_PAGE_RESET_PHOTO });
          });
        }
      }).start();
    }
  };
};

export {
  confirmTwoFAKeyReset,
  uploadFile
};
