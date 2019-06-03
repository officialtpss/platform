import React from 'react';
import {Container,} from 'reactstrap';
import {statuses, invoiceDocumentTypes} from 'meteor/populous:constants';

import UnverifiedBanner from '../../../components/UnverifiedBanner';
import InvoiceDebtorForm from "../../../components/DebtorInvoiceForms/InvoiceForm";
import {userRoles} from 'meteor/populous:constants';
import { H1, P } from '../../../components/styled-components/Typography';

const InvoiceForm = (inputProps) => {
    const {currentUser, history, debtors,invoiceForm, documents, ...props} = inputProps;

    if (currentUser.KYCStatus !== statuses.verified) {
      return <UnverifiedBanner status={currentUser.KYCStatus} history={history}/>;
    }

    const disabledAddInvoice = (currentUser.role === userRoles.borrower) && !currentUser.createInvoice;

    if (disabledAddInvoice) {
      return (
        <Container>
          <div>
            <H1 className="page-title">
              Add Invoice
            </H1>
            <div className="propose-wrapper">
              <div>
                <img src={'/img/no-invoices-borrower.png'} width="420"/>
              </div>
              <P style={{color: '#29405E'}}><q>ADD INVOICE</q> has not yet been enabled.<br /> Please contact to support!</P>
            </div>
          </div>
        </Container>
      )
    }

    return (
      <Container>
        <InvoiceDebtorForm
          currentUser={currentUser}
          debtors={debtors}
          {...invoiceForm}
          {...props}
          invoiceContract={documents ? documents[invoiceDocumentTypes.invoice] : null}
          />
      </Container>
    );
  };

export default InvoiceForm;
