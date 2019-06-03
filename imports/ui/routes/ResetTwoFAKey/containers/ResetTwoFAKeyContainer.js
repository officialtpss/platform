import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTracker } from 'meteor/react-meteor-data';
import ResetTwoFAKey from '../components';

import resetTwoFAKeyActions from '../modules/actions';
import {
  ExternalAddress,
  User,
} from 'meteor/populous:api';
import {Meteor} from "meteor/meteor";

const reduxData = connect(
  ({ app, confirmReset, requires2FA }) => ({
    reduxUser: app.currentUser,
    fileSaved: confirmReset.savedFile,
    loginData: requires2FA.args
  }),
  { ...resetTwoFAKeyActions }
);

const meteorData = withTracker(({reduxUser, location:{state}}) => {

  const {user: stateUser} = (state || {});
  let user = reduxUser || stateUser;
  let externalWallets;

  if (user) {
    if (!user.callMethod) {
      user = new User(user)
    }

    const externalAddressSubscription = Meteor.subscribe('externalAddress.user', user._id);
    if (externalAddressSubscription.ready()) {
      externalWallets = ExternalAddress.find({
        userId: user._id,
        // createdAt: {$lt: date}
      }).fetch();
    }
  }
  return {
    externalWallets,
    currentUser: user,
    wallet: new ExternalAddress(),
  };
});

export default compose(reduxData, meteorData)(ResetTwoFAKey);
