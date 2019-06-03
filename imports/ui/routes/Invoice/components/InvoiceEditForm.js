import React from 'react';
import {Container, Col} from 'reactstrap';
import {statuses, invoiceDocumentTypes, invoiceStatuses} from 'meteor/populous:constants';

import UnverifiedBanner from '../../../components/UnverifiedBanner';
import InvoiceProviderForm from "../../../components/ProviderInvoiceForms/InvoiceForm";
import InvoiceDebtorForm from "../../../components/DebtorInvoiceForms/InvoiceForm";


class InvoiceEditForm extends React.Component {
  render() {
    const {currentUser, history, debtors, invoiceForm, documents, ...props} = this.props;
    const {invoiceDocument: invoice} = props;

    if (currentUser.KYCStatus !== statuses.verified) {
      return <UnverifiedBanner status={currentUser.KYCStatus} history={history}/>;
    }

    const FormInvoice = currentUser.isProvider() ? InvoiceProviderForm : InvoiceDebtorForm;

    return (
      <Container>
        {
          (invoiceStatuses.auctionRejected === invoice.status && typeof invoice.invoiceDeclinedReason === 'object') &&
          <Col className="d-flex">
            <div>
              <img src="/img/icons/ico-info-2.svg" alt="Info" className="m-r-10 m-t-10"/>
            </div>
            <div>
              <div className="m-t-10 m-b-20">
                Invoice {invoice.invoiceNumber} has been rejected because of insufficient details
              </div>
              <div>
                {invoice.invoiceDeclinedReason.comment &&
                  <div className="m-t-10">{reason.comment}</div>
                }
              </div>
            </div>
          </Col>
        }
        <FormInvoice
          currentUser={currentUser}
          debtors={debtors}
          {...invoiceForm}
          {...props}
          isMarketForm={invoice.status !== invoiceStatuses.externalTrade}
          invoiceContract={documents[invoiceDocumentTypes.invoice]}
        />
      </Container>
    );
  }
}

export default InvoiceEditForm;
