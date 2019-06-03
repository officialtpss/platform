import { connect } from 'react-redux';

import Setup2FA from '../components/Setup2FA';
import { generateKey, verifyCode, toggleModal } from '../modules/actions';

const mapStateToProps = ({ setup2FA }) => ({
  secret: setup2FA.secret,
  modal: setup2FA.modal
});

const mapDispatchToProps = dispatch => ({
  generateKey: () => dispatch(generateKey()),
  verifyCode: code => dispatch(verifyCode(code)),
  toggleModal: () => dispatch(toggleModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setup2FA)
