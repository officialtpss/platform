import React, {Fragment} from 'react';
import {Row, Col, Label, FormGroup} from 'reactstrap';
import InputRange from 'react-input-range';
import {invoiceStatuses} from 'meteor/populous:constants';
import styled from 'styled-components';

import {Switch} from '../../../components/styled-components/Invoices/Invoice';
import {buyerInvoiceStatues, sellerInvoiceStatuses, providerInvoiceStatuses} from '../modules/constants';
import {UnderLineDiv} from '../../../components/styled-components/Divs';
import {InputInvisible} from '../../../components/styled-components/Inputs';
import {LABEL, P} from '../../../components/styled-components/Typography';
import DateRangePickerWrapper from '../../../components/DatePicker/DateRangePickerWrapper';
import {CustomCheckbox} from '../../../components/styled-components/Forms/CustomCheckbox';
import {PrimaryButton} from '../../../components/styled-components/Buttons';
import CurrencyFilter from "../../../form-helpers/currencyFilter";

const CURRENCY_FILTER_REF = 'CURRENCY_FILTER_REF';

const SelectDueDateIn = styled.span`
   cursor: pointer;    
   border-bottom: 2px solid ${props => props.theme.colors.paleGrey};
`;
const RangeDueDateIn = styled.div`
  display: block;
  margin-top: 5px;
  padding: 20px;
  width: 100%;
  background-color: #fff;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.08), 0 1px 20px rgba(67,68,69,0.15);
  }
`;

const initialState = {
  overdue: false,
  dueDateIn: false,
  isSliderVisible: false,
  dueMonth: 1
};

class InvoicesFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    }
  }

  componentDidMount() {
    document.addEventListener('click', ()=>this.toggleSliderVisibility());
  }

  componentWillUnmount() {
    document.removeEventListener('click', ()=>this.toggleSliderVisibility());
  }


  searchInvoice = (isAll) => {
    const {currencies, toggleFilters, onSearch, filters, onUpdateFilters, minSalePriceInvoice, maxSalePriceInvoice,
      currentUser
    } = this.props;
    if (isAll) {
      this[CURRENCY_FILTER_REF].resetToInital();
      this.setState(initialState);
      let _filters = {
        currencies: currencies.map(c => c.symbol),
        salePrice: {min: minSalePriceInvoice, max: maxSalePriceInvoice},
        dueDate: {startDate: null, endDate: null},
        salePriceLimit: filters.salePriceLimit,
        statuses: {
          awaitingContract: true,
          auctionOpen: true,
          repaymentPaid: true,
          auctionClosed: true,
          repaymentPending: true,
          auctionRejected: true,
          auctionPending: true,
          auctionFailed: true,
          externalTrade: currentUser.isProvider() ? true : false,
        },
      };
      onUpdateFilters(_filters);
      onSearch(_filters);
    } else {
      onSearch(filters);
    }
    toggleFilters();
  };

  renderCurrency = () => {
    const {currencies} = this.props;
    return (
      <FormGroup>
        <LABEL for="currency">Currency</LABEL>
        <div className="m-b-10">
          <CurrencyFilter currencies={currencies}
                          onChange={this.onCurrencyChange}
                          displayBaseCurrency={false}
                          innerRef={component => this[CURRENCY_FILTER_REF] = component}/>
        </div>
      </FormGroup>
    )
  };

  onCurrencyChange = selectedValues => {
    const {onUpdateFilters} = this.props;
    onUpdateFilters({
      currencies: selectedValues
    });
  };

  renderSalePriceRange = () => {
    const {filters} = this.props;
    const maxValue = filters.salePrice.max > filters.salePriceLimit.max ? filters.salePrice.max : filters.salePriceLimit.max;
    const minValue = filters.salePrice.min < filters.salePriceLimit.min ? filters.salePrice.min : filters.salePriceLimit.min;

    return (
      <FormGroup>
        <LABEL>Sale Price Range</LABEL>
        <UnderLineDiv className="d-flex justify-content-between align-items-center underline-block m-b-10">
          <InputInvisible value={filters.salePrice.min} className="width-40" disabled/>
          <span style={{
            display: 'block',
            minHeight: '2px',
            minWidth: '12px',
            background: '#A5ACB5',
          }}/>
          <InputInvisible value={filters.salePrice.max} className="text-right width-40" disabled/>
        </UnderLineDiv>
        <InputRange
          draggableTrack
          maxValue={maxValue}
          minValue={minValue}
          formatLabel={value => parseInt(value)}
          value={filters.salePrice.max === -1 ? {min: 0, max: 1} : filters.salePrice}
          onChange={this.salePriceChange}
        />
      </FormGroup>);
  };

  salePriceChange = (value) => {
    const {onUpdateFilters} = this.props;
    onUpdateFilters({
      salePrice: value
    });
  };

  renderDueDates = () => {
    const {overdue, dueDateIn, dueMonth, isSliderVisible} = this.state;
    const {filters} = this.props;
    return (
      <Fragment>
        <FormGroup>
          <LABEL>Due Dates</LABEL>
          <UnderLineDiv>
            <DateRangePickerWrapper
              startDate={filters.dueDate.startDate}
              endDate={filters.dueDate.endDate}
              inner={{noBorder: true, isOutsideRange: () => false}}
              onChange={(dates) => this.dueDatesChange(dates)}
              disabled={overdue || dueDateIn}
            />
          </UnderLineDiv>
        </FormGroup>
        <div className="text-center m-t-20">
          <LABEL style={{background: '#f5f7fa', padding: 5}}>OR</LABEL>
        </div>
        <FormGroup>
          <Switch
            checked={overdue}
            onChange={(e) => this.dueDatesChange(e ? 'overdue' : null)}
            onColor="#E1E5EB"
            offColor="#fff"
            onHandleColor="#5CA0F6"
            offHandleColor="#A5ACB5"
            handleDiameter={18}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 1px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
            height={10}
            width={35}
            className="switch-checkbox m-r-10"
            disabled={dueDateIn}
          />
          <P className="d-inline-block m-0">Overdue invoices</P>
        </FormGroup>
        <FormGroup>
          <Switch
            checked={dueDateIn}
            onChange={(e) => this.dueDatesChange(e ? dueMonth : null, true)}
            onColor="#E1E5EB"
            offColor="#fff"
            onHandleColor="#5CA0F6"
            offHandleColor="#A5ACB5"
            handleDiameter={18}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 1px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
            height={10}
            width={35}
            className="switch-checkbox m-r-10"
            disabled={overdue}
          />

          <P className="d-inline m-0" onClick={({nativeEvent}) => nativeEvent.stopImmediatePropagation()}>
             Due date in <SelectDueDateIn onClick={()=>this.toggleSliderVisibility(!isSliderVisible)}>{dueMonth} month</SelectDueDateIn>
          </P>
          {isSliderVisible &&
          <RangeDueDateIn onClick={({nativeEvent}) => nativeEvent.stopImmediatePropagation()}>
            <InputRange
              maxValue={12}
              minValue={1}
              value={dueMonth}
              onChange={(value)=>this.dueDatesChange(value)}
            />
          </RangeDueDateIn>
          }
        </FormGroup>
      </Fragment>
    )
  };

  dueDatesChange = (value, param=null) => {
    const {onUpdateFilters} = this.props;
    if(value === 'overdue') {
      this.setState({
        overdue: !this.state.overdue,
      });
    } else if (typeof value === 'number') {
      this.setState({
        dueDateIn: param ? !this.state.dueDateIn : true,
        dueMonth: value
      });
    }

    if (value) {
      onUpdateFilters({
        dueDate: value
      });
    } else {
      onUpdateFilters({
        dueDate: {endDate: null, startDate: null}
      });
      this.setState({
        dueDateIn: false,
        overdue: false,
      });
    }
  };

  toggleSliderVisibility = (bool=false) => {
    this.setState({
      isSliderVisible: bool
    });
  };

  getInvoicesStatuses = () => {
    const {currentUser} = this.props;
    if (currentUser.isProvider()) {
      return providerInvoiceStatuses;
    } else if (currentUser.isInvestor()) {
      return buyerInvoiceStatues;
    } else {
      return sellerInvoiceStatuses;
    }
  };

  renderInvoiceStatuses = () => {
    const {filters} = this.props;
    const statuses = this.getInvoicesStatuses();

    return (
      <div className='m-t-20'>
        <Label>Invoice Status</Label>
        <Row className='m-r-40'>
          { Object.keys(statuses).map((status) =>
            <Col md="4" sm="6" xs="12" key={status}>
              <CustomCheckbox label={statuses[status]} name={status}
                              onChange={(event) => this.onStatusChange(event, status)}
                              value={status}
                              checked={filters.statuses[status]}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  };

  onStatusChange = (event, status) => {
    const {filters, onUpdateFilters} = this.props;
    let statuses = {...filters.statuses};
    statuses[status] = !statuses[status];
    onUpdateFilters({statuses});
  };


  render() {
    const {filters} = this.props;

    return (
      <div className="m-b-20">
        <div className="m-b-20">Please set your search preferences so we can find suitable invoices for you.</div>
        <Row>
          <Col sm="12" md="7">
            <Row>
              <Col md="4" sm="6" xs="12">
                { this.renderCurrency() }
              </Col>
              <Col md="8" sm="6" xs="12">
                { this.renderSalePriceRange() }
              </Col>
              <Col xs="12">
                { this.renderInvoiceStatuses() }
              </Col>
            </Row>
          </Col>
          <Col sm="12" md="3">
            <div className='p-l-40'>
              { this.renderDueDates() }
            </div>
          </Col>
        </Row>
        <Row className="m-t-30">
          <Col>
            <PrimaryButton onClick={ () => {
              this.searchInvoice(false);
            } }>Find Invoices</PrimaryButton>
            <PrimaryButton outline className="m-l-20" onClick={ () => {
              this.searchInvoice(true, filters);
            } }>Show All Invoices</PrimaryButton>
          </Col>
        </Row>
      </div>
    );
  }
}


export default InvoicesFilters;
