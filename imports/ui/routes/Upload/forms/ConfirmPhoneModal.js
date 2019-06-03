import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { P, LABEL, LinkText } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';


const ConfirmPhoneModal = ({isOpen, toggle, confirmPhoneNumber, verifySmsCode}) => {
   return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom">
      <ModalHeader toggle={toggle}>Confirm your phone number</ModalHeader>
      <ModalBody>
        <div>
          <P>
            A 6-digit SMS code has been sent to your phone number. Type it into the field below
          </P>
        </div>
        <div>
          <form
            className="form"
            onSubmit={e => {
              e.preventDefault();
              verifySmsCode(e.target.code.value);
            }}
          >
            <div className="form-group m-t-10">
              <LABEL>SMS code</LABEL>
              <input
                className="form-control"
                placeholder=""
                type="text"
                name="code"
                maxLength="6"
                autoFocus
              />
            </div>

            <div className="text-center">
              <PrimaryButton width="160px" className="m-t-20">
                Submit
              </PrimaryButton>
            </div>
          </form>
        </div>
        <div className="m-t-20">
          <LinkText inline onClick={confirmPhoneNumber}>Resend SMS with a code.</LinkText>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmPhoneModal;
