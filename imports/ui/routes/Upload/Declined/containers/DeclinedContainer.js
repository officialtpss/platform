import { connect } from 'react-redux';

import Declined from '../components/Declined';

const mapStateToProps = ({ app }) => ({
  currentUser: app.currentUser,
});

export default connect(mapStateToProps)(Declined)
