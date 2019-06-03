import React, {Fragment} from 'react';
import moment from 'moment';
import {Container, Col, Row, UncontrolledTooltip} from 'reactstrap';
import classnames from 'classnames';
import {toastr} from 'react-redux-toastr';
import {File,} from 'meteor/populous:api';
import {crowdsaleStatuses, invoiceStatuses, invoiceDocumentTypes, userRoles} from 'meteor/populous:constants';

import Spinner from '../../../components/Spinner/index';
import {Status} from '../../../components/styled-components/Invoices/InvoiceCard';
import {H1, Small, Lead, LinkText} from '../../../components/styled-components/Typography/index';
import InvoiceStatus from './ViewInvoice/InvoiceStatus';
import BidList from './ViewInvoice/BidList';
import BidForms from './ViewInvoice/BidForms';
import {floor} from '../../../utils/formatter';
import InvoiceFunds from "../../Market/components/InvoiceFunds";
import SubscribeToBorrowerInvoices from "../../../components/subscribe/SubscribeToBorrowerInvoices";
import UploadContract from "../../../components/InvoiceContracts/UploadContract";
import BalanceMismatchModal from "../../Wallet/components/WalletModals/BalanceMismatchModal";

const initialState = {
  pdfReviewModal: false,
  invoiceRepayModal: false,
  isLegalDocumentVisible: false,
  showBalanceMismatchModal: false,
};


class ViewInvoice extends React.Component {
  state = {...initialState};

  componentDidMount() {
    const {currentUser, balanceError, getBalanceError, invoiceDocument: invoice} = this.props;

    if (currentUser.role === userRoles.investor && invoice.status === invoiceStatuses.auctionOpen) {
      getBalanceError();
      this.setState({
        showBalanceMismatchModal: balanceError ? true : false
      })
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.balanceError !== this.props.balanceError) {
      this.setState({
        showBalanceMismatchModal: nextProps.balanceError ? true : false
      })
    }
  }

  toggleInvoiceRepayModal = () => {
    this.setState({
      invoiceRepayModal: !this.state.invoiceRepayModal
    });
  };

  checkCrowdsale = (crowdsale, invoice) => {
    const currentDate = moment().utc();
    if (invoice.status === invoiceStatuses.auctionOpen && currentDate.isAfter(crowdsale.closeAt)) {
      crowdsale.callMethod('closeCrowdsale', () => {
        // this.props.reset();
      });
    }
  };

  togglePdfReviewModal = () => {
    this.setState({
      pdfReviewModal: !this.state.pdfReviewModal
    });
  };

  zScoreIcon(value) {
    if (value >= 2.6) {
      return '/img/icons/ico-green-hand-up.png';
    }
    else if (value >= 1.1) {
      return '/img/icons/ico-grey-eye-glasses.png';
    }
    else {
      return '/img/icons/ico-red-warning.png';
    }
  }

  getCompanyURL(companyNumber) {
    return `${Meteor.settings.public.BI_POPULOUS_URL}/dashboard/${companyNumber}?subtab=balancesheet`
  }

  updateInvoiceDocument = (acceptedFiles) => {
    if (acceptedFiles.length) {

      const {invoiceDocument, setCurrentInvoice} = this.props;
      const upload = File.insert(
        {
          file: acceptedFiles.shift(),
          streams: 'dynamic',
          chunkSize: 'dynamic'
        },
        false
      );

      upload.on('end', function (error, fileObj) {
        if (error) {
          return toastr.error('Error', error);
        }

        invoiceDocument.callMethod('uploadContract', {
          [invoiceDocumentTypes.invoice]: fileObj._id,
        }, (error, newInvoice) => {
          if (error) {
            return toastr.error('Error', error.reason);
          }

          setCurrentInvoice(newInvoice);
        });

      });
      upload.start();
    }
  };

