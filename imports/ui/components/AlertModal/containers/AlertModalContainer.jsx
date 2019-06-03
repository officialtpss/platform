import { connect } from 'react-redux';
import { compose } from 'redux';

import AlertModal from '../components/AlertModal';
import { withRouter } from 'react-router-dom';
import { showAlertModal } from '../modules/actions';

const mapStateToProps = ({ alertModal }) => ({
  ...alertModal
});

const mapDispatchToProps = dispatch => ({
  showAlertModal: (options) => dispatch(showAlertModal(options))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(AlertModal);
