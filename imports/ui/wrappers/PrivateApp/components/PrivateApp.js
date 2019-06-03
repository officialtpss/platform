import React from 'react';
import { userRoles, fixtures } from 'meteor/populous:constants';

import {
  BorrowerDashboard,
  InvestorDashboard
} from '../../../routes/Dashboards';
import Spinner from '../../../components/Spinner';
import PrivateMainApp from './PrivateMainApp';

const PrivateApp = ({ loading, currentUser, logout, currentVersionTermsAndConditions }) => {
  if (loading || !currentUser || !currentVersionTermsAndConditions) {
    return <Spinner />;
  }

  // Make sure the user has 2 factor auth setup
  // Disable 2FA for users from fixtures
  const defaultUsersEmails = Object.values(fixtures.users).map(user => user.email);
  const isNewUser = JSON.parse(localStorage.getItem('isNewUser'));

  if (!currentUser.twoFAKey && !defaultUsersEmails.includes(currentUser.emailAddress()) && isNewUser === null) {
    localStorage.setItem('isNewUser', true);
  }

  let Dashboard = BorrowerDashboard;

  // Render the pages depending on the users type
  if (currentUser.role === userRoles.investor) {
    Dashboard = InvestorDashboard;
  }

  return (
    <PrivateMainApp currentUser={currentUser} dashboard={Dashboard} currentVersionTermsAndConditions={currentVersionTermsAndConditions} logout={logout} />
  );
};

export default PrivateApp;
