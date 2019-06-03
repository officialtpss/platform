import React, {Fragment} from 'react';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { Table } from 'reactstrap';
import { DepositLog } from 'meteor/populous:api';
import { Link } from 'react-router-dom';
import {
  depositLogTypes
} from 'meteor/populous:constants';

import { LinkText } from '../../../../components/styled-components/Typography';
import { floor } from '../../../../utils/formatter';

const Collateral = ({
  depositLedgerLogs = [],
  currencies = [],
  wallet,
}) => {

  const currencySymbolToTitle = {};

  currencies.forEach(currency => {
    currencySymbolToTitle[currency.symbol] = currency.title;
  });

  const renderRow = (depositLedgerLog) => {

    const { _id, fromValue, fromCurrency, toCurrency, toValue, createdAt, isPending } = depositLedgerLog;

    const returnCallback = () => {
      const relatedDepositLog = DepositLog.findOne(depositLedgerLog.dataId);

      if (!relatedDepositLog) {
        return;
      }

      relatedDepositLog.callMethod('returnDeposit', (error) => {
        if (error) {
          toastr.error(error.reason);
        } else {
          if (wallet && wallet.address) {
            if (relatedDepositLog.type === depositLogTypes.USDC) {
              wallet.callMethod('calculateAvailableBalanceUSDC');
            } else {
              wallet.callMethod('calculateAvailableBalance');
            }
          }
          toastr.success(`Pokens successfully returned and ${relatedDepositLog.type || 'PPT'} released from escrow.`);
        }
      });
    };

    return (
      <tr key={_id}>
        <td className="text-left">
          <div>{fromCurrency} exchanged</div>
          <div>{floor(fromValue)}</div>
        </td>
        <td className="text-left">
          <div>Pokens issued</div>
          <div>{currencySymbolToTitle[toCurrency]} {floor(toValue)}</div>
        </td>
        <td className="text-center">
          <div>Issued</div>
          <div>{isPending ? 'Pending' : moment(createdAt).format('DD-MM-YYYY')}</div>
        </td>
        <td>
          <div className="p-t-10">
            <LinkText className="text-center text-uppercase"
                      onClick={returnCallback}><b>Return</b></LinkText>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <Fragment>
        {
          depositLedgerLogs.length
          ?
          <Table responsive className="custom border-table" style={{ overflow: 'hidden' }}>
            <tbody>
              {depositLedgerLogs.map(renderRow)}
            </tbody>
          </Table>
          :
          <div className="p-t-20 p-b-20 text-center">
            You do not have any PPT/USDC in escrow
          </div>
        }
        {/*<div className="p-b-20">*/}
          {/*Amounts in red indicate 0.1% have been added for each day payment is overdue.*/}
        {/*</div>*/}
      <div className="m-t-10">
        <Link to={'#'}>
          Terms of use PPT inside the platform
        </Link>
      </div>
    </Fragment>
  );
};

export default Collateral;
