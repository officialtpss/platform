import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {P, LABEL} from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';

const CameraAccessConfirmModal = props => {

  const {isOpen, toggle, allowAccess } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={'custom'}>
      <ModalHeader toggle={toggle}>Take a photo</ModalHeader>
      <ModalBody>
        <P>Press the button to access the camera</P>

        <div className={'d-flex justify-content-center align-content-center'}>
          <PrimaryButton className="m-t-40" onClick={allowAccess}>
            allow populous to use my camera
          </PrimaryButton>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default CameraAccessConfirmModal;
