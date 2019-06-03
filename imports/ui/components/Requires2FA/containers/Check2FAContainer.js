import { connect } from 'react-redux';
import { compose } from 'redux';

import Check2FA from '../components/Check2FA';
import { verify, moveTwoFAState, resetTwoFA } from '../modules/actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ requires2FA, app }) => ({
  show: requires2FA.show2FAChecker,
  onCancel: requires2FA.onCancel,
  args: requires2FA.args,
  data: requires2FA.data,
  currentUser: app.currentUser
});

const mapDispatchToProps = dispatch => ({
  verify: code => {
    dispatch(verify(code));
  },
  moveTwoFAState: token => {
    dispatch(moveTwoFAState(token));
  },
  resetTwoFA: (user, data) => {
    dispatch(resetTwoFA(user, data));
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Check2FA);
