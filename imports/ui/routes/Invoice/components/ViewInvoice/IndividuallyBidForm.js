import React from 'react';
import {Col, Row, FormGroup, FormText} from 'reactstrap';
import {connect} from 'react-redux';
import {Field, reduxForm, change, formValueSelector} from 'redux-form';
import {getTierFee, minBidAmount} from 'meteor/populous:constants';
import {apiHelpers, Bid} from 'meteor/populous:api';

import {Switch} from '../../../../components/styled-components/Invoices/Invoice';
import {LABEL, Lead, P} from '../../../../components/styled-components/Typography/index';
import {PrimaryButton} from '../../../../components/styled-components/Buttons';
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

const IndividuallyBidForm =
  ({
     handleSubmit, anonymousBid,
     handleAnonymousChecked, handleChangeForm, dispatch, initialValues: {invoice},
     maxAvailableAmount, currentUser, blocked, ...props
   }) => {

  const amount = Number.parseFloat(props.amount) || 0;
  const {returnAmount, returnPercentage} = bidInstance.getReturnParams(invoice, amount, true);

  const setAmount = (value) => {
    dispatch(change('individuallyBidForm', 'amount', value + ''));
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

  return (<form
      className="form"
      onSubmit={handleSubmit}
    >
      <Row className="m-t-30 px-3">
        <Col xs="8" sm={6} md={{size: 4, offset: 2}}>
          <FormGroup className="m-r-10">
            <Field
              name="amount"
              normalize={(value) => {
                if (value > invoice.salePrice) {
                  return invoice.salePrice;
                }
                return value;
              }}
              label="Your bid"
              placeholder=""
              component={InputFloat}
              required={true}
              step={currentUser.settings.auctions.bidPresets.step}
            />
            <FormText color="muted" className="cursor-pointer m-b-5">
              <DottedValue onClick={() => setAmount(setMinBid(invoice.salePrice))}>
                <PrimaryText>
                  {setMinBid(invoice.salePrice)}
                </PrimaryText>
              </DottedValue> - <DottedValue onClick={() => setAmount(maxAmount)}>
              <PrimaryText>
                {maxAmount}
              </PrimaryText>
            </DottedValue>
            </FormText>
            <ClickableBidPresets maxAvailbaleAmount={maxAmount} onClick={setAmount}/>
          </FormGroup>
        </Col>
        <Col xs="4" sm={6} md="4">
          <div style={arrowStyle}>
            <img src="/img/icons/ico-arrow-right.svg" height="30"/>
          </div>
          <FormGroup className="m-l-10">
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
              checked={false}
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
};

const formName = 'individuallyBidForm';
const selector = formValueSelector(formName);

const IndividuallyBidFormRF = reduxForm({
  form: formName,

  onSubmit: ({invoice, ...params}, dispatch) => {
    if (!params.amount || params.amount === '0') {
      return false;
    }
    dispatch(placeBid(invoice, params, formName));
  },

  validate: addBid
})(IndividuallyBidForm);


export default connect(state => {
  return {
    amount: selector(state, 'amount'),
  }
})(IndividuallyBidFormRF);
