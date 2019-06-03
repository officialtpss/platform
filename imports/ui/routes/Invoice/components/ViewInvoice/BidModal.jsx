import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { invoiceStatuses } from 'meteor/populous:constants';
import { Row, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, FormText, ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';
import { Bid, apiHelpers } from 'meteor/populous:api';

import { Small, P, NaviText, LABEL, Lead } from '../../../../components/styled-components/Typography/index';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import RenderSwitch from '../../../../form-helpers/renderSwitch';
import increaseIndividualBid from '../../modules/actions/increaseIndividualBid';
import joinOrEditGroupBid from '../../modules/actions/joinOrEditGroupBid';
import { floor } from '../../../../utils/formatter';
import {InputFloat} from "../../../../form-helpers/InputFloat";
import DottedValue from "../../../../components/styled-components/DottedValue";
import {PrimaryText} from "../../../../components/styled-components/Typography";
import ClickableBidPresets from "../../../../components/UserComponents/ClickableBidPresets";

const renderGroupBidders = (bid, invoice, bidders = [], users, currentUser) => {
  if (!bidders.length) {
    return;
  }

  const currency = invoice.getCurrency();

  return (
    <div className="m-t-30">
      <div className="d-flex justify-content-between">
        <Small>Participants</Small>
        <Small>Amount, {currency.title}</Small>
      </div>
      <ListGroup>
        {bidders.map((bidder, index) =>
          <ListGroupItem key={index}>
            <div className="d-flex justify-content-between">
              <P className="m-0">
                {bidder.isAnonymous ? 'Anonymous' : (users[bidder.userId].getBidName())}
              </P>
              <P className="m-0">{floor(bidder.amount)}</P>
            </div>
            <div>
              <Small inline className="m-r-10" style={{ fontSize: '12px' }}>{bid.formatDate(moment(bidder.updatedAt))}</Small>
              {currentUser._id === bidder.userId &&
              <Small inline className="label-your-bid">Your bid</Small>
              }
            </div>
          </ListGroupItem>
        )}
        <ListGroupItem className="text-right" color="secondary" style={{backgroundColor: '#f9fbfd'}}>
          <P className="m-0" style={{ fontWeight: '700' }}>
            Amount raised: {currency.title} {floor(bid.getRaisedBidAmount())}
          </P>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

const renderGoalAndRemain = (bid, invoice) => {

  const currency = invoice.getCurrency();

  return (
      <Fragment>
        <div className="d-flex align-items-center m-b-20">
          <div className="m-r-10">
            <img src="/img/icons/ico-arrow-board.png" height="30"/>
          </div>
          <div>
            <Small className="m-b-10">Goal bid</Small>
            <NaviText className="m-0">{currency.title} {floor(bid.amount)}</NaviText>
          </div>
        </div>

        <div className="d-flex align-items-center m-b-20">
          <div className="m-r-10">
            <img src="/img/icons/ico-checking.png" height="30"/>
          </div>
          <div>
            <Small className="m-b-10">Remaining amount</Small>
            <NaviText className="m-0">{currency.title} {floor(bid.getRemainingAmount())}</NaviText>
          </div>
        </div>
      </Fragment>
  );
};

const formInitialState = {
  amount: '',
  isAnonymous: false,
  isAmountValid: true,
};

const bidInstance = new Bid();

class RenderForm extends React.Component {

  state = { ...formInitialState };

  calculations() {
    const { isJoined, isGroup, bid, invoice } = this.props;
    const amount = Number.parseFloat(this.state.amount) || 0;
    const remainingAmount = isGroup ? bid.getRemainingAmount() : Number.parseFloat((invoice.salePrice - bid.amount).toFixed(2));

    let bidReturnAmount,
      bidReturnPercentage,
      isAmountValid,
      newBidAmount = amount;

    if (isGroup) {
      if (isJoined && bid.bidders && bid.bidders.length) {
        bid.bidders.forEach((bidder) => {
          if (bidder.userId === Meteor.userId()) {
            newBidAmount += bidder.amount;
            return true;
          }
        });
      }

      const {returnAmount, returnPercentage} = bidInstance.getReturnParams(invoice, newBidAmount, false, bid.amount);

      bidReturnPercentage =returnPercentage;
      bidReturnAmount = returnAmount;
      isAmountValid = amount <= remainingAmount;
    } else {
      newBidAmount += bid.amount;

      const {returnAmount, returnPercentage} = bidInstance.getReturnParams(invoice, newBidAmount, true);

      bidReturnPercentage = returnPercentage;
      bidReturnAmount = returnAmount;
      isAmountValid = newBidAmount <= invoice.salePrice;
    }

    return { bidReturnAmount, bidReturnPercentage, isAmountValid, remainingAmount };
  }

  setAmountByClick = (value) => {
    if(value>0){
      this.setState({
        amount: value,
      });
    }
  };

  render() {
    const { isJoined, isGroup, ledgerBalance, currentUser, } = this.props;
    const { amount, isAnonymous, isAmountValid: isAmountValidState } = this.state;
    const { bidReturnAmount, bidReturnPercentage, isAmountValid, remainingAmount } = this.calculations();
    let maxAmount = remainingAmount;

    if(ledgerBalance.amount < maxAmount){
      maxAmount = ledgerBalance.amount;
    }
    const {settings: {auctions: {bidPresets: {step,}}}} = currentUser;

    return (
      <Fragment>
        <Row>
          <Col className={isGroup ? 'col' : ''} xs={!isGroup && 6} lg={!isGroup && { size: 4, offset: 2 }}>
            <FormGroup>
              <InputFloat
                name="text"
                label={(isJoined || !isGroup) ? 'Amount to be added' : 'Your share'}
                onChange={this.updateAmount}
                value={amount}
                valid={(isAmountValid && !!isAmountValidState) && null}
                error={
                  (!isAmountValid && `The maximum amount should not exceed ${floor(remainingAmount)}`)
                || (!isAmountValidState && 'No amount entered.')
                }
                step={step}
              />
              <FormText color="muted" className={'m-b-5'}>
                <DottedValue onClick={() => {
                  this.setAmountByClick(1)
                }}>
                  <PrimaryText>
                    1
                  </PrimaryText>
                </DottedValue>
                - <DottedValue onClick={() => {
                this.setAmountByClick(maxAmount)
              }}>
                <PrimaryText>
                  {floor(maxAmount)}
                </PrimaryText>
              </DottedValue>
              </FormText>
              <ClickableBidPresets maxAvailbaleAmount={maxAmount} onClick={this.setAmountByClick}/>
            </FormGroup>
          </Col>
          <Col className={isGroup ? 'col' : ''} xs={!isGroup && 6} lg={!isGroup && 4}>
            <FormGroup>
              <div className="d-flex">
                <div className="d-flex align-items-end p-r-10 p-b-10" style={{ marginLeft: '-13px' }}>
                  <img src="/img/icons/ico-arrow-left-blue.png" height="20"/>
                </div>
                <div>
                  <LABEL>Your {(isJoined || !isGroup) ? 'new return' : 'return'}</LABEL>
                  <Lead className="my-2">
                    {`${floor(bidReturnAmount)} (${bidReturnPercentage})%`}
                  </Lead>
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>

        {!isJoined &&
        <FormGroup className="text-center">
          <RenderSwitch name="isAnonymous" anonymousBid={isAnonymous} onChange={this.updateIsAnonymous}/>
          <P className="d-inline-block m-0">Bid anonymously</P>
        </FormGroup>
        }

        <FormGroup className="text-center p-t-30">
          <PrimaryButton
            disabled={!amount || !isAmountValid}
            onClick={this.onSubmit}
            style={{ width: (isGroup && '250px') }}>
            {!isGroup
              ? 'Add to my bid'
              : (isJoined ? 'Add to my share' : 'Submit bid')
            }
          </PrimaryButton>
        </FormGroup>

        <FormGroup row>
          <Col xs="12" md="12">
            <div className="d-flex">
              <div className="p-r-10">
                <img src="/img/icons/ico-attention-white.png" height="20"/>
              </div>
              <Small>
                All bids are final and cannot be undone in line with our <a href="#">bidding policies</a>.<br/>
                If you have any issues bidding please contact <a href="#">support</a>.
              </Small>
            </div>
          </Col>
        </FormGroup>
      </Fragment>
    );
  }

  updateAmount = ({ target: { value } }) => {

    this.setState({
      amount: value || '',
      isAmountValid: value && true
    });
  };

  updateIsAnonymous = (result) => {
    this.setState({ isAnonymous: result });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { amount, isAnonymous } = this.state;

    if (this.props.isGroup) {
      joinOrEditGroupBid(this.props.bid, amount, isAnonymous, this.props.onSuccess);
    } else {
      increaseIndividualBid(this.props.bid, amount, this.props.onSuccess);
    }
  }
}

const BidModal = ({ isOpen, toggle, bid, invoice, users, isReached, currentUser, ledgerBalance }) => {
  const { bidders, names: {groupName} } = bid;
  const isJoined = bid.isJoined();
  const isGroup = bid.isGroup();

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom modal-lg">
      <ModalHeader toggle={toggle}>{isGroup ? `Group bid: ${groupName}` : 'Increase your bid'}</ModalHeader>
      <ModalBody>
        <Form className="form">
          {isGroup && !isReached &&
            <Row>
              {invoice.status === invoiceStatuses.auctionOpen &&
              <Fragment>
                <Col xs="12" lg="7">
                  <div className="d-xs-flex d-sm-flex d-md-flex d-lg-none d-xl-none justify-content-between p-r-30">
                    {renderGoalAndRemain(bid, invoice)}
                  </div>
                  <P>
                    Goal bid is not reached yet.
                    {isJoined ? 'You can increase your share.' : 'You are free to participate by adding your share.'}
                  </P>
                  <RenderForm isJoined={isJoined} isGroup={isGroup} bid={bid} currentUser={currentUser}
                              ledgerBalance={ledgerBalance} invoice={invoice} onSuccess={toggle}/>
                </Col>
                <Col xs="12" lg="5">
                  <div className="d-none d-lg-flex flex-column p-l-30">
                    {renderGoalAndRemain(bid, invoice)}
                  </div>
                  {renderGroupBidders(bid, invoice, bidders, users, currentUser)}
                </Col>
              </Fragment>
              }
            </Row>
          }

          {isGroup && isReached &&
            <Row>
              <Col xs="12" lg="12">
                <P>
                  Goal bid is already below the current auction price.
                </P>
                <div className="d-none d-lg-flex flex-column p-l-30">
                  {renderGoalAndRemain(bid, invoice)}
                </div>
                {renderGroupBidders(bid, invoice, bidders, users, currentUser)}
              </Col>
            </Row>
          }

          {!isGroup &&
            <RenderForm isJoined={isJoined} isGroup={isGroup} ledgerBalance={ledgerBalance}
                        currentUser={currentUser}  bid={bid} invoice={invoice} onSuccess={toggle}/>
          }
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default BidModal;
