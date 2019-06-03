import React from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { PrimaryButton } from '../../styled-components/Buttons';

const AlertModal = ({ showModal, onClose, html, headerText, buttonText }) => {
  return (
    <Modal isOpen={showModal} className="custom" toggle={onClose}>
      <ModalHeader toggle={onClose}>{headerText}</ModalHeader>
      <ModalBody>
        <div dangerouslySetInnerHTML={{__html: html}}>
        </div>
      </ModalBody>
      <ModalFooter className="justify-content-center">
        <PrimaryButton onClick={onClose}>{buttonText}</PrimaryButton>
      </ModalFooter>
    </Modal>
  )
};

export default AlertModal;
