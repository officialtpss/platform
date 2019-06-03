import React from 'react';
import { Link } from 'react-router-dom';
import { statuses } from 'meteor/populous:constants';

// Helper method for defining the colours
// and text for the KYC status alert box
const KYCStatus = userStatus => {
  switch(userStatus) {
    case statuses.unverified:
      return {
        color: 'danger',
        message: (
          <span>
            Your account is unverified. 
            Please click <Link to="/upload">here</Link> to verify it
          </span>
        )
      };

    case statuses.pending:
      return {
        color: 'warning',
        message: 'Your account verification is being processed'
      };

    case statuses.verified:
      return {
        color: 'success',
        message: 'Your account is verified'
      };

    case statuses.declined:
      return {
        color: 'danger',
        message: (
          <span>
            Your verification was declined. 
            Please click <Link to="/upload/declined">here</Link> to read why
          </span>
        )
      };

    default:
      return null;
  }
};

export default KYCStatus;
