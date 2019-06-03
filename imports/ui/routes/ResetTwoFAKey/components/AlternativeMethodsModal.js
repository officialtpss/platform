import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {P, LABEL} from '../../../components/styled-components/Typography';
import { StyledInput } from '../../../components/styled-components/Inputs';
import { PrimaryButton } from '../../../components/styled-components/Buttons';

class AlternativeMethodModal extends Component{

  constructor (props) {
    super(props);
    this.state = {
      smsCode: '',
    };
  }

  onInputChange = (e) => {
    this.setState({
      smsCode: e.target.value,
    });
  }

  render() {
    const {isOpen, toggle, method, sendReset2faLink, email, sendSms, compareSmsCodes, className} = this.props;

    return(
      <Modal isOpen={isOpen} toggle={toggle} className={`${className} custom`}>
        <ModalHeader toggle={toggle}>2-factor authentication reset</ModalHeader>
        <ModalBody>
          {method==='sms'
            ? <div>
              6-digit SMS code has been sent to the registered phone number.
              Type it into the field below

              <div className='m-t-20'>
                <LABEL>sms code</LABEL>
                <StyledInput name="email" type="email" onChange={this.onInputChange} value={this.state.smsCode} />
              </div>

              <div className='button-block'>
                <PrimaryButton className="m-t-40" onClick={()=>{compareSmsCodes(this.state.smsCode)}} >
                  reset 2fa
                </PrimaryButton>
              </div>

              <Link to={'#'} className='m-t-30' onClick={sendSms} >Resend SMS with a code.</Link>
            </div>
            : <div>
              <P>A reset link has been sent to the email {email}.</P>
              <Link to={'#'} onClick={(e)=>{sendReset2faLink(toggle)}} className='m-t-30'>Resend a reset link.</Link>
            </div>
          }
        </ModalBody>
      </Modal>
    );
  }
}

export default styled(AlternativeMethodModal)`
  a{
    font-size: 14px;
  }
  label{
    display: block;
  }
  
  .button-block{
    text-align: center;
  }
`;