import React from 'react';
import { invoiceStatuses } from 'meteor/populous:constants';
import { Row, Col, Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';

import { Small, P, NaviText } from '../../../../components/styled-components/Typography/index';
import { floor } from '../../../../utils/formatter';

const renderGroupBidders = (bid, invoice, bidders = [], users, currentUser, isInvestor) => {
  if (!bidders.length) {
    return;
  }

  const currency = invoice.getCurrency();
  const renderGoalAndRemain = (bid) => {
    return (
      <div className="d-none d-lg-flex flex-column p-l-30">
        <div className="d-flex align-items-center">
          <div className="m-r-10">
            <img src="/img/icons/ico-arrow-board.png" height="30"/>
          </div>
          <div>
            <Small className="m-b-10">Goal bid</Small>
            <NaviText className="m-0">{currency.title} {floor(bid.amount)}</NaviText>
          </div>
        </div>
        <div className="d-flex align-items-center m-t-20">
          <div className="m-r-10">
            <img src="/img/icons/ico-checking.png" height="30"/>
          </div>
          <div>
            <Small className="m-b-10">Remaining amount</Small>
            <NaviText className="m-0">{currency.title} {floor(bid.getRemainingAmount())}</NaviText>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Row>
      <Col xs="12" lg="12">

        {renderGoalAndRemain(bid)}

        <div className="m-t-30">
          <Col className="d-flex justify-content-between m-b-5">
            <Small>Participants</Small>
            <Small>Amount, {currency.title}</Small>
          </Col>
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
                  <Small inline className="m-r-10" style={{ fontSize: '12px' }}>{bid.formatDate(moment(bidder.createdAt))}</Small>
                  {isInvestor && (currentUser._id === bidder.userId) &&
                  <Small inline className="label-your-bid">Your bid</Small>
                  }
                </div>
              </ListGroupItem>
            )}
            <ListGroupItem className="text-right" color="secondary" style={{backgroundColor: '#f9fbfd'}}>
              <P className="m-0" style={{ fontWeight: '700' }}>
                Amount raised: {currency.title} {bid.getRaisedBidAmount()}
              </P>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Col>
    </Row>
  );
};

const InfoBidGroupModal = ({ isOpen, toggle, bid, invoice, users, currentUser, isInvestor }) => {
  const { bidders, names: {groupName} } = bid;

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom modal-lg" style={{maxWidth: 500}}>
      <ModalHeader toggle={toggle}>Group bid: {groupName}</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="12">
            {renderGroupBidders(bid, invoice, bidders, users, currentUser, isInvestor)}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default InfoBidGroupModal;