  renderInvoiceDetailView(invoice) {
    const {
      currencies, currentUser, withdrawInvoice, crowdsale, bids, restartAuction, closeAuction, documents = {},
    } = this.props;
    const {pdfReviewModal}= this.state;
    const borrower = invoice.borrower();
    let invoiceCurrency = currencies.find((cur) => cur.symbol === invoice.currency);
    const currencyTitle = invoiceCurrency ? invoiceCurrency.title : invoice.currency;

    const invoiceDocument = documents[invoiceDocumentTypes.invoice];

    return (
      <Row className="m-b-20">
        <Col xs="12" xl="9">
          <Row>
            <Col xs="12" md="7">
              <Row>
                <Col xs="7">
                  <UploadContract
                    viewStyles
                    className="pdf-preview"
                    oldFile={invoiceDocument}
                    upload={this.updateInvoiceDocument}
                    allowReplace
                    fileType={invoiceDocumentTypes.invoice}
                    togglePdfReviewModal={this.togglePdfReviewModal}
                    pdfReviewModal={{[invoiceDocumentTypes.invoice]: pdfReviewModal}}
                    disabled={invoice.status !==  invoiceStatuses.auctionPending || !invoice.isOwner(currentUser)}
                  />

                </Col>
                <Col xs="5">
                  <Small className="m-b-10">Invoice amount</Small>
                  <Lead>{currencyTitle} {floor(invoice.originalAmount())}</Lead>

                  <Small className="m-b-10">Advanced amount</Small>
                  <Lead>{currencyTitle} {floor(invoice.amount)}</Lead>

                  <Small className="m-b-10">Goal sale price</Small>
                  <Lead>{currencyTitle} {floor(invoice.salePrice)}</Lead>

                  <Small className="m-b-10">Due date</Small>
                  <Lead>{moment(invoice.dueDate).format('DD-MM-YYYY')}</Lead>
                </Col>
              </Row>
            </Col>

            <Col xs="12" md="5" className="m-b-20">
              {invoice.provider &&
              <div className="m-b-20">
                <Small className="m-b-10" id="baseTooltip" inline>Provider</Small>
                <UncontrolledTooltip className={'tooltip-custom'} placement="top-start" target="baseTooltip">
                  Company that lists on and sell invoices on behalf of Invoice Seller
                </UncontrolledTooltip>
                <Lead className="m-b-5">{invoice.provider}</Lead>
              </div>
              }

              <div>
                <Small className="m-b-10">Invoice Seller</Small>
                <Lead
                  className="m-b-5">
                  {borrower.companyName && borrower.companyName !== "" ? borrower.companyName : borrower.fullName()}
                  </Lead>
                <div className="m-b-30">
                  <div className="d-flex">
                    <img src={this.zScoreIcon(invoice.zscore)} height={20} className="m-r-10"/>
                    <LinkText className="m-r-20">Z-score {floor(invoice.zscore)}</LinkText>
                    <LinkText>< a href={this.getCompanyURL(borrower.companyNumber)} target="_blank">Detailed company view</a></LinkText>
                  </div>
                  {currentUser.isInvestor() && !invoice.isOwner(currentUser) && <div className={'m-t-10'}>
                    <SubscribeToBorrowerInvoices borrowerId={invoice.borrowerId}/>
                  </div>}
                </div>
              </div>

              <div>
                <Small className="m-b-10">Debtor</Small>
                <Lead className="m-b-5">{invoice.debtor.name}</Lead>
                <div className="d-flex m-b-20">
                  <img src={this.zScoreIcon(invoice.debtor.latestZScore)} height={20} className="m-r-10"/>
                  <LinkText className="m-r-20">Z-score {floor(invoice.debtor.latestZScore)}</LinkText>
                  <LinkText>< a href={this.getCompanyURL(invoice.debtor.companyNumber)} target="_blank">Detailed company view</a></LinkText>
                </div>
              </div>

              <Small className="m-b-15">Uploaded {moment(invoice.createdAt).format('DD-MM-YYYY, H:mm a')}</Small>

              {invoice.status === invoiceStatuses.auctionClosed &&
              <Small className="m-b-15">Closed {moment(crowdsale.closeAt).format('DD-MM-YYYY, H:mm a')}</Small>
              }
            </Col>
          </Row>
        </Col>

        <Col xs="12" xl="3">
          <InvoiceStatus {...{invoice, invoiceCurrency:currencyTitle, bids, currentUser, crowdsale,
            invoiceRepayModal: this.state.invoiceRepayModal, toggleInvoiceRepayModal: this.toggleInvoiceRepayModal,
            borrower,  companyName: borrower.companyName, restartAuction, closeAuction, withdrawInvoice}} />
        </Col>
      </Row>
    );
  }

  render() {
    const {
      currentUser,
      invoiceDocument: invoice,
      crowdsale,
      loading,
      bids,
      usersObject,
      alreadyBidded,
      balances,
      borrower,
      bidFormBlocked,
      acceptOffer
    } = this.props;

    const {showBalanceMismatchModal} = this.state;
    if (loading) {
      return <Spinner />;
    }

    const isOwner = invoice.isOwner(currentUser);

    if (crowdsale) {
      this.checkCrowdsale(crowdsale, invoice);
    }

    const ledgerBalance = balances.find(({currency}) => currency === invoice.currency) || 0;

    return (
      <Fragment>
        <Container>
          <Row className="page-title">
            <Col xs="12" className={classnames({'has-card': currentUser.isInvestor()})}>
              <H1 className="d-block d-md-inline-block m-r-20">
                <img src="/img/icons/ico-arrow-back.svg" className="m-r-10 cursor-pointer"
                     onClick={() => this.props.history.goBack()}/>
                Invoice #{ invoice.invoiceNumber }
              </H1>
              <Status status={invoice.status} className="invoice-status">{invoice.status.replace('_', ' ')}</Status>
            </Col>
            { currentUser.isInvestor() &&
            <InvoiceFunds />
            }
          </Row>
          {this.renderInvoiceDetailView(invoice)}
          {showBalanceMismatchModal &&
            <BalanceMismatchModal {...{showBalanceMismatchModal, referenceNumber: currentUser._id}} />
          }
        </Container>
        <div className="static-bg">
          <Container>
            { (!isOwner && currentUser.isInvestor() && !alreadyBidded)
            && crowdsale && crowdsale.status === crowdsaleStatuses.open &&
            invoice.status === invoiceStatuses.auctionOpen &&
            <Row>
              <Col>
                <BidForms {...{currentUser, invoice, blocked:bidFormBlocked, crowdsale, ledgerBalance}} />
              </Col>
            </Row>
            }
            { invoice.status !== invoiceStatuses.auctionPending &&
            <BidList {...{currentUser, invoice, bids, crowdsale, users:usersObject, borrower, ledgerBalance, acceptOffer}} />
            }
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default ViewInvoice;
