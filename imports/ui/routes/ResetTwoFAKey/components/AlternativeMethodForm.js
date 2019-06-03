import React from 'react';
import styled from 'styled-components';
import {toastr} from 'react-redux-toastr';

import { PrimaryButton } from '../../../components/styled-components/Buttons';
import CustomRadio from "../../../components/styled-components/Forms/CustomRadio";
import {statuses} from 'meteor/populous:constants';
import AlternativeMethodsModal from './AlternativeMethodsModal';


class AlternativeMethodForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      method: 'sms',
      isModalOpen: false,
    };
  }

  changeMethod = (method) => {
    this.setState({method: method});
  };

  toggleModal = () => {
    this.setState({isModalOpen: !this.state.isModalOpen});
  };

  onContinue = () => {
    const{currentUser} = this.props;

    if(this.state.method==='mail'){
      if(currentUser.recoveryEmail || currentUser.emailAddress()){
        this.sendReset2faLink();
        this.toggleModal();
      } else {
        toastr.error('Error', 'Please add your recovery email.');
      }
    } else if(this.state.method==='sms'){
      if(currentUser.phoneNumber){
        this.sendSms();
        this.toggleModal();
      } else {
        toastr.error('Error', 'Please add your phone number.');
      }
    } else if(this.state.method==='documentSubmission'){
      this.props.toggleMethod('documentSubmission');
    }
  };

  sendReset2faLink = (toggle) => {
    const{currentUser} = this.props;
    const email = currentUser.recoveryEmail || currentUser.emailAddress();
    if(currentUser && email) {
      currentUser.callMethod('sendTwoFAKeyResetForEmail', email, !!currentUser.recoveryEmail, (err, res) => {
        if(!err){
          toggle && toggle();
        } else {
          console.log('Error: ',err);
        }
      });
    } else {
      toastr.error('Error', 'Please add your recovery email.');
    }
  };

  sendSms = () => {
    const{currentUser} = this.props;

    if(currentUser && currentUser.phoneNumber){
      currentUser.callMethod('sendVerificationCode', (err, res) => {
        if(err){
          toastr.error('Error!', '');
        }
      });
    } else {
      toastr.error('Error', 'Please add your phone number.');
    }
  };

  compareSmsCodes = (smsCode) => {
    const{reduxUser, currentUser, history} = this.props;

    if(currentUser){
      currentUser.callMethod('verifySmsCode', parseInt(smsCode), true, (err, res) => {
        if(!err){
          if(res){
            if (reduxUser) {
              history.push('/settings/setup-2-fa')
            } else {
              toastr.success('2FA has been successfully reset, please login again');
              history.push('/login');
            }
          } else {
            toastr.error('Error!', 'Your code is not valid.');
          }
        } else {
          console.log('Error: ',err);
        }
      });
    }
  };

  formattedMail = () => {
    const{currentUser} = this.props;
    if(currentUser && currentUser.recoveryEmail){
      const emailParts = currentUser.recoveryEmail.split("@");
      return `${emailParts[0][0]}......@${emailParts[1]}`;
    } else if (currentUser && currentUser.emailAddress()) {
      const emailParts = currentUser.emailAddress().split("@");
      return `${emailParts[0][0]}......@${emailParts[1]}`;
    }

    return null;
  };

  render() {
    const{currentUser} = this.props;

    return (
      <div className={`${this.props.className}`}>
        <div className='m-t-30'>
          Please select desirable method
        </div>

        <div className='radio-block m-t-30'>
          {(currentUser.phoneAreaCode && currentUser.phoneNumber) &&
          <CustomRadio name="smsMethod"
            label={'Reset via SMS'}
            checked={this.state.method==='sms'}
            onChange={()=>{this.changeMethod('sms')}}
            id={'smsMethod'}
            value={'sms'}
          />
          }

          {this.formattedMail() &&
          <CustomRadio name="mailMethod"
            label={`Reset via recovery email ${this.formattedMail()}`}
            checked={this.state.method==='mail'}
            onChange={()=>{this.changeMethod('mail')}}
            id={'mailMethod'}
            value={'mailMethod'}
          />
          }

          {currentUser.KYCStatus === statuses.verified &&
          <CustomRadio name="kycMethod"
            label={'Reset via KYC document submission'}
            checked={this.state.method==='documentSubmission'}
            onChange={()=>{this.changeMethod('documentSubmission')}}
            id={'kycMethod'}
            value={'kycMethod'}
          />
          }
        </div>

        <PrimaryButton className="m-t-40" onClick={this.onContinue} >
          continue
        </PrimaryButton>

        <AlternativeMethodsModal
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
          method={this.state.method}
          email={this.formattedMail()}
          sendReset2faLink={this.sendReset2faLink}
          sendSms={this.sendSms}
          compareSmsCodes={this.compareSmsCodes}
        />
      </div>
    );
  };
}

export default styled(AlternativeMethodForm)`
  .radio-block{
    max-width: 400px;
    margin: auto;
    
   .form-group {
      margin-bottom: 10px;
      margin-left: 50px;
    }
  }
`;
