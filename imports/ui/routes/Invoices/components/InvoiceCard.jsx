import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Row, Col} from 'reactstrap';
import {ExchangeRate, Invoice} from 'meteor/populous:api';
import {invoiceStatuses, withdrawStatuses} from 'meteor/populous:constants';
import {LinkedCard, StyledLink} from '../../../components/styled-components/LinkedCard';
import {
  ListViewCardInfo,
  CardRightCorner,
  MainText,
  ListViewStatus,
  SubText,
  TableHead,
  ListViewStatusSmall,
  ListViewWithdrawStatusSmall
} from '../../../components/styled-components/Invoices/InvoiceCard';
import {LinkButton, FundButton} from '../../../components/styled-components/Buttons';
import {Small} from '../../../components/styled-components/Typography';
import {floor} from '../../../utils/formatter';

class InvoiceCard extends React.Component {
  componentWillUpdate(nextProps) {
    const {invoice: {_id, currency}, activeColumns, previewMode, baseCurrency, previewExhanceForInvoice} = this.props;
    if (previewMode !== nextProps.previewMode && activeColumns.currency && !!baseCurrency && baseCurrency !== currency) {
      previewExhanceForInvoice(_id);
    }
  }

  fundButtonClick = (event) => {
    event.preventDefault();
    const { invoice } = this.props
    invoice.callMethod('updateWidthdrawStatus', withdrawStatuses.pending)
  }

