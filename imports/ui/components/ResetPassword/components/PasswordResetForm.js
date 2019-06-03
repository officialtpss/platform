import React from 'react';
import {Form, Label} from 'reactstrap';

import {PrimaryButton} from '../../styled-components/Buttons';
import {Input, StyledInput} from '../../styled-components/Inputs';

const PasswordResetForm = ({sendPasswordResetEmail, onSuccess}) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        sendPasswordResetEmail(e.target.email.value, onSuccess);
      }}
    >
      <Label htmlFor="email" style={{display: 'block', textTransform: 'uppercase', fontSize: '16px', marginTop: 0}}>
        E-mail
      </Label>
      <StyledInput name="email" type="email" placeholder="Your E-mail"/>
      <div className="text-center m-t-10">
        <PrimaryButton style={{ width: '100%', padding: '12px 16px'}}>Reset Password</PrimaryButton>
      </div>
    </form>
  );
}

export default PasswordResetForm;
