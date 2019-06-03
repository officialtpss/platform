import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import GeneralSettings from '../components/GeneralSettings';
import {
	savePersonalDetails,
  saveEmail,
  saveRecoveryEmail,
	setProfilePicture,
	toggleGeneralEdit,
  toggleTimezoneEdit,
  toggleEmailEdit,
	togglePasswordForm,
	saveNewPassword,
  onReset2FA,
  removeNickname,
  toggleRecoveryEmail,
} from '../modules/actions';

const mapStateToProps = ({ app, profileSettings }) => ({
  currentUser: app.currentUser,
  generalEdit: profileSettings.showGeneralEdit,
  timezoneEdit: profileSettings.showTimezoneEdit,
  emailEdit: profileSettings.showEmailEdit,
  recoveryEmail: profileSettings.showRecoveryEmail,
  changePassword: profileSettings.showChangePassword
});

const mapDispatchToProps = dispatch => ({
  save: u => dispatch(savePersonalDetails(u)),
  setProfilePicture: picture => dispatch(setProfilePicture(picture)),
  toggleGeneralEdit: (open) => dispatch(toggleGeneralEdit(open)),
  toggleTimezoneEdit: (open) => dispatch(toggleTimezoneEdit(open)),
  toggleEmailEdit: (open) => dispatch(toggleEmailEdit(open)),
  toggleRecoveryEmail: (open) => dispatch(toggleRecoveryEmail(open)),
  saveGeneralSetting: (setting) => dispatch(savePersonalDetails(setting)),
  saveEmailSetting: (email) => dispatch(saveEmail(email)),
  togglePasswordForm: (open) => dispatch(togglePasswordForm(open)),
  updatePassword: (oldPassword, newPassword) => dispatch(saveNewPassword(oldPassword, newPassword)),
  resetTwoFAKey: () => dispatch(onReset2FA()),
  removeNickname: () => dispatch(removeNickname()),
  saveRecoveryEmail: (email) => {dispatch(saveRecoveryEmail(email))}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSettings);
