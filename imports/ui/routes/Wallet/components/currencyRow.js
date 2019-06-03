import React, {Fragment} from 'react';
import {UncontrolledTooltip} from 'reactstrap';
import { apiHelpers } from 'meteor/populous:api';

import {floor} from '../../../utils/formatter';

const TableRow = ({currency, currenciesBalance, role, inEscrow = 0}) => {


  let balance = currenciesBalance && currenciesBalance[currency.symbol];

  if (!balance) {
    balance = {
      amount: 0,
      withdrawable: 0,
      inEscrow: 0,
    };
  }

  return (
    <tr>
      <td style={{'textAlign': 'center',}}>
        {currency.title}
      </td>
      <td style={{
        'borderRight': '0',
        'textAlign': role === 'borrower' && 'right',
      }}>
          {floor(balance.amount)}
      </td>

      {role === 'investor' &&
      <Fragment>
        <td style={{'borderRight': '0'}}>
            {floor(balance.withdrawable)}
        </td>
        <td style={{'borderRight': '0'}}>
            {floor(balance.inEscrow)}
        </td>
      </Fragment>
      }

    </tr>
  );
}

export default TableRow;
