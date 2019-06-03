import React from 'react';
import {FormGroup, FormText} from 'reactstrap';

import { Input } from '../components/styled-components/Inputs';
import { LABEL } from "../components/styled-components/Typography";

function decimalPlaces(num) {
  const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  return Math.max(
    0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0)
    // Adjust for scientific notation.
    - (match[2] ? +match[2] : 0));
}

export const InputFloat =
  ({
     label,
     name,
     className,
     style,
     helperText,
     linkText,
     meta = {},
     input = {},
     onChange: onChangeInput,
     precision = 2,
     error: propsError,
     max,
     min,
     ...props,
   }) => {

    const {onChange: onChangeRedux, type, ...restRedux} = input;
    const {touched, error: reduxError,} = meta;

    const onChange = (event, newValue) => {
      const {target: {value}} = event;

      let regex = /^(\d+\.?\d*|\.\d+)$/;
      if (value !== '' && !regex.test(value)
        || (max!== undefined && Number.parseFloat(value) > max)) {
        event.preventDefault();
        return;
      }

      if (value &&
        value.indexOf('0') === 0 &&
        value.indexOf('.') !== 1) {
        event.target.value = Number.parseInt(value, 10);
      }

      if (decimalPlaces(value) <= precision) {
        if (onChangeInput) {
          onChangeInput(event);
        }

        if (onChangeRedux) {
          onChangeRedux(event);
        }
      }
    };

    return (
      <FormGroup className={className}>
        {label !== undefined && <LABEL htmlFor={name} style={style}>
          {label}
        </LABEL>}
        <Input type="number" style={style} id={name} step={1/Math.pow(10, precision)} name={name} addon {...restRedux} {...props} onChange={onChange}/>
        {((touched && reduxError) || (props.valid === false && propsError)) &&
        <span className="error">{reduxError || propsError}</span>}
        {helperText &&
        <FormText color="muted">
          {helperText}<a href="/"> {linkText}</a>
        </FormText>}
      </FormGroup>
    );
  };
