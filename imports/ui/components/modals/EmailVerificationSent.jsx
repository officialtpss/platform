import React from 'react';

import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Link} from "react-router-dom";

const EmailVerificationSent = ({open, toggle}) =>
  <Modal isOpen={open} className="custom" toggle={toggle}>
    <ModalHeader toggle={toggle}>Email verification</ModalHeader>
    <ModalBody>
      <div className="m-b-20">
        <div className="text-center  m-b-20">
          <img src="/img/baloon.png"/>
        </div>
        <div style={{fontSize: '19px'}} className="text-center  m-b-20">Thank you for registering!</div>
        <div style={{fontSize: '16px'}} className="m-b-20">
          Please verify your email. We’ve sent you a verification link.
        </div>
      </div>
      <div>
        <Link to="/resend-verification">Resend a verification link.</Link>
      </div>
    </ModalBody>
  </Modal>
;

export default EmailVerificationSent;