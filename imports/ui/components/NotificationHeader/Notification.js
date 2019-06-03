import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Small } from '../styled-components/Typography';

const NotificationBar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #5ca0f6;
  color: white;
  padding: 5px 0;
  justify-content: center;
  align-items: center;

  .notification-text {
    color: white;
  }

  .btn-complete {
    margin-left: 25px;
    color: white;
  }
`;

const Notification = ({ user }) => {
  if (user.firstName && user.lastName && user.residentalAddressLine1) {
    return null;
  } else {
    return (
      <NotificationBar className="notification-header">
        <span className="notification-text">There's some incomplete data, missing from your account</span>
        <Link className="btn-complete" to="/settings#profile">COMPLETE</Link>
      </NotificationBar>
    );
  }
};

const mapStateToProps = ({ app }) => ({
  user: app.currentUser,
});

export default connect(mapStateToProps)(Notification);
