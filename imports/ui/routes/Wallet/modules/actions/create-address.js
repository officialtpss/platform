import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';

import { UPDATE_CREATING_ADDRESS } from '../';

// This thunk creates a new PPT address
// for the current user
const createAddress = () => {
  return (dispatch, getState) => {
    const { currentUser } = getState().app;

    toastr.success('PPT address creation request is done');

    currentUser.callMethod('createPPTAddress', (err) => {
      if (err) {
        toastr.error(
          'There was an error creating your PPT address. ' +
          'The next request to create your PPT address will be done in 30 minutes.'
        );
      }
    });
  }
};

export default createAddress;