  render() {
    const {
      invoice: {
        _id, borrowerCompanyName, amount, salePrice, invoiceNumber, currency, dueDate, createdAt, status,
        debtor, preview, bids, crowdsale, bidPlaced, returnPercentage, soldPrice, withdrawStatus
      }, previewMode, currencies, baseCurrency, currentUser, page
    } = this.props;


    const getCurrencyExchange = (amount) => {
      // should i multiply buy amount of currency???
      const rate = ExchangeRate.findOne({from: currency, to: baseCurrency});
      if (rate) {
        return floor(rate.ask * amount);
      }
      return floor(amount);
    };

    const calcDueDays = (date) => {
      const days = Math.round(moment(date).diff(moment(), 'days', true));
      let result = ['Due'];
      if (days == 0) {
        result.push('today');
      }
      if (days > 0) {
        result.push('in');
      }
      if (days == 1 || days == -1) {
        result.push('a', 'day');
      } else if (days != 0) {
        result.push(Math.abs(days), 'days');
      }
      if (days < 0) {
        result.push('ago');
      }
      return result.join(' ');
    };

    const calcEndTime = (date) => {
      const timeLeft = (moment(date).diff(moment(), 'hours', true)),
        hours = parseInt("10", timeLeft),
        minutes = Math.round(60 * (timeLeft % 1));

      let result = 'End in';

      if (hours > 0) {
        result += ` ${hours}h`
      }
      if (minutes > 0) {
        result += ` ${minutes} m`
      }
      return result;
    };

    const invoiceCurrency = currencies.find((cur) => cur.symbol === currency);
    const currencyTitle = invoiceCurrency ? invoiceCurrency.title : currency;
    const baseInvoiceCurrency = currencies.find((cur) => cur.symbol === baseCurrency);
    const baseCurrencyTitle = baseInvoiceCurrency ? baseInvoiceCurrency.title : baseCurrency;
    const isInvestor = currentUser && currentUser.isInvestor();

    const isExpired = moment(dueDate).diff(moment()) < 0 &&
      status !== invoiceStatuses.repaymentPaid &&
      status !== invoiceStatuses.repaymentLate &&
      status !== invoiceStatuses.auctionRejected;

    const isWinningBidDetails = page === 'invoices' &&
      (status === invoiceStatuses.repaymentPending || status === invoiceStatuses.repaymentPaid || status === invoiceStatuses.repaymentLate);
    const currentSalePrice = isWinningBidDetails ? soldPrice : salePrice;

    return (
      <StyledLink to={'/invoice/' + _id} key={_id}>
        <LinkedCard className='p-t-20 p-b-20'>
          <Row>
            <Col xs={12} md={12} lg={5}>
              <Row noGutters className={'justify-content-between'}>
                {this.props.activeColumns.borrowerCompanyName &&
                <Col className="col-auto">
                  <MainText withMargin>
                    {isInvestor ? borrowerCompanyName : invoiceNumber}
                  </MainText>
                </Col>
                }
                <CardRightCorner tablet>
                  <LinkButton md className="p-0">View</LinkButton>
                </CardRightCorner>

                <CardRightCorner mobile>
                  <ListViewStatus mobile status={status}>{status}</ListViewStatus>
                </CardRightCorner>

                {this.props.activeColumns.seller &&
                <Col xs={12} sm={12} md={12} lg={'auto'}>
                  <MainText>{debtor.name}</MainText>
                </Col>
                }
              </Row>

              <ListViewCardInfo>
                <ListViewStatusSmall status={status}>{status}</ListViewStatusSmall>

                {!isInvestor && status === invoiceStatuses.auctionClosed && bids && bids.length > 0 &&
                <Small className="label-select-winner">Select the winner</Small>}

                {crowdsale && status === invoiceStatuses.auctionOpen &&
                <SubText className="letter-spacing" mobile="true" withMargin>{calcEndTime(crowdsale.closeAt)}</SubText>}

                {this.props.activeColumns.creationDate &&
                <SubText className="letter-spacing">Uploaded {moment(createdAt).format('DD-MM-YYYY')}</SubText>}

                {bidPlaced && <small className="label-your-bid m-l-10">Bid placed</small>}
              </ListViewCardInfo>
            </Col>

            <Col xs={12} md={12} lg={7}>
              <Row>
                {this.props.activeColumns.currency &&
                <Col xs="6" sm={2} md={1} className="mobile-hide no-wrap">
                  <TableHead style={{minHeight: "21px"}}>{!previewMode && 'Currency'}</TableHead>
                  {!previewMode && <MainText className="m-t-5">{currencyTitle}</MainText>}
                  {!!previewMode && !!baseCurrency && baseCurrency !== currency &&
                  <MainText onClick={(ev) => {
                    ev.preventDefault();
                    this.props.previewExhanceForInvoice(_id);
                  }} className="text-right currency-txt">{preview ? currencyTitle : baseCurrencyTitle}</MainText>
                  }
                </Col>
                }

                {this.props.activeColumns.amount &&
                <Col xs="6" sm={6} md={3}>
                  <TableHead>Amount {!!previewMode && (preview ? `, ${baseCurrencyTitle}` : `, ${currencyTitle}`)}</TableHead>
                  <MainText
                    className="text-right mobile-left-align p-t-5 no-wrap">{!!previewMode && preview ? `≈ ${getCurrencyExchange(amount)}` : floor(amount)}</MainText>
                </Col>
                }

                {this.props.activeColumns.salePrice &&
                <Col xs="6" md="3" className="p-md-0">
                  <TableHead mobileRight>Sale
                    Price {!!previewMode && (preview ? `, ${baseCurrencyTitle}` : `, ${currencyTitle}`)}</TableHead>
                  <MainText
                    className="text-right no-wrap p-t-5">{!!previewMode && preview ? `≈ ${getCurrencyExchange(currentSalePrice)}` : floor(currentSalePrice)}</MainText>
                </Col>
                }

                {this.props.activeColumns.returnPercent &&
                <Col xs="6" md="2">
                  <TableHead>Discount</TableHead>
                  <MainText className="text-right mobile-left-align p-t-5">
                    {returnPercentage ? `${returnPercentage}%` : <Small className="p-t-5">Pending</Small>}
                  </MainText>
                </Col>
                }

                {this.props.activeColumns.dueDate &&
                <Col xs="6" md="3">
                  <TableHead mobileRight isExpired={isExpired}>
                    {isExpired && <img src="/img/icons/ico-attention.svg" height={24} className="m-r-10 m-b-5"/>}
                    <span>Due date</span>
                  </TableHead>
                  <MainText className="text-right p-t-5"
                            isExpired={isExpired}>{moment(dueDate).format('DD-MM-YYYY')}</MainText>
                </Col>
                }

                <Col xs="12" className="mobile-show text-center grey-border-top">
                  <LinkButton className="m-0">View</LinkButton>
                </Col>
              </Row>
              {(!isInvestor && status === invoiceStatuses.repaymentPending) &&
              <Row>
                <Col xs="12" className="text-right">
                  {!withdrawStatus &&
                    <FundButton onClick={this.fundButtonClick} >TRANSFER FUNDS</FundButton>
                  }
                  {withdrawStatus === withdrawStatuses.pending &&
                    <ListViewWithdrawStatusSmall status={status}>WITHDRAW PENDING</ListViewWithdrawStatusSmall>
                  }
                </Col>
               </Row>
               }
            </Col>
          </Row>
        </LinkedCard>
      </StyledLink>
    );
  }
}

InvoiceCard.propTypes = {
  invoice: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    borrowerFullName: PropTypes.string.isRequired,
    borrowerCompanyName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    invoiceNumber: PropTypes.string.isRequired,
    debtor: PropTypes.object.isRequired,
    dueDate: PropTypes.object.isRequired,
    createdAt: PropTypes.object.isRequired,
    salePrice: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default InvoiceCard;
