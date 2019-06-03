import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import { invoiceStatuses } from 'meteor/populous:constants';

import { H2, Small } from '../../../../components/styled-components/Typography/index';
import BidItem from './BidItem';

const BidList = ({ currentUser, invoice, bids, crowdsale, users, borrower, ledgerBalance, acceptOffer}) => {
  let isJointGroup = false;
  bids.forEach((bid) => {
    if (bid.names.isGroup && bid.bidders[0].userId !== currentUser._id) {
      isJointGroup = true;
    }
  });

  const isOwner = invoice.isOwner(currentUser);

  return (
    <Fragment>
      <Row>
        <Col xs="12" className="text-center m-t-40">
          <H2>Bids</H2>
          { currentUser.isInvestor() && !isOwner && !isJointGroup && invoice.status === invoiceStatuses.auctionOpen &&
            <Small>You can join one of the groups that have not reached the goal yet.</Small>
          }
          {
            isOwner && invoice.status === invoiceStatuses.auctionOpen && !!bids.length &&
            <Small>End auction early by accepting a winning offer</Small>
          }
          {
            isOwner && invoice.status !== invoiceStatuses.auctionOpen && invoice.status !== invoiceStatuses.repaymentPending &&
            <Small>No one has reached your price, but you still can accept the best offer</Small>
          }
        </Col>
      </Row>
      <Row className="m-t-20 m-b-20">
        <Col xs="12" xl={{size: 10, offset: 1}}>
          { bids.map((bid, index) =>
            <BidItem
              isHighestOffer={!index}
              currentUser={currentUser}
              invoice={invoice}
              bid={bid}
              crowdsale={crowdsale}
              key={bid._id}
              users={users}
              borrower={borrower}
              ledgerBalance={ledgerBalance}
              acceptOffer={acceptOffer}
            />
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default BidList;
