import { Meteor } from 'meteor/meteor';
import React from 'react';
import { countries, employeeNumbers, genders, areaCodes } from 'meteor/populous:constants';
import { FormGroup, Label } from 'reactstrap';
import { Currency } from 'meteor/populous:api';
import moment from 'moment';
import 'moment-timezone';

import {Input} from "../components/styled-components/Inputs";


export const renderSelectReactstrap = ({
  options,
  input,
  label,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <div>
      <FormGroup>
        <Label>{label}</Label>
        <Input {...input} type="select">
          {placeholder && <option value="" style={{display: 'none'}}>{placeholder}</option>}
          {options.map((item, index) =>
            <option key={index} value={item.value}>
              {item.label}
            </option>
          )}
        </Input>
        {touched && error && <span className="error"> {error} </span>}
      </FormGroup>
    </div>
  );
}

export const renderCurrencySelector = ({
  input,
  label,
  meta: { touched, error },
  disabled
}) => {
  const currencies = Currency.find(
    {
      $and: [
        {isPending: false},
      ],
    },
    {sort: {title: 1,},}
  ).fetch();
  return (
    <div>
      <FormGroup>
        <Label>{label}</Label>
        <Input {...input} type="select" onChange={input.onChange} disabled={disabled}>
          <option value="" style={{display: 'none'}}>Select currency</option>
          {currencies.map((item, index) => {
            return (
              <option key={index} value={item.symbol}>{item.title}</option>
            );
          })}
        </Input>
        {touched && error && <span className="error"> {error} </span>}
      </FormGroup>
    </div>
  );
};

export const renderGenderSelector = ({
  input,
  label,
  meta: { touched, error },
  disabled,
}) => {
  return (
    <div>
      <FormGroup>
        <Label>{label}</Label>
        <Input {...input} type="select" onChange={input.onChange} disabled={disabled}>
          <option value="" style={{display: 'none'}}>Select gender</option>
          {Object.keys(genders).map((genderKey) => {
            return (
              <option key={genderKey} value={genders[genderKey]}>{genders[genderKey]}</option>
            );
          })}
        </Input>
        {touched && error && <span className="error"> {error} </span>}
      </FormGroup>
    </div>
  );
};

export const CountrySelect = (props) =>(
  <Input {...props} type="select">
    <option disabled value="">Select a country...</option>
    {countries.map(country =>
      <option value={country.key} key={country.key}>
        {country.name}
      </option>
    )}
  </Input>
);

export const renderCountrySelector = ({ input = {}, meta: { touched, error } = {}, disabled , ...props}) =>
  <FormGroup>
    <label>Country</label>
    <CountrySelect  {...input} type="select" disabled={disabled} {...props}/>
    {touched && error && <span className="error"> {error} </span>}
  </FormGroup>;

export const renderEmployeeNumberSelector = ({ input, meta: { touched, error }, disabled }) =>
  <FormGroup>
    <label>Number of Employees</label>
    <Input {...input} type="select" disabled={disabled}>
      <option disabled value="">Select number of employees...</option>
      {employeeNumbers.map((number, index) =>
        <option value={index} key={index}>
          {number}
        </option>
      )}
    </Input>
    {touched && error && <span className="error"> {error} </span>}
  </FormGroup>;

export const renderBankCurrencySelector = ({
  input,
  label,
  meta: { touched, error },
}) => {
  const currencies = Currency.find(
    {
      $and: [
        {isPending: false},
      ],
    },
    {sort: {title: 1,},}
  ).fetch();

  return (
    <div>
      <FormGroup>
        <Label>{label}</Label>
        <Input {...input} type="select">
          <option value="">Select currency</option>
          {currencies.map((item, index) => {
            return (
              <option key={index} value={item.symbol}>{item.symbol}</option>
            );
          })}
        </Input>
        {touched && error && <span className="error"> {error} </span>}
      </FormGroup>
    </div>
  );
};

export const renderPhoneAreaCodeSelector = ({ label, input, meta: { touched, error } }) => (
  <FormGroup>
    <label>{label}</label>
    <Input
      id="areaCode"
      name="areaCode"
      type="select"
      {...input}
    >
      <option>Select an area code...</option>
      {
        areaCodes.map((areaCode, i) => (
          <option value={areaCode.code} key={i}>
            {areaCode.code}
          </option>
        ))
      }
    </Input>
    { touched &&
      error &&
      <span> { error } </span>
    }
  </FormGroup>
);

