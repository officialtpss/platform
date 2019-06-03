import React from 'react';
import { FormGroup, Label } from 'reactstrap';

import { Input } from '../../../components/styled-components/Inputs';

// Little helper component for creating text inputs
const FormTextEl = ({ name, labelText, initialValue, type, onChange }) => (
  <FormGroup>
    <Label for={name}>{ labelText }</Label>
    <Input
      defaultValue={initialValue}
      id={name}
      name={name}
      type={type}
      onChange={onChange}
    />
  </FormGroup>
);

export default FormTextEl;
