import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tooltip } from 'reactstrap';

import { CustomCheckbox } from '../components/styled-components/Forms/CustomCheckbox';
import CustomRadio from "../components/styled-components/Forms/CustomRadio";

const initialState = {
  showDropdown: false,
  currenciesState: {},
  allSelected: true,
  symbolToTitle: {},
  showTooltip: false,
};

function calculateInitialState({defautCheckedCurrency, currencies=[]}) {
  const symbolToTitle = {};
  const currenciesState = {};
  if (currencies && currencies.length) {
    currencies.forEach(currency => {
      symbolToTitle[currency.symbol] = currency.title;
      currenciesState[currency.symbol] = defautCheckedCurrency ? defautCheckedCurrency.indexOf(currency.symbol) !== -1 : true;
    });
  }

  return {
    ...initialState,
    symbolToTitle,
    currenciesState,
    allSelected: !defautCheckedCurrency || defautCheckedCurrency.length === currencies.length || !defautCheckedCurrency.length
  }
}
class currencyFilterComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showDropdown: false });
    }
  }

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  toggleAll = (event) => {
    const { currenciesState } = this.state;
    const { nativeEvent, nativeEvent: { target: { checked } } } = event;
    const newCurrenciesState = {};

    for (let currencySymbol in currenciesState) {
      if (currenciesState.hasOwnProperty(currencySymbol)) {
        newCurrenciesState[currencySymbol] = checked;
      }
    }

    this.setState({
      allSelected: checked,
      currenciesState: newCurrenciesState,
    });
  }

  toggleTooltip = () => {
    this.setState({
      showTooltip: !this.state.showTooltip,
    })
  }

  onChangeSelected = (event) => {
    const { nativeEvent: { target: { checked, name } } } = event;
    const currenciesState = { ...this.state.currenciesState };
    let allSelected = true;

    currenciesState[name] = checked;

    for (let currencySymbol in currenciesState) {
      if (currenciesState.hasOwnProperty(currencySymbol) && !currenciesState[currencySymbol]) {
        allSelected = false;
        break;
      }
    }

    this.setState({ currenciesState, allSelected });

  }

  onBaseCurrencyChange = ({nativeEvent:{target:{value, checked}}})=>{
    const {onBaseCurrencyChange} = this.props;
    if(onBaseCurrencyChange && checked){
      onBaseCurrencyChange(value);
    }
  }

  onBaseCurrencyClick = ({nativeEvent:{target:{value}}})=>{
    const {baseCurrency, onBaseCurrencyChange} = this.props;
    if(baseCurrency === value && onBaseCurrencyChange){
      onBaseCurrencyChange(null);
    }
  }

  getSelectedCurrencies(currenciesState) {
    if (!currenciesState) {
      currenciesState = this.state.currenciesState
    }

    const selectedCurrencies = [];

    for (let currencySymbol in currenciesState) {
      if (currenciesState.hasOwnProperty(currencySymbol) && currenciesState[currencySymbol]) {
        selectedCurrencies.push(currencySymbol);
      }
    }

    return selectedCurrencies;
  }

  resetToInital() {
    this.setState(calculateInitialState(this.props));
  }

  componentWillMount() {
    this.setState(calculateInitialState(this.props));
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.defautCheckedCurrency && prevProps.defautCheckedCurrency !== this.props.defautCheckedCurrency) {
      this.setState(calculateInitialState(this.props));
    }

    const currentSelectedCurrencies = this.getSelectedCurrencies();
    const { onChange } = this.props;

    if (currentSelectedCurrencies.length !== this.getSelectedCurrencies(prevState.currenciesState).length) {
      if (onChange) {
        onChange(currentSelectedCurrencies);
      }
    }
  }

  render() {
    const { showDropdown, symbolToTitle } = this.state;
    const { className } = this.props;

    return (
      <div className={className + (showDropdown ? ' open' : '')}>
        <div className="select-wrapper" ref={this.setWrapperRef}>
          <div className="selected" onClick={this.toggleDropdown}>
            <span>{this.renderSelectedCurrenciesString()}</span>
            <span className="arrow"/>
          </div>
          {showDropdown && this.renderDropDown()}
        </div>
        <div className="underline">
          { this.props.baseCurrency ?
            `Base: ${this.props.baseCurrency}` :
            Object.values(symbolToTitle).join(', ')
          }
        </div>
      </div>
    );
  }

  renderSelectedCurrenciesString() {
    const { symbolToTitle, allSelected } = this.state;
    let string = '';
    if(allSelected) {
      string = 'All';
    }
    else {
      string = (this.getSelectedCurrencies().map(currencySymbol => symbolToTitle[currencySymbol])).join(', ');
    }

    return string || 'No Currency Selected';
  }

  renderDropDown() {
    const { currenciesState, allSelected } = this.state;
    const { currencies, baseCurrency, displayBaseCurrency } = this.props;

    if(!currencies || !currencies.length){
      return;
    }

    return (
      <div className="currencies-dropdown">
        <div className="currencies-list">
          <div className="header-wrapper">
            <CustomCheckbox name="all" label="All" value="all" checked={allSelected} onChange={this.toggleAll}/>
          </div>
          <div className="available-currencies">
            {currencies.map(
              currency =>
                (<CustomCheckbox key={currency.symbol} name={currency.symbol} value={currency.symbol}
                                 label={currency.title}
                                 checked={currenciesState[currency.symbol]}
                                 onChange={this.onChangeSelected}/>)
            )}
          </div>
        </div>
        { displayBaseCurrency &&
          <div className="base-currency">
            <div className="header-wrapper">
              Base {this.getBaseQuestionIco()}
            </div>
            <div className="base-radios">
              {currencies.map(
                currency =>
                  (<CustomRadio key={currency.symbol} name="baseCurrency"
                                checked={baseCurrency === currency.symbol}
                                onClick={this.onBaseCurrencyClick}
                                onChange={this.onBaseCurrencyChange}
                                id={'radio-' +  currency.symbol} value={currency.symbol}/>)
              )}
            </div>
          </div>
        }
      </div>
    );
  }

  getBaseQuestionIco() {
    return (
      <Fragment>
        <span className="base-question-ico" id="baseTooltip">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="23px" height="23px"
               viewBox="0 0 23 23" version="1.1">
            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="ico-question" fill="#A5ACB5">
                <g id="question">
                  <g id="Group-3" transform="translate(8.000000, 5.000000)">
                    <path
                      d="M4.4997,12 C4.4997,12.828 3.8287,13.5 2.9997,13.5 C2.1717,13.5 1.4997,12.828 1.4997,12 C1.4997,11.172 2.1717,10.5 2.9997,10.5 C3.8287,10.5 4.4997,11.172 4.4997,12"
                      id="Fill-1"/>
                    <path
                      d="M3.9997,9 C3.9997,8.08411999 4.32066311,7.57905719 5.21011761,6.83820089 C5.27959007,6.78033496 5.59871187,6.5194371 5.68571677,6.44670923 C6.34764532,5.89339949 6.72475085,5.46663823 6.95919163,4.86098824 C8.01895901,2.12320471 6.66745387,-1 2.9997,-1 C0.453833824,-1 -1.0003,0.799640031 -1.0003,3 L0.9997,3 C0.9997,1.8215517 1.66352504,1 2.9997,1 C5.03031097,1 5.70531721,2.55987763 5.0940509,4.13901176 C5.01437653,4.34484106 4.82391706,4.56037945 4.40302005,4.91220959 C4.32675767,4.97595773 4.00945162,5.23537113 3.93011161,5.30145607 C2.62944014,6.3848287 1.9997,7.37577845 1.9997,9 L3.9997,9 Z"
                      id="Stroke-3" fillRule="nonzero"/>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
        <Tooltip placement="top-start" isOpen={this.state.showTooltip} target="baseTooltip"
                 toggle={this.toggleTooltip} autohide={false}>
          Selection of base currency will result in the conversion of your invoice portfolio to the base currency. The conversion is for preview only.
        </Tooltip>
      </Fragment>
    );
  }

}

