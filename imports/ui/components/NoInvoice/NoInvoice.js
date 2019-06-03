import React from 'react';
import { P } from '../styled-components/Typography';

const NoInvoice = () => {
  return (
    <div className='text-center'>
      <P>There is no invoice that match your search preferences…</P>
      <div className='m-t-30'>
        <img src='/img/img-no-result-invoices.png' />
      </div>
    </div>
  )
};

export default NoInvoice;
