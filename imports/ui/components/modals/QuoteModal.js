import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from 'reactstrap';
import QuoteForm from '../GetQuote/components/QuoteForm'

class QuoteModal extends React.Component {

  render() {
    const { title, isOpen, toggle, closeModal } = this.props

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
            <div className="text-center m-b-20">
              Tell us more about your business requirements and we will get in touch with you!
            </div>
            <QuoteForm toggleModal={toggle} />
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
    max-width: 800px;
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
      padding: 30px 70px;
      text-algin: center;

      input {
        background: #374B66;
        border: none;
        border-radius: 2px;
        color: white;
        font-size: 16px;
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
    }
  }
`

export default QuoteModal
