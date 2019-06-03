import React from 'react';
import {Row, Col} from 'reactstrap';
import {ledgerActionsTypes} from 'meteor/populous:constants';

import {StyledInput} from '../../../components/styled-components/Inputs';
import {Small} from '../../../components/styled-components/Typography';
import DateRangePickerWrapper from '../../../components/DatePicker/DateRangePickerWrapper';
import {UnderLineDiv} from '../../../components/styled-components/Divs';

class TransactionFilterForm extends React.Component {

  getCurrenciesOption(currencies) {
    const {selectedWallet} = this.props.filters;
    let options = [];

    options.push(
      <option defaultValue={!selectedWallet} key='All' value="">All</option>
    );

    if (currencies && currencies.length) {
      options = options.concat(currencies.map((el, i) => {
        return <option defaultValue={el.symbol === selectedWallet} key={i} value={el.symbol}>{el.title}</option>
      }));
    }

    return options;
  }

  componentWillMount() {
    const {resetFilters} = this.props;
    if (resetFilters && typeof resetFilters === 'function') {
      resetFilters();
    }
  }

  updatePeriod = (period) => {
    const {onUpdateFilters} = this.props;
    if ((!period.startDate && !period.endDate) || period.startDate || period.endDate) {
      onUpdateFilters(period);
    }
  };

  updateWallet = (wallet) => {
    const {onUpdateFilters} = this.props;
    onUpdateFilters({
      selectedWallet: wallet
    });
  };

  updateTransactionType = (type) => {
    const {onUpdateFilters} = this.props;
    onUpdateFilters({
      transactionType: type !== 'all' ? type : null
    });
  };

  updateSearch = (search) => {
    const {onUpdateFilters} = this.props;
    onUpdateFilters({search});
  };

  render() {
    const amount = this.props.historyAmount;
    return (
      <Row>
        <Col md={'4'} sm="6" xs={'12'} className="m-b-10">
          <div className="d-flex align-items-center">
            <Small className="d-inline-block">Period</Small>
            <UnderLineDiv>
              <DateRangePickerWrapper
                inner={{
                  noBorder: true,
                  isOutsideRange: () => false,
                  openDirection: amount >= 0 && amount <= 3 ? 'up' : 'down'
                }}
                onChange={(dates) => this.updatePeriod(dates)}
              />
            </UnderLineDiv>
          </div>
        </Col>
        <Col md={'2'} sm="6" xs={'12'} className="m-b-10">
          <div className="d-flex align-items-center">
            <Small className="d-inline-block">Wallet</Small>
            <StyledInput type="select" onChange={(event) => this.updateWallet(event.target.value)}>
              {this.getCurrenciesOption(this.props.currencies)}
            </StyledInput>
          </div>
        </Col>
        <Col md={'3'} sm="6" xs={'12'} className="m-b-10">
          <div className="d-flex align-items-center">
            <Small className="d-inline-block">Transactions</Small>
            <StyledInput type="select" onChange={(event) => this.updateTransactionType(event.target.value)}>
              <option value="all">All</option>
              <option value={ledgerActionsTypes.exchange}>Exchange</option>
              <option value={ledgerActionsTypes.repayment}>Repayment</option>
            </StyledInput>
          </div>
        </Col>
        <Col md={'3'} sm="6" xs={'12'} className="m-b-10">
          <div style={{position: 'relative'}}>
            <StyledInput placeholder="Search..."
                         onChange={(event) => {
                           const data = event.nativeEvent.target.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                           this.updateSearch(data)
                         }}
            />
            <img style={{position: 'absolute', right: 0, bottom: 4, background: '#fff'}} src="/img/icons/ico-search.svg"
                 height="28"/>
          </div>
        </Col>
      </Row>
    );
  }
}

export default TransactionFilterForm;