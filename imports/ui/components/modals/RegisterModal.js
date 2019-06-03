import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import {userRoles} from 'meteor/populous:constants';
import { Modal, ModalBody, TabContent, TabPane } from 'reactstrap';
import RegistrationSellerForm from '../Registration/form/RegistrationSellerForm';
import RegistrationBuyerForm from '../Registration/form/RegistrationBuyerForm';
import { createUser } from '../Registration/helpers'

import Tab from '../../components/styled-components/Tab';

class RegisterModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1'
    }
  }

  handleCreateBorrower = values => {
    createUser(
      values,
      userRoles.borrower,
      this.props.history.push
    );
  };

  handleCreateInvestor = values => {
    createUser(
      values,
      userRoles.investor,
      this.props.history.push
    );
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { title, isOpen, toggle, openLogin, closeModal } = this.props

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
            <div className="registration-type">
              <div className="register-as">
                Register as
              </div>

              <div className="type-controls">
                <Tab
                  width="50%"
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  <i className="fa fa-check"/> Invoice seller
                </Tab>
                <Tab
                  width="50%"
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  <i className="fa fa-check"/> Invoice buyer
                </Tab>
              </div>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <div className="type-description">
                    I want to sell my invoices online to take control of my cash flow
                  </div>
                  <div className="divider"></div>
                  <RegistrationSellerForm
                    onSubmit={this.handleCreateBorrower}
                    openLogin={openLogin}
                  />
                </TabPane>

                <TabPane tabId="2">
                  <div className="type-description">
                    I want to buy invoices and gain returns on leveraged funds & investment
                  </div>
                  <div className="divider"></div>
                  <RegistrationBuyerForm
                    onSubmit={this.handleCreateInvestor}
                    openLogin={openLogin}
                  />
                </TabPane>
              </TabContent>

            </div>
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
      padding: 20px 100px;
      text-algin: center;

      .registration-type {
        width: 100%;

        .register-as {
          text-align: center;
          text-transform: Uppercase;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .type-controls {
          margin-bottom: 5px;
          button {
            width: 50%;
            font-size: 12px;
            background-color: #374B66;
            color: white;
            padding-top: 12px;
            padding-bottom: 12px;

            &.active {
              background-color: #5CA0F6;
              font-weight: bold;
            }
          }
        }

        .tab-content {
          .type-description {
            text-align: center;
            font-size: 14px;
          }

          .divider {
            width: 100%;
            height: 1px;
            background-color: #00000030;
            margin-bottom: 10px;
            margin-top: 15px;
          }
        }
      }

      > * {
        margin-bottom: 10px;
      }

      .form-group {
        margin-bottom: 8px;

        label {
          text-transform: Capitalize;
        }
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

    }
  }
`

export default withRouter(RegisterModal)
