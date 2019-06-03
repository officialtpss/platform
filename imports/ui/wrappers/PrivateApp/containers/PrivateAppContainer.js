import { Meteor } from 'meteor/meteor';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { stopSubscription } from 'meteor-redux-middlewares';
import {TermsAndConditions} from 'meteor/populous:api';

import PrivateApp from '../components/PrivateApp';
import { logout, init } from '../modules/actions';

const mapStateToProps = ({ app }) => ({
  loading: app.loading,
  currentUser: app.currentUser
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    init,
    logout
  }, dispatch),
});

// We need to do this crap becuase meteor runs this
// in parallel with Meteor.loggingIn
// https://docs.meteor.com/api/accounts.html#Meteor-loggingIn
// and Meteor.userId() isn't available until Meteor.loggingIn
// is false.
const meteorData = withTracker(({ currentUser, init }) => {

  // wait for Meteor to find current user session
  // andn then init the current user
  if (!currentUser && !Meteor.loggingIn()) {
    init(Meteor.userId());
  }

  Meteor.subscribe('currencies');
  Meteor.subscribe('exchangeRates');
  Meteor.subscribe('termsAndConditions');

  const currentVersionTermsAndConditions = new TermsAndConditions().getCurrentVersion();

  // We have to return an object for withTracker to work
  return {currentVersionTermsAndConditions};
});

const reduxData = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(reduxData, meteorData)(PrivateApp);
