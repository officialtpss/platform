import React from 'react';
import { Alert } from 'reactstrap';

const Declined = ({ currentUser }) => (
  <Alert color="danger">
    <strong>Reason:</strong> { currentUser.KYCDeclinedReason }
  </Alert>
);

export default Declined;
