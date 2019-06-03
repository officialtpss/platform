import { connect } from 'react-redux';
import {compose} from 'redux';
import {withTracker} from 'meteor/react-meteor-data';
import {TermsAndConditions} from 'meteor/populous:api';

import {setTermsConfirmed} from '../modules/actions'
import TermsComponent from '../components/Terms';

const mapStateToProps = ({ app }) => ({
  currentUser: app.currentUser,
});
const mapDispatchToProps = dispatch => ({
  setTermsConfirmed: () => dispatch(setTermsConfirmed()),
});

const meteorData = withTracker(() => {
  const termsAndConditionsSubscribe = Meteor.subscribe('termsAndConditions');
  let termsAndConditions = [], currentVersionTermsAndConditions;

  if (termsAndConditionsSubscribe.ready()) {
    termsAndConditions = TermsAndConditions.find({}, {sort: {position: 1}}).fetch();
    currentVersionTermsAndConditions = new TermsAndConditions().getCurrentVersion();
  }

  return {
    loading: !termsAndConditionsSubscribe.ready(),
    termsAndConditions,
    currentVersionTermsAndConditions
  };
});


export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), meteorData)(TermsComponent);