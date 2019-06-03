import React from 'react';
import { Form, Label } from 'reactstrap';

import {PrimaryButton} from '../../../components/styled-components/Buttons'
import { Input } from '../../../components/styled-components/Inputs';

const ResendVerificationForm = ({ sendEmailVerificationEmail }) => (
  <form className="form"
    onSubmit={e => {
      e.preventDefault();
      sendEmailVerificationEmail(e.target.email.value);
    }}
  >
    <div className="form-group m-b-30">
      <Label style={{ display: 'block' }}>
        Email address
        <Input name="email" type="email" />
      </Label>
    </div>
    <div className="form-group text-center m-t">
      <PrimaryButton type="submit">Resend the verification link</PrimaryButton>
    </div>
  </form>
);

export default ResendVerificationForm;
