import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

const mapStateToProps = state => ({
  location: state.router.location,
});

export const ConnectedSwitch = connect(mapStateToProps)(Switch);
export const ConnectedRoute = connect(mapStateToProps)(Route);
