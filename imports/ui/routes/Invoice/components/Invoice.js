import React, {Fragment} from 'react';
import {crowdsaleStatuses, invoiceStatuses, invoiceDocumentTypes,} from 'meteor/populous:constants';
import classnames from "classnames";
import {Container, Col, Row,} from 'reactstrap';

import Spinner from '../../../components/Spinner/index';
import ExternalInvoice from './ExternalInvoice';
import InvoiceEditFormContainer from '../containers/InvoiceEditFormContainer';
import ViewInvoiceContainer from "../containers/ViewInvoiceContainer";
import {Status} from '../../../components/styled-components/Invoices/InvoiceCard';
import {H1,} from '../../../components/styled-components/Typography/index';
import InvoiceFunds from "../../Market/components/InvoiceFunds";


class Invoice extends React.Component{
  componentDidMount(){
    this.tryToSetCurrentInvoice();
  }

  componentDidUpdate(){
    this.tryToSetCurrentInvoice();
  }

  tryToSetCurrentInvoice(){
    if(this.props.invoiceDocument && (!this.props.currentInvoice || this.props.invoiceDocument.status !== this.props.currentInvoice.status)){
      this.props.setCurrentInvoice(this.props.invoiceDocument);
    }
  }

  render(){
    const {
      invoiceDocument: invoice, loading, noInvoiceFound,
      currentUser,
      documents,
      debtors,
      borrower,
    } = this.props;

    if (loading) {
      return <Spinner/>;
    }

    if (!invoice) {
      noInvoiceFound();
      return null;
    }

    if (!borrower) {
      return <Spinner/>;
    }

    const editMode = currentUser._id === invoice.borrowerId
      && ((invoice.status === invoiceStatuses.awaitingContract) || (invoice.status === invoiceStatuses.auctionRejected));

    let content;
    if (invoice.status === invoiceStatuses.externalTrade) {
      content = <ExternalInvoice {...this.props} />;
    } else if (editMode) {
        content = <InvoiceEditFormContainer invoiceDocument={invoice} debtors={debtors} documents={documents}/>
    } else {
      content = null
    }

    return (
      content !== null
        ? <Container>
          <Row className="page-title">
            <Col xs="12" className={classnames({'has-card': currentUser.isInvestor()})}>
              <H1 className="d-block d-md-inline-block m-r-20">
                <img src="/img/icons/ico-arrow-back.svg" className="m-r-10 cursor-pointer"
                     onClick={() => this.props.history.goBack()}/>
                Invoice #{invoice.invoiceNumber}
              </H1>
              <Status status={invoice.status} className="invoice-status">{invoice.status.replace('_', ' ')}</Status>
            </Col>
            {currentUser.isInvestor() &&
            <InvoiceFunds />
            }
          </Row>
          {content}
        </Container>
        : <ViewInvoiceContainer {...this.props} />
    )

  };
}

export default Invoice;
