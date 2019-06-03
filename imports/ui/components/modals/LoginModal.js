import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from 'reactstrap';
import { userRoles } from 'meteor/populous:constants';
import LoginForm from '../Login/components/LoginForm'

class LoginModal extends React.Component {  

  render() {
    const { title, isOpen, toggle, openForgotPassword, openSignUp, closeModal } = this.props

    return (
      <StyledModal isOpen={isOpen} toggle={toggle}>
        <ModalBody>
          <div className="custom-header">
            <img src="/img/logo.svg" width="82" height="36" />
            <div className="title">{title}</div>
            <img
              src="/img/icons/ico-cross.png"
              width="20"
              height="20"
              onClick={closeModal}
            />
          </div>
  
          <div className="main-content">
            <LoginForm
              form="borrower"
              initialValues={{role: userRoles.investor}}
              passwordType="password"
              toggleModal={toggle}
              openForgotPassword={openForgotPassword}
              openSignUp={openSignUp}
            />
          </div>
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
    padding: 0;

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

      input {
        background: #374B66;
        border: none;
        border-radius: 2px;
        color: white;
      }

      button {
        width: 100%;
        border: none;
        border-radius: 2px;
        background-color: #5CA0F6;

        &[disabled] {
          background-color: #999999;
          border-color: #999999;
        }
      }

      .others {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #5CA0F6;

        .not-on-populous {
          color: white;
        }
      }
    }
  }
`

export default LoginModal
