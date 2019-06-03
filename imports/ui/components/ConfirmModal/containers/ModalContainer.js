import { connect } from 'react-redux';
import { compose } from 'redux';

import ConfirmModal from '../components/ConfirmModal';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ confirmModal }) => ({
  ...confirmModal
});

export default compose(connect(mapStateToProps, null), withRouter)(ConfirmModal);
