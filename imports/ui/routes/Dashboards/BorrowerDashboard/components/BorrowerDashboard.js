import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import CashFlowWidget from './CashFlowWidget';
import SummaryWidget from './SummaryWidget';
import FundsWidget from './FundsWidget';
import PaymentsWidget from './PaymentsWidget';
import { H1, Small } from '../../../../components/styled-components/Typography';
import { StyledInput } from '../../../../components/styled-components/Inputs';
import '../../../../libs/styles/dashboard.css';

const BorrowerDashboard =
  ({statistic, currencies, balances, isEmpty, selectCurrency, selectedCurrency, isEmptyInvoicesList,
    ledgerLogs, setCashFlowRange, cashFlowDateRange, setDueDays, dueDays, invoicesList, invoicesFundedCount,
    invoicesUploadedCount
  }) => {

  const fundType = 'Pokens';
  const getCurrenciesOption = (currencies) => {
    if (currencies && currencies.length) {
      return currencies.map((el, i) => {
        return <option key={i} value={el.symbol}  selected={el.selected}>{el.title}</option>
      })
    } else {
      return (
        <option key='currency' value='' disabled={true} >No currency</option>
      )
    }
  };

  if ( currencies.length > 0 && selectedCurrency === null ) {
    selectedCurrency = currencies[0];
  }else if (!currencies.length){
    selectedCurrency = {
      title: 'GBP',
    }
  }

  let amountFinanced = 0;
  ledgerLogs.map((log) => {
    amountFinanced += log.convertedAmount;
  });
  const currencyChange = (event) => {
    const index = event.nativeEvent.target.selectedIndex;
    const title = event.nativeEvent.target[index].text;
    const symbol = event.nativeEvent.target.value;
    selectCurrency({title: title, symbol: symbol});
  };
  return (
    <div className="gradient-bg">
      <Container>
        <Row>
          <Col xs={12} className="page-title">
            <div className="d-flex justify-content-between align-items-center">
              <H1>
                Dashboard
              </H1>
              <div>
                <Small>WALLET</Small>
                <StyledInput type="select" onChange={currencyChange} value={(selectedCurrency || {}).symbol || ''} >
                  {getCurrenciesOption(currencies)}
                </StyledInput>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={{size: 12, order: 2}} lg={{size: 8, order: 1}} className="m-b-40">
            <PaymentsWidget isEmpty={isEmpty} isEmptyInvoicesList={isEmptyInvoicesList}
                            dueDays={dueDays} setDueDays={setDueDays}
                            selectedCurrency={selectedCurrency}
                            invoicesList={invoicesList}
                            {...statistic.paymentDues}
            />
          </Col>
          <Col xs={{size: 12, order: 1}} lg={{size: 4, order: 2}} className="m-b-40">
            <SummaryWidget data={statistic.summary} isEmpty={isEmpty} invoicesUploadedCount={invoicesUploadedCount}
                           invoicesFundedCount={invoicesFundedCount}
            />
          </Col>
        </Row>
        <Row>
          <Col className="m-b-50">
            <CashFlowWidget cashFlowData={statistic.cashFlowData} isEmpty={isEmpty}
                            setCashFlowRange={setCashFlowRange} cashFlowDateRange={cashFlowDateRange}
                            selectedCurrency={selectedCurrency} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BorrowerDashboard;
