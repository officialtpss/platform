import React, {Fragment} from 'react';
import {Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Tooltip} from 'reactstrap';
import {countries, fixtures} from 'meteor/populous:constants';

import LoadMoreSpinner from '../../../components/LoadMoreSpinner';
import QuestionMarkIcon from '../../../components/Icons/QuestionMark';
import {H3, LABEL, P, Small} from '../../../components/styled-components/Typography';
import {UnderLineDiv} from '../../../components/styled-components/Divs';
import {InputInvisible} from '../../../components/styled-components/Inputs';
import {PrimaryButton} from '../../../components/styled-components/Buttons';
import StaticFormText from '../helpers/StaticText';
import AddBankAccountForm from '../containers/AddBankAccountForm';
import ModalRestrictedAccess from '../../../components/Requires2FA/components/ModalRestrictedAccess';

const hideNumber = (number) => {
  let times = number.length - 4;
  if (times < 0) times = 0;
  return '*'.repeat(times) + number.slice(-4);
};

const initialSate = {
  showNumber: false,
  showSortCode: false,
};


class BankDetails extends React.Component {
  state = {...initialSate};

  toggleHiddenNumber = (type) => {
    this.setState({[type]: !this.state[type]});
  };

  getBaseQuestionIco = () => {
    const {showBankTooltip, toggleTooltip} = this.props;

    return (
      <Fragment>
        <span className="base-question-ico vertical-align" id="baseTooltip">
          <QuestionMarkIcon/>
        </span>
        <Tooltip className={'tooltip-custom'} placement="top-start"
                 isOpen={showBankTooltip}
                 target="baseTooltip"
                 toggle={() => toggleTooltip(showBankTooltip)}
                 autohide={false}>
          Terms needed for bank to be approved.
        </Tooltip>
      </Fragment>
    );
  };

  getAccountData = (type) => {
    const {selectedBank} = this.props;
    const isAccountNumber = type === 'showNumber';
    const data = isAccountNumber ? selectedBank.number : selectedBank.sortCode;
    const label = isAccountNumber ? 'Account number' : 'Sort code';
    return (
      <P>
        <Small>{ label }</Small>
        <span>{this.state[type] ? data : hideNumber(data)}</span>
        <img src="/img/icons/ico-show.svg" className="m-l-10"
             style={{cursor: 'pointer'}}
             onClick={() => this.toggleHiddenNumber(type)}/>
      </P>
    )
  };

  render() {
    const {loading, accounts, selectedBank, selectBank, showBankModal, toggleModal, removeBankDetail, currentUser} = this.props;

    if (loading) {
      return <div className="loader m-t-10"><LoadMoreSpinner /></div>;
    }

    const defaultUsersEmails = Object.values(fixtures.users).map(user => user.email);
    const isNewUser = currentUser && !currentUser.twoFAKey && !defaultUsersEmails.includes(currentUser.emailAddress());

    let _country;
    if (selectedBank) {
      _country = selectedBank.country;
      for (let c of countries) {
        if (c.key == _country) {
          _country = c.name;
          break;
        }
      }
    }

    return (
      <div className="bank-details">
        <H3>Bank Details</H3>
        <Row>
          <Col xs="12" xl="5" className="m-t-30">
            <FormGroup>
              <LABEL>Your bank accounts</LABEL>
              <UnderLineDiv>
                <InputInvisible type="select" name="bank_account" onChange={(e) => selectBank(e.target.value)}>
                  <option value={0} style={{display: 'none'}}>Select your bank account...</option>
                  {
                    accounts.map((account, i) => (
                      <option value={account._id} key={i}>
                        {account.name}
                      </option>
                    ))
                  }
                </InputInvisible>
              </UnderLineDiv>
            </FormGroup>
            <PrimaryButton md className="m-t-10" onClick={() => toggleModal(1)}>+ Add Account</PrimaryButton>
          </Col>
          {
            selectedBank &&
            <Col xs="12" xl="7" className="m-t-30">
              <div onClick={() => toggleModal(2)} className="edit-btn">
                <img src="/img/icons/ico-edit.svg"/>
              </div>
              <StaticFormText label="Bank name" value={selectedBank.name}/>
              <StaticFormText label="Country" value={_country}/>
              <Row>
                <Col md="3">
                  <StaticFormText label="Currency" value={selectedBank.currency}/>
                </Col>
                <Col md="5">
                  {this.getAccountData('showNumber')}
                </Col>
                <Col md="4">
                  {this.getAccountData('showSortCode')}
                </Col>
              </Row>
              <div className="m-b-10">
                <img src="/img/icons/ico-check.png" alt="approved"/> Accepted
                {this.getBaseQuestionIco()}
              </div>
              <PrimaryButton outline md className="m-t-10" onClick={() => removeBankDetail(selectedBank)}>Delete This
                Account</PrimaryButton>
            </Col>
          }
        </Row>
        { isNewUser &&
        <ModalRestrictedAccess isOpen={!!showBankModal} toggle={toggleModal}/>
        }
        { !isNewUser &&
        <Modal isOpen={!!showBankModal} toggle={() => toggleModal(0)} className="custom">
          <ModalHeader toggle={() => toggleModal(0)}>Bank Account</ModalHeader>
          <ModalBody>
            <AddBankAccountForm />
          </ModalBody>
        </Modal>
        }
      </div>
    );
  }
}

export default BankDetails;
