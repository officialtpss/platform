import React, { Fragment } from 'react';
import moment from 'moment';
import { Col, Row, CardBody, UncontrolledTooltip } from 'reactstrap';
import { invoiceStatuses, crowdsaleStatuses, repaymentBankDepositDetails } from 'meteor/populous:constants';
import printSlipRepaymentBankDetails from '../../../../components/printSlipRepaymentBankDetails/index';
import { apiHelpers } from 'meteor/populous:api';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { StatusCard } from '../../../../components/styled-components/Invoices/Invoice';
import { LabelText, DangerText, P } from '../../../../components/styled-components/Typography/index';
import ConfirmationModal from '../../../Wallet/components/WalletModals/ConfirmationModal';
import { floor } from '../../../../utils/formatter';

const initialState = {
  timeToAuctionEnds: ''
};


class InvoiceStatus extends React.Component {
  state = {...initialState};

  componentDidUpdate(prevProps) {
    if (this.props.invoice.status !== prevProps.invoice.status) {
      this.startTimer();
    }
  }

  componentWillMount() {
    if (this.props.crowdsale) {
      this.getAuctionEnds(this.props.crowdsale.closeAt);
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    if (this.props.crowdsale && this.props.invoice.status === invoiceStatuses.auctionOpen) {
      this.intervalId = setInterval(() => {
        this.getAuctionEnds(this.props.crowdsale.closeAt);
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getAuctionEnds = (date) => {
    if (this.props.invoice.status !== invoiceStatuses.auctionOpen) {
      clearInterval(this.intervalId);
      return;
    }

    const toDate = moment(date).valueOf();
    const nowDate = moment().valueOf();
    const tempTime = moment.duration(toDate - nowDate);

    if (Math.sign(tempTime) === -1) {
      return 0;
    }

    let hours = tempTime.hours();
    let minutes = tempTime.minutes() < 10 ? '0' + tempTime.minutes() : tempTime.minutes();
    let seconds = tempTime.seconds() < 10 ? '0' + tempTime.seconds() : tempTime.seconds();

    this.setState({
      timeToAuctionEnds: `${hours} ${hours > 0 ? 'hours' : 'hour'} ${minutes} min ${seconds} sec`
    });

    if (!tempTime.hours() && !tempTime.minutes() && !tempTime.seconds()) {
      this.props.crowdsale.callMethod('closeCrowdsale');
    }
  };

  render() {
    const {
      invoice,
      invoiceCurrency,
      currentUser,
      crowdsale,
      invoiceRepayModal,
      toggleInvoiceRepayModal,
      bids,
      borrower,
      restartAuction,
      closeAuction,
      withdrawInvoice,
    } = this.props;

    let highestBid = 0;
    if (bids && bids.length > 0) {
      highestBid = Math.max(...bids.map((bid) => {
        return bid.sortAmount;
      }));
    } else {
      highestBid = invoice.salePrice;
    }

    const returnAskingPerc = !invoice.amount ? 0 : apiHelpers.roundNumber((invoice.amount - invoice.salePrice) / invoice.amount * 100);
    const returnAskingVal =  !invoice.amount ? 0 : floor(invoice.amount - invoice.salePrice);
    const returnOnInvestmentPerc = !invoice.amount ? 0 : apiHelpers.roundNumber((invoice.amount - highestBid) / invoice.amount * 100);
    const returnOnInvestmentVal = !invoice.amount ? 0 : floor(invoice.amount - highestBid);

    const investorInvoiceStatus = () => {
      const dueDuration = moment().diff(moment(invoice.dueDate));

      return (
        <Row>
          <Col xs="12" md="6" xl="12">
            <StatusCard>
              <CardBody>
                { invoice.status !== invoiceStatuses.auctionPending &&
                <Fragment>
                  <P className="m-b-5" slate>{bids.length ? 'Current best bid' : 'Target best bid'}</P>
                  <LabelText>{invoiceCurrency} {floor(highestBid)}</LabelText>
                </Fragment>
                }

                <P className="m-b-5" slate>Discount</P>
                <LabelText id='discountValue'>{returnOnInvestmentPerc}% ({invoiceCurrency} {returnOnInvestmentVal})</LabelText>
                <UncontrolledTooltip placement="bottom" target={'discountValue'} >
                  What the seller is willing to offer, before fees.
                </UncontrolledTooltip>

                <P className="m-b-5" slate>Amount paid</P>
                <LabelText>{invoiceCurrency} {floor(invoice.repayedPrice)}</LabelText>

                <P className="m-b-5" slate>Remaining amount to be paid</P>
                <LabelText>{invoiceCurrency} {floor(invoice.amount - invoice.repayedPrice)}</LabelText>

                { invoice.status === invoiceStatuses.auctionClosed &&
                  <P className="m-b-5" slate>
                    The Goal sale price was not reached and the seller will now decide whether to accept the best bid, relist the invoice or terminate the auction
                  </P>
                }

                {(dueDuration > 0 && invoice.status === invoiceStatuses.repaymentPending ) ?
                  <Fragment>
                    <DangerText>(Penalty: {invoiceCurrency} {floor(invoice.penaltyPrice)})</DangerText>
                    <DangerText className="text-uppercase">
                      {moment.duration(dueDuration).humanize()} Overdue
                    </DangerText>
                  </Fragment>
                  :
                  null
                }
              </CardBody>
            </StatusCard>
          </Col>

          <Col xs="12" md="6" xl="12">
            <StatusCard>
              { invoice.status === invoiceStatuses.repaymentPending &&
                <CardBody>
                  <P className="m-0" slate>
                    This invoice is pending repayment from the seller.
                  </P>
                </CardBody>
              }
              { invoice.status === invoiceStatuses.auctionPending &&
                <CardBody>
                  <P className="m-0" slate>
                    This invoice is awaiting review.
                  </P>
                </CardBody>
              }
              { (invoice.status === invoiceStatuses.auctionOpen) && (crowdsale && crowdsale.status === crowdsaleStatuses.open) &&
                <CardBody>
                  <P className="m-b-5" slate>Auction ends in</P>
                  <LabelText>{crowdsale ? this.state.timeToAuctionEnds : ''}</LabelText>
                </CardBody>
              }
            </StatusCard>
          </Col>
        </Row>
      );
    };

    const sellerInvoiceStatus = () => {
      const { currency, soldPrice, repayedPrice, penaltyPrice } = invoice;
      const depositAmount = floor((soldPrice - repayedPrice) + penaltyPrice);
      const dueDuration = moment().diff(moment(invoice.dueDate));

      return (
        <Row>
          <ConfirmationModal
            showConfirmationModal={invoiceRepayModal}
            toggleConfirmationModal={toggleInvoiceRepayModal}
            fullName={borrower.companyName && borrower.compayName !="" ? borrower.companyName : borrower.fullName()}
            companyName={this.props.companyName}
            currency={currency}
            depositAmount={depositAmount}
            currentUser={currentUser}
            printSlip={() => printSlipRepaymentBankDetails({
              userReferenceId: currentUser._id,
              currency,
              depositAmount,
            })}
          />

          <Col xs="12" md="6" xl="12">
            { invoice.status === invoiceStatuses.repaymentPending &&
            <div className="button-wrapper">
              <PrimaryButton onClick={() => toggleInvoiceRepayModal(true)}>Repay</PrimaryButton>
            </div>
            }
            { invoice.status === invoiceStatuses.repaymentPending ?
              <StatusCard>
                <CardBody>
                  <P className="m-b-5" slate>Accepted auction price</P>
                  <LabelText>{invoiceCurrency} {floor(invoice.currentAuctionPrice)}</LabelText>

                  <P className="m-b-5" slate>Discount</P>
                  <LabelText id='discountValue'>{returnOnInvestmentPerc}% ({invoiceCurrency} {returnOnInvestmentVal})</LabelText>
                  <UncontrolledTooltip placement="bottom" target={'discountValue'} >
                    What the seller is willing to offer, before fees.
                  </UncontrolledTooltip>

                  <P className="m-b-5" slate>Total amount to be paid</P>
                  <LabelText>{invoiceCurrency} {depositAmount}</LabelText>
                  { (dueDuration > 0 && invoice.status !== invoiceStatuses.repaymentPaid) ?
                    <Fragment>
                      <DangerText>Penalty: {invoiceCurrency} {floor(invoice.penaltyPrice)}</DangerText>
                      <DangerText className="text-uppercase">
                        {moment.duration(dueDuration).humanize()} Overdue
                      </DangerText>
                    </Fragment>
                    :
                    null
                  }
                </CardBody>
              </StatusCard>
              :
              <StatusCard>
                <CardBody>
                  { invoice.status !== invoiceStatuses.auctionPending &&
                    <Fragment>
                      <P className="m-b-5" slate>Best Goal Bid Price</P>
                      <LabelText>{invoiceCurrency} {floor(highestBid)}</LabelText>
                    </Fragment>
                  }
                  <P className="m-b-5" slate>Rate</P>
                  <LabelText>{returnAskingPerc}% ({invoiceCurrency} {returnAskingVal})</LabelText>

                  { invoice.status === invoiceStatuses.auctionOpen &&
                    <Fragment>
                      <P className="m-b-5" slate>Discount</P>
                      <LabelText id='discountValue'>{returnOnInvestmentPerc}% ({invoiceCurrency} {returnOnInvestmentVal})</LabelText>
                      <UncontrolledTooltip placement="bottom" target={'discountValue'} >
                        What the seller is willing to offer, before fees.
                      </UncontrolledTooltip>
                    </Fragment>
                  }

                </CardBody>
              </StatusCard>
            }
          </Col>

          <Col xs="12" md="6" xl="12">
            <StatusCard>
              { invoice.status === invoiceStatuses.repaymentPaid &&
                <CardBody>
                  <P className="m-0" slate>
                    This invoice has been paid by the Borrower. Please wait for the transaction to be confirmed on the blockchain.
                  </P>
                </CardBody>
              }
              { invoice.status === invoiceStatuses.auctionPending &&
                <CardBody>
                  <P className="m-0" slate>
                    This invoice is awaiting review.
                  </P>
                </CardBody>
              }
              { (invoice.status === invoiceStatuses.auctionOpen) && (crowdsale && crowdsale.status === crowdsaleStatuses.open) &&
                <CardBody>
                  <P className="m-b-5" slate>Auction ends in</P>
                  <LabelText>{crowdsale ? this.state.timeToAuctionEnds : ''}</LabelText>
                </CardBody>
              }
            </StatusCard>
            <div className="button-wrapper">
              {invoice.status === invoiceStatuses.auctionPending &&
              <PrimaryButton outline onClick={() => withdrawInvoice(invoice)}>
                withdraw invoice
              </PrimaryButton>
              }
              {invoice.status === invoiceStatuses.auctionOpen &&
              <PrimaryButton outline onClick={() => closeAuction(invoice)}>
                Cancel Auction
              </PrimaryButton>
              }
              {(invoice.status === invoiceStatuses.auctionClosed || invoice.status === invoiceStatuses.repaymentPaid) &&
              <Fragment>
                <PrimaryButton className="m-b-15" onClick={() => restartAuction(invoice)}>
                  Restart Auction
                </PrimaryButton>
                <PrimaryButton outline onClick={() => closeAuction(invoice)}>
                  Terminate Auction
                </PrimaryButton>
              </Fragment>
              }
              {invoice.status === invoiceStatuses.auctionFailed &&
              <PrimaryButton onClick={() => restartAuction(invoice)}>
                Restart Auction
              </PrimaryButton>
              }
            </div>
          </Col>
        </Row>
      );
    };

    return (
      <Fragment>
        { (invoice.isOwner(currentUser))
          ? sellerInvoiceStatus()
          : investorInvoiceStatus()
        }
      </Fragment>
    );
  }
}

export default InvoiceStatus;
