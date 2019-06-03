import React, {Component}from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup } from 'reactstrap';
import { LABEL } from '../../../components/styled-components/Typography';
import { StyledInput } from '../../../components/styled-components/Inputs';
import { PrimaryButton } from '../../../components/styled-components/Buttons';

class RecoveryModal extends Component {

  constructor (props) {
    super(props);
    this.state = {

    };
  }

  render(){
    const {isOpen, toggle, saveRecoveryEmail, currentUser} = this.props;

    return (
      <Modal isOpen={isOpen} toggle={()=>toggle(false)} className="custom" >
        <ModalHeader toggle={()=>toggle(false)}>change recovery email</ModalHeader>
        <ModalBody>
          <div className='m-t-20'>
            <Form
              onSubmit={e => {
                e.preventDefault();
                const {email} = e.target;
                saveRecoveryEmail(email.value);
                toggle(false);
              }}
              className="form custom"
            >
              <FormGroup>
                <LABEL>email</LABEL>
                <StyledInput name="email" type="email" defaultValue={currentUser.recoveryEmail || ''} />
              </FormGroup>
              <div className="d-flex justify-content-center align-content-center">
                <PrimaryButton className="m-t-40" >
                  change recovery email
                </PrimaryButton>
              </div>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    );
  };
};

export default RecoveryModal;
