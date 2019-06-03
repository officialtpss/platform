import React, { Fragment } from 'react';
import { CardBody, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import { crowdsaleStatuses, invoiceStatuses } from 'meteor/populous:constants';

import BidModal from './BidModal';
import InfoBidGroupModal from './InfoBidGroupModal';
import { BidCard } from '../../../../components/styled-components/Invoices/Invoice';
import { SuccessButton, LinkButton } from '../../../../components/styled-components/Buttons';
import { Lead, Small } from '../../../../components/styled-components/Typography/index';
import { trimStringLength } from '../../../../utils/trimStringLength';
import '../../../../libs/styles/invoice.css';

const initialState = {
  bidModal: false
};


class BidItem extends React.Component {
  state = {...initialState};

  toggleModal = () => {
    this.setState({
      bidModal: !this.state.bidModal,
    });
  };

  acceptOffer(crowdsale, bid) {
    if (crowdsale && bid) {
      this.props.acceptOffer(crowdsale, bid);
    }
  }

  render() {
    const { currentUser, bid, users, invoice, isHighestOffer, crowdsale, borrower, ledgerBalance, } = this.props,
      isInvestor = currentUser.isInvestor(),
      isOwner = invoice.isOwner(currentUser),
      { names: { isGroup, groupName }, amount, createdAt } = bid,
      className = `bid-card ${isHighestOffer && 'success'} ${isInvestor && 'investor'} ${!isGroup && 'individual'}`,
      initiator = users[bid.userId],
      isJoined = bid.isJoined();

    const bidName = isGroup ? groupName || 'Anonymous' : (initiator && (bid.isAnonymous ? 'Anonymous' : initiator.getBidName()));

    let createdAtMoment = bid.createdAt;
    if (isGroup) {
      bid.bidders.map((bidder) => {
        createdAtMoment = createdAtMoment > bidder.updatedAt ? createdAtMoment : bidder.updatedAt;
      });
    }
    createdAtMoment = moment(createdAtMoment);
    const timeForDisplay = bid.formatDate(createdAtMoment);
    const isWinning = bid.isWinner;
    const isReached = (isGroup && bid.sortAmount === amount);

    return (
      <BidCard className={className}>
        <CardBody>
          {isHighestOffer &&
          <div className="bid-card-label">{isWinning ? 'Winning bid' : 'Highest offer'}</div>
          }
          <div className="bid-card-body">
            <div className="icon">
              <img src={isGroup ? '/img/icons/ico-users.png' : '/img/icons/ico-user.png'} height="30"/>
            </div>
            <div className="name">
              <Lead className="m-b-10">{trimStringLength(bidName, 30)}</Lead>
              <div className="d-flex d-lg-flex align-items-center">
                <Small className="m-r-10">{timeForDisplay}</Small>
                {isInvestor && !isGroup && (currentUser._id === bid.userId) &&
                <Small className="label-your-bid">Your bid</Small>
                }
                {(isInvestor && isJoined && isGroup) &&
                <Small>You joined this group</Small>
                }
              </div>
            </div>
            <div className="mobile-divider"/>
            {isGroup &&
            <div className="goal-bid">
              <Small className="mb-2">Goal bid</Small>
              <Lead>{amount}</Lead>
            </div>
            }
            <div className="current-bid">
              <Small className="mb-2">{isGroup ? 'Raised bid' : 'Bid'}</Small>
              <Lead>{isGroup ? bid.getRaisedBidAmount() : amount}</Lead>
            </div>
            <div className="return">
              <Small className="mb-2">
                <span id="return">{isInvestor ? 'Return' : 'Rate'}</span>
              </Small>
              <UncontrolledTooltip placement="top-end" target={'return'} >
                Return On Investment (ROI)
              </UncontrolledTooltip>
              <Lead>{bid.getReturnParams(invoice, bid.amount).returnPercentage} %</Lead>
            </div>

            {isGroup && invoice.status !== invoiceStatuses.auctionRejected &&
            invoice.status !== invoiceStatuses.auctionPending && invoice.status !== invoiceStatuses.auctionFailed &&
            <div className="current-return">
              <Small className="mb-2">{isInvestor ? 'Current Return' : 'Current Rate'}</Small>
              <Lead>{bid.getReturnParams(invoice, bid.sortAmount).returnPercentage} %</Lead>
            </div>
            }
            {isInvestor && !isOwner
              ?
              <Fragment>
                {(isGroup || isJoined) && invoice.status === invoiceStatuses.auctionOpen &&
                  <div className="actions">
                    <LinkButton md onClick={this.toggleModal}>
                      {(isGroup && !isJoined) ? 'Join' : 'View'}
                    </LinkButton>
                  </div>
                }

                {isGroup && invoice.status !== invoiceStatuses.auctionOpen &&
                  <div className="actions">
                    <LinkButton md onClick={this.toggleModal}>View</LinkButton>
                  </div>
                }
              </Fragment>
              :
              (isHighestOffer && crowdsale && crowdsale.status === crowdsaleStatuses.open ?
                <div className="actions">
                  <SuccessButton className="m-l-30" md onClick={() => this.acceptOffer(crowdsale, bid)}>Accept Offer</SuccessButton>
                  {isGroup && <LinkButton className="p-l-10 p-r-10" md onClick={this.toggleModal}>View</LinkButton>}
                </div>
                :
                <Fragment>
                  {isGroup && <div className="actions">
                    <LinkButton className="p-l-10 p-r-10" md onClick={this.toggleModal}>View</LinkButton></div>}
                </Fragment>
              )
            }
          </div>
        </CardBody>

        {isInvestor && !isOwner && invoice.status === invoiceStatuses.auctionOpen &&
        <BidModal isOpen={this.state.bidModal} toggle={this.toggleModal}
                  isReached={isReached} bid={bid} invoice={invoice} users={users} currentUser={currentUser}
                  ledgerBalance={ledgerBalance}/>
        }

        {(!isInvestor || isOwner || invoice.status !== invoiceStatuses.auctionOpen) &&
        <InfoBidGroupModal isOpen={this.state.bidModal} toggle={this.toggleModal} isInvestor={isInvestor}
                           bid={bid} invoice={invoice} users={users} currentUser={currentUser}/>
        }
      </BidCard>
    );
  }
}

export default BidItem;
