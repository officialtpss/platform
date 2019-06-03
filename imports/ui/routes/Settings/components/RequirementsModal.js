import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { P } from '../../../components/styled-components/Typography';


const RequirementsModal = ({isOpen, toggle}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom" style={{maxWidth: '992px'}}>
      <ModalHeader toggle={toggle}>requirements to uploaded documents</ModalHeader>
      <ModalBody>
        <P>
          Acceptable file formats: <strong>jpg, png, jpeg</strong>.<br/>
          Maximum fIle size: <strong>3Mb</strong>.<br/>
          Minimum fIle size: <strong>15Kb</strong>.<br/>
          All photos/copies must be colored.<br/>
        </P>
        <P className="m-b-0">
          Capturing quality images is highly important for successful verification. Please follow the suggested recommendations:<br/>
          - The entire document should be contained within the image including all edges;<br/>
          - Your fingers should not obstruct the document;<br/>
          - There should not be any glare or shadows dropped on the document/face;<br/>
          - Capture a non-blurry image;<br/>
          - Take a photo perpendicularly to the document surface;<br/>
          - Put the document on contrasting background;<br/>
          - Take a photo in a well-lit room;<br/>
          - Look directly at the camera when you are taking a photo of yourself.<br/>
        </P>
      </ModalBody>
    </Modal>
  );
};

export default RequirementsModal;
