import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

/**
 * Can also be used for default form fields,
 * but this works for a checkbox nicely,
 * given that it doesn't require styling (yet)
 */


const CustomRadio = ({label, id, name, className, ...props}) => {
  return (
    <FormGroup className={className}>
    <Input type="radio" id={id} name={name} addon {...props}/>
    <Label  htmlFor={id}>
      <div className="custom-radio"/>
      {label}
    </Label>
  </FormGroup>
  );
};

export default CustomRadio;