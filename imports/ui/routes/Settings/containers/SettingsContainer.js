import { connect } from 'react-redux';

import Settings from '../components/Settings';
import { setActiveTab } from '../modules/actions';

const mapStateToProps = ({ app, profileSettings }) => ({
  currentUser: app.currentUser,
  ...profileSettings
});

const mapDispatchToProps = dispatch => ({
  setActiveTab: u => dispatch(setActiveTab(u)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
