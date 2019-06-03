import React from 'react';
import styled from 'styled-components';

import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import PasswordResetFormContainer from "../ResetPassword/containers/PasswordResetFormContainer";

class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emailSent: false
    }
  }

  onSuccess = () => {
    this.setState({ emailSent: true })
  }

  render() {
    const { open, toggle, closeModal } = this.props
    const { emailSent } = this.state

    return (
      <StyledModal isOpen={open} className="custom" toggle={toggle}>
        <ModalBody>
          <div className="custom-header">
            <img src="/img/logo.svg" width="82" height="36" />
            <div className="title">{emailSent ? 'Reset Your Password' : 'Forget Password'}</div>
            <img
              src="/img/icons/ico-cross.png"
              width="20"
              height="20"
              onClick={closeModal}
            />
          </div>

          {
            emailSent ? (
              <div className="sent-email text-center">
                We have sent a verification email to your email address. Please click on the link provided in the email.
              </div>
            ) : (
              <div className="main-content">
                <PasswordResetFormContainer onSuccess={this.onSuccess}/>
              </div>
            )
          }
        </ModalBody>
      </StyledModal>
    )
  }
}

const StyledModal = styled(Modal)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  max-width: 100%;
  width: 100%;

  .modal-content {
    max-width: 520px;
  }

  .modal-body {
    background-color: #2E3A4D;
    color: white;
    padding: 0 !important;

    .custom-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      box-shadow: 0 3px 3px #00000045;
      position: relative;

      .title {
        font-size: 16px;
        font-weight: bold;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }

      img {
        z-index: 2;
      }
    }

    .main-content {
      padding: 30px 100px;
      text-algin: center;

      > * {
        margin-bottom: 10px;
      }

      label {
        text-transform: Capitalize;
      }

      input {
        background: #374B66;
        border: none;
        border-radius: 2px;
        color: white;
      }

      button.btn {
        width: 100%;
        border: none;
        border-radius: 2px;
        background-color: #5CA0F6;
      }
    }

    .sent-email {
      margin: 34px 32px;
    }
  }
`

export default PasswordReset;