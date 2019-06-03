import React, {Fragment} from 'react';
import moment from 'moment';
import {Col, Row, CardBody, UncontrolledTooltip} from 'reactstrap';
import {crowdsaleStatuses, invoiceStatuses, invoiceDocumentTypes} from 'meteor/populous:constants';

import { StatusCard } from '../../../components/styled-components/Invoices/Invoice';
import {Small, P, Lead, LinkText} from '../../../components/styled-components/Typography/index';
import PdfPreview from '../../../components/styled-components/Invoices/PdfPreview';
import PdfReview from '../../../components/PdfReview/index';
import {floor} from '../../../utils/formatter';

const initialState = {
  pdfReviewModal: false,
  invoiceRepayModal: false,
  activeIndex: 0,
  isLegalDocumentVisible: false,
};


class Invoice extends React.Component {
  state = {...initialState};

  togglePdfReviewModal = () => {
    this.setState({
      pdfReviewModal: !this.state.pdfReviewModal
    });
  }

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

  renderInvoiceDetailView(invoice) {
    const {currencies, documents = {}} = this.props;
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
                  <PdfPreview file={(invoiceDocument && invoiceDocument.link()) || '/empty-invoice.pdf'}
                              type={(invoiceDocument && invoiceDocument.extension) || null}
                              className="pdf-preview" toggle={this.togglePdfReviewModal}/>
                  {this.state.pdfReviewModal && invoiceDocument
                  && <PdfReview file={invoiceDocument.link()} close={this.togglePdfReviewModal}/>}
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
              <div className="m-b-20">
                <Small className="m-b-10" id="baseTooltip" inline>Provider</Small>
                <UncontrolledTooltip className={'tooltip-custom'} placement="top-start" target="baseTooltip">
                  Company that lists on and sell invoices on behalf of Invoice Seller
                </UncontrolledTooltip>
                <Lead className="m-b-5">{invoice.provider ? invoice.provider : borrower.fullName()}</Lead>
              </div>
              <div>
                <Small className="m-b-10">Invoice Seller</Small>
                <Lead
                  className="m-b-5">{borrower.companyName && borrower.companyName != "" ? borrower.companyName : borrower.fullName()}</Lead>
                <div className="d-flex m-b-30">
                  <img src={this.zScoreIcon(invoice.zscore)} height={20} className="m-r-10"/>
                  <LinkText className="m-r-20">Z-score {floor(invoice.zscore)}</LinkText>
                  <LinkText>Detailed company view</LinkText>
                </div>
              </div>

              <div>
                <Small className="m-b-10">Debtor</Small>
                <Lead className="m-b-5">{invoice.debtor.name}</Lead>
                <div className="d-flex m-b-20">
                  <img src={this.zScoreIcon(invoice.debtor.latestZScore)} height={20} className="m-r-10"/>
                  <LinkText className="m-r-20">Z-score {floor(invoice.debtor.latestZScore)}</LinkText>
                  <LinkText>Detailed company view</LinkText>
                </div>
              </div>

              <div>
                <Small className="m-b-10">Invoice Buyer</Small>
                <Lead className="m-b-5">Investing Solutions, LLC</Lead>
              </div>

              <Small className="m-b-10 m-t-30">Uploaded {moment(invoice.createdAt).format('DD-MM-YYYY, H:mm a')}</Small>
              <P className="m-b-5" slate>
                <img src="/img/icons/ico-blue-eye.png" height={13} className="m-r-10"/>
                Invoice auction address
              </P>
            </Col>
          </Row>
        </Col>

        <Col xs="12" xl="3">
          <StatusCard>
            <CardBody>
              <P slate>This invoice was sold outside of the Populous platform</P>
            </CardBody>
          </StatusCard>
        </Col>
      </Row>
    );
  }

  render() {
    const {invoiceDocument: invoice} = this.props;

    return (
      this.renderInvoiceDetailView(invoice)
    );
  }
}

export default Invoice;
