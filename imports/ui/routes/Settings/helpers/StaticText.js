import React from 'react';
import { FormGroup } from 'reactstrap';

import { Small, P } from '../../../components/styled-components/Typography';

// Little helper component for creating static input
const StaticFormText = ({ label, value, children }) => (
  <FormGroup>
    <Small>{ label }</Small>
    <P dangerouslySetInnerHTML={{__html: value}}></P>
    {children}
  </FormGroup>
);

export default StaticFormText;
