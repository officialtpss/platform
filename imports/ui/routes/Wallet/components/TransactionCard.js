import React from 'react';
import {Row, Col, UncontrolledTooltip} from 'reactstrap';
import moment from 'moment';
import {ledgerActionsTypes,} from 'meteor/populous:constants';

import {P, Lead, Small, LinkText} from '../../../components/styled-components/Typography';
import {TransactionCardWrapper} from '../../../components/styled-components/Wallets';
import {floor, scientificToDecimal} from '../../../utils/formatter';

const TransactionCard = ({transaction, wallet}) => {
  let sign = '+', imgPath, imgWidth, imgHeight, descriptionClasses, title;

  switch (transaction.type) {
    case ledgerActionsTypes.exchange:
      imgPath = '/img/icons/currency-exchange-trans.png';
      title = 'Currency exchange';
      imgWidth = 28;
      imgHeight = 28;
      descriptionClasses = ['m-l-30'];
      break;
    case ledgerActionsTypes.deposit:
      imgPath = '/img/icons/ico-deposit.png';
      title = `${transaction.fromCurrency} exchange`;
      imgWidth = 40;
      imgHeight = 30;
      descriptionClasses = ['m-l-15'];
      break;
    case ledgerActionsTypes.crowdsale:
      imgPath = '/img/icons/invoice-trans.png';
      title = 'Release from escrow';
      imgWidth = 40;
      imgHeight = 50;
      descriptionClasses = ['m-l-15'];
      break;
    case ledgerActionsTypes.depositReturn:
      imgPath = '/img/icons/refund-trans.png';
      title = `${transaction.toCurrency} refund`;
      imgWidth = 35;
      imgHeight = 20;
      descriptionClasses = ['m-l-20'];
      break;
    case ledgerActionsTypes.withdrawPPT:
      imgPath = '/img/icons/refund-trans.png';
      title = 'PPT withdraw' + (transaction.isPending ? ' (pending)' : '');
      imgWidth = 35;
      imgHeight = 20;
      descriptionClasses = ['m-l-20'];
      sign='-';
      break;
    case ledgerActionsTypes.transfer:
    case ledgerActionsTypes.repayment:
      imgPath = '/img/icons/penalties-trans.png';
      title = <React.Fragment>Repayment. Invoice <LinkText inline>#{transaction.dataId}</LinkText></React.Fragment>;
      imgWidth = 20;
      imgHeight = 30;
      descriptionClasses = ['m-l-20'];
      break;
    case ledgerActionsTypes.mint:
    case ledgerActionsTypes.destroy:
      return null;
    default:
      return null;
  }

  if (wallet && transaction.toCurrency !== wallet) {
    sign = '-';
  }

  const toDecimal = (value) => {
    let decimal = floor(value);

    if (value > 0 && parseFloat(decimal) === 0) {
      decimal = scientificToDecimal(value.toPrecision(2));
    }

    return decimal;
  };

  return (
    <TransactionCardWrapper>
      <Row>
        <Col xs={7} sm={8} md={6}>
          <div className="d-flex align-items-center">
            <img src={imgPath} width={imgWidth} height={imgHeight}/>
            <div className={descriptionClasses.join(' ')}>
              <P className="m-b-5">{title}</P>
              <Small>{moment(transaction.createdAt).format('DD-MM-YYYY, hh:mm a')}</Small>
            </div>
          </div>
        </Col>
        <Col xs={5} sm={4} md={2} className="text-right">
          <Lead className="m-t-10">{floor(transaction.fromValue)} {transaction.fromCurrency}</Lead>
        </Col>
        <Col xs={4} md={2} className="d-none d-md-flex justify-content-end">
          <Lead className="m-t-10">
            <span id={`transaction${transaction._id}`}>
              {`${sign} ${toDecimal(transaction.toValue)} ${transaction.toCurrency}`}
            </span>
          </Lead>
          {!!transaction.conversionRate && <UncontrolledTooltip placement="left" target={`transaction${transaction._id}`}>
            {transaction.conversionRate}
          </UncontrolledTooltip>}
        </Col>
        <Col xs={4} md={2} className="d-none d-md-flex justify-content-end">
          <Lead className="m-t-10">{floor(transaction.toNewBalance)} {transaction.toCurrency}</Lead>
        </Col>
        {transaction.type === 'exchange' && <Col xs={12}>
          <div className="info">
            <Small>ID {transaction._id}</Small>
          </div>
        </Col>}
      </Row>
    </TransactionCardWrapper>
  );
}

export default TransactionCard;
