import React from 'react';
import {Col, Row, FormGroup, FormText} from 'reactstrap';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector, change} from 'redux-form';
import {getTierFee, minBidAmount} from 'meteor/populous:constants';
import {Bid} from 'meteor/populous:api';

import {Switch} from '../../../../components/styled-components/Invoices/Invoice';
import {LABEL, Lead, P} from '../../../../components/styled-components/Typography/index';
import {PrimaryButton} from '../../../../components/styled-components/Buttons';
import {renderInputReactstrap} from '../../../../form-helpers/renderInputTextFields';
import renderSwitch from '../../../../form-helpers/renderSwitch';
import {placeBid} from '../../modules/actions/index';
import {addBid} from '../../../../form-helpers/validation';
import {InputFloat} from "../../../../form-helpers/InputFloat";
import ClickableBidPresets from "../../../../components/UserComponents/ClickableBidPresets";
import DottedValue from "../../../../components/styled-components/DottedValue";
import {PrimaryText} from "../../../../components/styled-components/Typography";

const arrowStyle = {
  position: 'absolute',
  left: '-15px',
  top: '28px'
};

const bidInstance = new Bid();

const GroupBidForm =
  ({
     handleSubmit, anonymousBid,
     handleAnonymousChecked, handleChangeForm, dispatch,
     maxAvailableAmount,
     currentUser, initialValues: {invoice}, blocked, ...props,
   }) => {

  const amount = Number.parseFloat(props.amount) || 0,
    goal = Number.parseFloat(props.goal) || 0;
  const {returnAmount, returnPercentage} = bidInstance.getReturnParams(invoice, amount, false, goal);

  const setGoal = (value) => {
    dispatch(change(formName, 'goal', value));
  };

  const setAmount = (value) => {
    dispatch(change(formName, 'amount', value));
  };

  const setMinBid = value => {
    if (value < minBidAmount) {
      return value;
    }
    return minBidAmount;
  };

  let maxAmount = invoice.salePrice;
  if(maxAmount> maxAvailableAmount){
    maxAmount = maxAvailableAmount
  }

  let shareMaxAmount = goal || invoice.salePrice;
  if(shareMaxAmount > maxAvailableAmount){
    shareMaxAmount = maxAvailableAmount
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <Row className="m-t-30 px-3">
        <Col xs="12" md="6" xl="3">
          <FormGroup className="m-r-10 m-l-10">
            <Field
              name="groupName"
              type="text"
              label="Group name"
              placeholder=""
              component={renderInputReactstrap}
              required={true}
            />
          </FormGroup>
        </Col>

        <Col xs="12" md="6" xl="3">
          <FormGroup className="m-r-10 m-l-10">
            <Field
              name="goal"
              type="number"
              label="Goal bid"
              placeholder=""
              tooltipcontent="Enter a value between 134 and the Goal Sale Price"
              component={InputFloat}
              required={true}
              normalize={(value) => {
                if (value > invoice.salePrice) {
                  return invoice.salePrice;
                }

                return value;
              }}
            />
            <FormText color="muted" className="text-right cursor-pointer">
              <DottedValue onClick={() => setGoal(setMinBid(invoice.salePrice))}>
                <PrimaryText>
                  {setMinBid(invoice.salePrice)}
                </PrimaryText>
              </DottedValue> - <DottedValue onClick={() => setGoal(maxAmount)}>
              <PrimaryText>
                {maxAmount}
              </PrimaryText>
            </DottedValue>
            </FormText>
          </FormGroup>
        </Col>

        <Col xs="8" sm={6} xl="3">
          <FormGroup className="m-r-10 m-l-10">
            <Field
              name="amount"
              type="number"
              min={1}
              label="Your share"
              placeholder=""
              component={InputFloat}
              required={true}
              step={currentUser.settings.auctions.bidPresets.step}
              normalize={(value) => {
                if (value > goal) {
                  return goal;
                }

                return value
              }}
            />
            <FormText color="muted" className="cursor-pointer m-b-5">
              <DottedValue onClick={() => setAmount(1)}>
                <PrimaryText>
                  1
                </PrimaryText>
              </DottedValue> - <DottedValue onClick={() => setAmount(shareMaxAmount)}>
                <PrimaryText>
                  {shareMaxAmount}
                </PrimaryText>
              </DottedValue>
            </FormText>
            <ClickableBidPresets maxAvailbaleAmount={shareMaxAmount} onClick={setAmount}/>
          </FormGroup>
        </Col>

        <Col xs="4" sm={6} xl="3">
          <FormGroup className="m-r-10 m-l-10">
            <div style={arrowStyle}>
              <img src="/img/icons/ico-arrow-right.svg" height="30"/>
            </div>
            <div>
              <LABEL>Your Return</LABEL>
              <Lead className="my-2">{returnAmount} ({returnPercentage}%)</Lead>
            </div>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col xs={{size: 8, offset: 2}} sm={{size: 6, offset: 3}} md={{size: 4, offset: 4}}>
          <FormGroup className="switch-container">
            <Switch
              checked={true}
              onChange={handleChangeForm}
              onColor="#E1E5EB"
              offColor="#fff"
              onHandleColor="#5CA0F6"
              offHandleColor="#A5ACB5"
              handleDiameter={18}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 1px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
              height={10}
              width={35}
              className="switch-checkbox m-r-10"
            />
            <P className="d-inline-block m-0">Enable group bidding</P>
          </FormGroup>

          <FormGroup className="switch-container">
            <span onClick={handleAnonymousChecked}>
              <Field
                component={renderSwitch}
                name="isAnonymous"
                anonymousBid={anonymousBid}
                handleAnonymousChecked={handleAnonymousChecked}
              />
            </span>
            <P className="d-inline-block m-0">Bid anonymously</P>
          </FormGroup>
        </Col>

        <Col xs="12">
          <FormGroup>
            <Col xs={{offset: 3, size: 6}} md={{offset: 4, size: 4}}>
              <PrimaryButton className="w-100" disabled={blocked}>
                Submit Bid
              </PrimaryButton>
            </Col>
          </FormGroup>
        </Col>
      </Row>
    </form>
  );
}

const formName = 'groupBidForm';
const selector = formValueSelector(formName);
const GroupBidFormRF = reduxForm({
  form: formName,

  onSubmit: ({invoice, ...params}, dispatch) => {
    if (!params.amount || params.amount === '0') {
      return false;
    }
    dispatch(placeBid(invoice, {isGroup: true, ...params}, formName));
  },

  validate: addBid
})(GroupBidForm);

export default connect(state => {
  return {
    ...selector(state, 'amount', 'goal'),
  }
})(GroupBidFormRF);
