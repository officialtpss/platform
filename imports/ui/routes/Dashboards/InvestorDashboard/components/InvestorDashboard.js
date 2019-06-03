import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import styled from 'styled-components';

import InvoiceReceivables from './InvoiceReceivables';
import InvestmentsByIndustries from './InvestmentsByIndustries';
import SummaryWidget from './SummaryWidget';
import FundsWidget from './FundsWidget';
import { H1, Small } from '../../../../components/styled-components/Typography';
import { StyledInput} from '../../../../components/styled-components/Inputs';

class InvestorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.walletChangeHandler = this.walletChangeHandler.bind(this);
  }

  componentDidMount() {
    const { currencies } = this.props;

    if (currencies.length) {
      this.props.setCurrentWallet({ title: currencies[0].title, symbol: currencies[0].symbol });
    }
  }
  walletChangeHandler(event) {
    const index = event.nativeEvent.target.selectedIndex;
    const title = event.nativeEvent.target[index].text;
    const symbol = event.nativeEvent.target.value;

    this.props.setCurrentWallet({title: title, symbol: symbol});
  }
  render() {
    const {statistic, currencies, isEmpty, className, setDatesRange, ...props} = this.props;

    const getCurrenciesOption = (currencies) => {
      if (currencies && currencies.length) {
        return currencies.map((el, i) => {
          return <option key={i} value={el.symbol} selected={el.selected} >{el.title}</option>
        });
      } else {
        return (
          <option key='currency' value='' disabled={true} >No currency</option>
        );
      }
    };

    return (
      <div className="gradient-bg p-b-30">
        <Container className={className}>
          <Row>
            <Col xs={12} className="page-title">
              <div className="d-flex justify-content-between align-items-center">
                <H1>
                  Dashboard
                </H1>
                <div>
                  <Small>WALLET</Small>
                  <StyledInput type="select" onChange={(e)=>{ this.walletChangeHandler(e); }}>
                    {getCurrenciesOption(currencies)}
                  </StyledInput>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{size: 12, order: 2}} lg={{size: 7, order: 1}} className="m-b-30">
              <InvoiceReceivables {...statistic.payments} isEmpty={isEmpty}
                                  currentWallet={this.props.currentWallet} setDatesRange={setDatesRange}/>
            </Col>
            <Col xs={{size: 12, order: 1}} lg={{size: 5, order: 2}} className="m-b-30">
              <SummaryWidget data={statistic.summary} isEmpty={isEmpty} {...props}/>
            </Col>
          </Row>
          <Row className={'m-t-10'}>
            <Col xs={{size: 12, order: 2}} lg={{size: 5, order: 1}}>
              <InvestmentsByIndustries isEmpty={isEmpty} {...props}/>
            </Col>
            <Col xs={{size: 12, order: 1}} lg={{size: 7, order: 2}}>
              <FundsWidget isEmpty={isEmpty} walletFunds={currencies} {...props}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default styled(InvestorDashboard)`
  @media (min-width: 768px){
    > .row.first-row {
      flex-direction: row-reverse;
    }
  }
`;
