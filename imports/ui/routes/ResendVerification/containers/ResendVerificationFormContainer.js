import { connect } from 'react-redux';

import ResendVerificationForm from '../components/ResendVerificationForm';
import { sendEmailVerificationEmail } from '../modules/actions';

export default connect(
  null,
  { sendEmailVerificationEmail }
)(ResendVerificationForm);
