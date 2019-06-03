import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { push } from 'react-router-redux';

import store from '/imports/store';
import { PrimaryButton } from '../../../components/styled-components/Buttons';

const ModalRestrictedAccess = ({isOpen, toggle}) => {
  const redirectToSetup2FA = () => {
    localStorage.setItem('isNewUser', true);
    toggle(false);
    store.dispatch(push('/'));
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom">
      <ModalHeader toggle={() => toggle(false)}>
        2-FACTOR AUTHENTICATION IS DISABLED
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <p className="m-0">
              Please setup 2FA to be allowed to perform this action
            </p>
          </Col>
        </Row>
        <Row className="m-t-40">
          <Col className="text-center">
            <PrimaryButton onClick={redirectToSetup2FA}>Setup 2FA</PrimaryButton>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};


export default ModalRestrictedAccess;
