import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { CurrencyDesc } from '../../../components/styled-components/Invoices/Invoice';
import { Small } from '../../../components/styled-components/Typography';


class InvoiceFunds extends React.Component {
  render() {
    return (
      <div>
        <CurrencyDesc mobile="true">
          <Small className="text-right">Find out more about buying invoices.</Small>
          <Small className="text-right">Read our <Link to={'#'}>investors guide</Link></Small>
        </CurrencyDesc>
      </div>
    );
  }
}

export default InvoiceFunds;