currencyFilterComponent.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  onBaseCurrencyChange: PropTypes.func,
  baseCurrency: PropTypes.string,
  displayBaseCurrency: PropTypes.bool,
};

currencyFilterComponent.defaultProps = {
  displayBaseCurrency: true
};


const CurrencyFilter = styled(currencyFilterComponent)`
  display: block;

  .select-wrapper{
    position: relative;
  }

  .underline, .selected span:not(.arrow){
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .selected{
    display: flex;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 7px;
    border-bottom: solid 2px #e1e5eb;
    font-size: 16px;
    color: #434445;

    span:not(.arrow){
      flex: 1 1 auto;
    }

    .arrow{
      padding-left: 5px;

      &:after{
        content: ' ';
        display: block;
        width: 10px;
        height: 10px;
        border: solid 2px #e1e5eb;
        border-radius: 2px;
        border-left: none;
        border-top: none;
        transform: rotate(45deg);
        transition: transform .2s linear;
      }
    }

    &:hover{
      cursor: pointer;
    }
  }

  &.open{
    .selected .arrow:after{
      transform: rotate(225deg);
    }
  }

  .currencies-dropdown{
    display: flex;
    margin-top: -10px;
    position: absolute;
    top: 100%;
    left: 0;
    background: #fff;
    box-shadow: 0 1px 20px 0 rgba(67, 68, 69, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.08);
    z-index: 99;
    min-width: 100%;

    .currencies-list{
      flex: 1 1 auto;
    }

    .header-wrapper, .available-currencies, .base-radios{
      padding: 12px 15px;
    }

    .header-wrapper{
      border-bottom: solid 2px #e1e5eb;

      .form-group{
        margin-bottom: 0;
      }
    }

    .available-currencies, .base-radios{
      .form-group{
        margin-bottom: 12px;

        &:last-child{
        margin-bottom: 0;
        }
      }
    }

    .base-currency{

      .header-wrapper{
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .base-question-ico{
        margin-left: 6px;
        width: 23px;
        height: 23px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 5px 0 rgba(67, 68, 69, 0.15);

        &:hover{
          cursor: pointer;
        }
      }

      .base-radios{
        label{
          display: inline-flex;
          vertical-align: top;
        }
      }

      .custom-radio{
        margin-right: 0;
      }
    }

  }


  .underline{
    margin-top: 4px;
    font-size: 12px;
    color: #a5acb5;
  }
`;

export default CurrencyFilter;
