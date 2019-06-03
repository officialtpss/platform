import { connect } from 'react-redux';

import PersonalDetailsForm from '../components/PersonalDetailsForm';
import { savePersonalDetails } from '../modules/actions';

const mapStateToProps = ({ app }) => ({
  currentUser: app.currentUser,
});

const mapDispatchToProps = dispatch => ({
  save: u => dispatch(savePersonalDetails(u)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDetailsForm);
