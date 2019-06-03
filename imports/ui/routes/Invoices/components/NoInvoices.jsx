import React from 'react';
import { Link } from 'react-router-dom';
import { userRoles } from 'meteor/populous:constants';
import { H1, P } from '../../../components/styled-components/Typography';
import { ButtonLink } from '../../../components/styled-components/Buttons';

const NoInvoices = ({ currentUser, className }) => {
  const isInvestor = currentUser.isInvestor();
  return (
    <div className={className}>
      <H1 className="page-title">
        My invoices
      </H1>
      <div>
        { isInvestor
          ? <P>You have not placed bids or purchased any invoices yet.</P>
          : <P>You have not added any invoices yet. </P>
        }
      </div>
      <div className="propose-wrapper">
        <div>
          <img src={'/img/' + (isInvestor ? 'no-invoices-investor.png' : 'no-invoices-borrower.png')} width="420"/>
        </div>
        <ButtonLink to={(isInvestor ? '/market' : '/add-invoice')}>
          {(isInvestor ? 'buy invoices on the market' : 'add invoice')}
        </ButtonLink>
      </div>
    </div>
  )
};

export default NoInvoices;
