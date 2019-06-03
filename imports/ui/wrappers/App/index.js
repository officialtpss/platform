import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { ThemeProvider } from 'styled-components';
import { Route, Redirect } from 'react-router-dom';
import ReduxToastr, {toastr} from 'react-redux-toastr';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Maintenance as MaintenanceApi } from 'meteor/populous:api';
import 'react-datetime/css/react-datetime.css';
import 'react-rangeslider/lib/index.css';
import '../../libs/redux-toastr/index.css';
import '../../libs/styles/index.css';

import PrivateRoute from '../../route-helpers/PrivateRoute';
import GuestRoute from '../../route-helpers/GuestRoute';
import { ConnectedSwitch } from '../../route-helpers/ConnectedRoute';
import Landing from '../../routes/Landing';
import Services from '../../routes/Services';
import ResetPasswordConfirm from '../../routes/ResetPasswordConfirm';
import ResendVerification from '../../routes/ResendVerification';
import ResetTwoFAKey from '../../routes/ResetTwoFAKey';
import Terms from '../../routes/Terms';
import Maintenance from '../../routes/Maintenace';
import NavigationLoggedOut from '../../components/Navigation/NavigationLoggedOut';
import ConfirmModal from '../../components/ConfirmModal';
import Check2FA from '../../components/Requires2FA';
import Footer from '../../components/Footer';
import PrivateApp from '../PrivateApp';
import theme from './theme';
import { Page, Content } from '../../components/styled-components/Divs';
import ResetByLink from '../../routes/ResetTwoFAKey/helpers/reset2faByLink';

const App = ({ isMaintenance }) => {

  if (isMaintenance) {
    return <Maintenance/>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <ConnectedSwitch>
          {/* These are public routes */}
          <GuestRoute exact path="/" component={Landing} />
          <GuestRoute path="/services" component={Services} />
          <GuestRoute exact path="/reset-password/:token" component={ResetPasswordConfirm}/>
          <GuestRoute exact path="/resend-verification" component={ResendVerification}/>
          <GuestRoute exact path="/reset-2-fa" component={ResetTwoFAKey}/>
          <Route exact path="/reset-2-fa/:token" render={ResetByLink} />

          {!(Meteor.user() || Meteor.loggingIn()) &&
          <Route exact path="/terms" render={() => (
            <Page>
              <NavigationLoggedOut/>
              <Content>
                <Terms/>
              </Content>
              <Footer/>
            </Page>
          )}/>
          }

          {/* These routes require the user to be authenticated */}
          <PrivateRoute path="/" component={PrivateApp}/>
          <Redirect to="/" />
        </ConnectedSwitch>

        <ReduxToastr position={'bottom-right'} className={'custom-notification'} preventDuplicates/>
        <Check2FA/>
        <ConfirmModal/>
      </Fragment>
    </ThemeProvider>
  );
};

const reduxData = connect(
  state => {
    return { ...state.router };
  },
  {}
);

const meteorData = withTracker((props) => {
  const maintenance = Meteor.subscribe('maintenance');
  let isMaintenance = false;

  if (maintenance.ready()) {
    isMaintenance = !!MaintenanceApi.findOne({});
  }

  return {
    isMaintenance
  };
});

export default compose(reduxData, meteorData)(App);
