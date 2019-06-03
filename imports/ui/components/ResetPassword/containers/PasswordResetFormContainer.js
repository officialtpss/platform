import { connect } from 'react-redux';

import PasswordResetForm from '../components/PasswordResetForm';
import { sendPasswordResetEmail } from '../modules/actions/index';

export default connect(null, { sendPasswordResetEmail })(PasswordResetForm);
