import React from 'react';

import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from "react-router-dom";

const EmailNotVerified = ({open, toggle}) =>
  <Modal isOpen={open} className="custom" toggle={toggle}>
    <ModalHeader toggle={toggle}>Email verification</ModalHeader>
    <ModalBody>
      <div className="m-b-20">
        <div style={{fontSize: '16px'}} className="m-b-20">This account email is not verified.</div>
        <div style={{fontSize: '16px'}} className="m-b-20">
          We have sent you a new verification link. Please use it to verify
          your email.
        </div>
      </div>
      <div>
        <Link to="/resend-verification">Resend a verification link.</Link>
      </div>
    </ModalBody>
  </Modal>
;

export default EmailNotVerified;