export const renderTimezoneSelector = ({
  input,
  label,
  meta: { touched, error },
}) => {
  const timeZones = moment.tz.names();
  const offsetTmz = [];
  for (const i in timeZones) {
    const tz = moment.tz(timeZones[i]).format('Z').replace(':00', '').replace(':30', '.5');
    let x = (tz === 0) ? 0 : parseInt(tz).toFixed(2);

    const timeZone = {
      label: `(GMT${moment.tz(timeZones[i]).format('Z')})${timeZones[i]}`,
      value: `${timeZones[i]}`,
      time: `${x}`,
    };
    offsetTmz.push(timeZone);
  }

  return (
    <div>
      <FormGroup>
        <Label>{label}</Label>
        <Input {...input} type="select">
          <option value="">Select Timezone...</option>
          {offsetTmz.map((item, index) => {
            return (
              <option key={index} value={item.value}>{item.label}</option>
            );
          })}
        </Input>
        {touched && error && <span className="error"> {error} </span>}
      </FormGroup>
    </div>
  );
};

export class renderExternalWalletSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeAddress: null,
      timeToActivation: '',
      timeToAddressActivation: '',
      externalAddress: null
    }
  }

  componentWillUpdate(nextProps, nextState){
    let externalAddress = '';
    let isNewAddress, timeToActivation;
    let isAddressUpdated = false;
    if (nextProps.externalsAddresses.length) {
      externalAddress = nextProps.selectedAddresses ? nextProps.selectedAddresses : nextProps.externalsAddresses[0];
      isNewAddress = !!externalAddress.newAddress;
      isAddressUpdated = this.state.externalAddress && externalAddress.newAddress!==this.state.externalAddress.newAddress;

      if ((!this.state.timeToAddressActivation && isNewAddress) || isAddressUpdated) {
        timeToActivation = moment(externalAddress.updatedAt).add(48, 'hours');
        this.getLeftUntilActivation(timeToActivation, externalAddress);
      }
    }
  }

  componentDidUpdate(){
    if(this.state.timeToActivation && !this.intervalId){
      this.intervalId = setInterval(()=>{this.getLeftUntilActivation(this.state.timeToActivation)}, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getLeftUntilActivation = (date, externalAddress=null) => {
    const toDate = moment(date).valueOf();
    const nowDate = moment().valueOf();
    const tempTime = moment.duration(toDate - nowDate);

    if (Math.sign(tempTime) === -1) {
      return 0;
    }

    let days = tempTime.days();
    let hours = days ? (days * 24 + tempTime.hours()) : tempTime.hours();
    hours = hours > 9 ? hours : ('0' + hours);
    let minutes = tempTime.minutes();
    minutes = minutes > 9 ? minutes : ('0' + minutes);
    let seconds = tempTime.seconds();
    seconds = seconds > 9 ? seconds : ('0' + seconds);

    this.setState({
      timeToAddressActivation: `${hours}:${minutes}:${seconds}`,
      timeToActivation: date,
      externalAddress: externalAddress ? externalAddress : this.state.externalAddress
    });

    if (!tempTime.hours() && !tempTime.minutes() && !tempTime.seconds() && this.state.externalAddress) {
      this.state.externalAddress.callMethod('confirmationAddress');
    }
  };

  handelChange = (id) => {
    const {externalsAddresses} = this.props;

    if (externalsAddresses.length) {
      const activeAddress = externalsAddresses.filter((address)=>{
        if (address._id === id) {
          return address;
        }
      })[0];

      this.setState({activeAddress});
      this.props.handleChangeActiveAdress(!!activeAddress.address);

      const timeToActivation = moment(activeAddress.updatedAt).add(48, 'hours');
      this.getLeftUntilActivation(timeToActivation);
    }
  };

  render() {
    const {externalsAddresses, input, label, placeholder, meta: {touched, error}} = this.props;
    const {activeAddress, timeToAddressActivation} = this.state;

    return (
      <div>
        <FormGroup onChange={(e)=>{this.handelChange(e.target.value)}}>
          <Label>{label}</Label>
          <Input {...input} type="select">
            {placeholder && <option value="" hidden disabled>{placeholder}</option>}
            {externalsAddresses.map((item, index) =>
              <option key={index} value={item._id}>
                {item.name}
              </option>
            )}
          </Input>

          {touched && error && <span className="error"> {error} </span>}

          {activeAddress && activeAddress.newAddress && !activeAddress.address &&
            <span className="countdown-color">
              {`Your new address will be available for use after ${timeToAddressActivation}`}
            </span>
          }

          {activeAddress && activeAddress.newAddress && activeAddress.address &&
            <span className="countdown-color">
              {`Your wallet address will change to ${activeAddress.newAddress} after ${timeToAddressActivation}`}
            </span>
          }
        </FormGroup>
      </div>
    );
  }
}
