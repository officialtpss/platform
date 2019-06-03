import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'reactstrap';

import { renderInputReactstrap } from '../../../form-helpers/renderInputTextFields';
import { PrimaryButton } from '../../styled-components/Buttons';
import { validateRegistrationBuyer } from '../../../form-helpers/validation';

const RegistrationBuyerForm = ({ handleSubmit, pristine, submitting, openLogin }) => (
  <StyledForm className="form" onSubmit={handleSubmit}>
    <Row>
      <Col sm={12} xs={12}>
        <Field
          name="email"
          type="email"
          component={renderInputReactstrap}
          label="Email"
          placeholder="Your E-mail"
        />
      </Col>
      <Col sm={12} xs={12}>
        <Field
          name="password"
          type="password"
          component={renderInputReactstrap}
          passwordSuccess="Strong enough"
          errorHint={true}
          label="Password"
          placeholder="Your Password"
          showHide={true}
        />
      </Col>
      <Col sm={12} xs={12}>
        <Field
          name="passwordConfirm"
          type="password"
          component={renderInputReactstrap}
          label="Confirm Password"
          placeholder="Conform Password"
          showHide={true}
        />      
      </Col>
    </Row>

    <Row>
      <div className="checkbox-wrapper form-group">
        <Field
          name="termsOfService"
          type="checkbox"
          component={renderInputReactstrap}
          placeholder={''}
          label=""
        />
        <div>
          <span>I accept the </span>
          <a href="#">Terms of Service.</a>
        </div>
      </div>
    </Row>

    <Row className="text-center">
      <Col sm={12}>
        <PrimaryButton block type="submit" className="next" disabled={pristine || submitting}>
          Register
        </PrimaryButton>
      </Col>
    </Row>

    <div className="other-modals text-center">
      <span>Already Have an Account </span>
      <a href="#" onClick={openLogin}>Login</a>
    </div>
  </StyledForm>
);

const StyledForm = styled.form`
  .form-group {
    label {
      margin: 8px;
      color: white;
      font-size: 14px;
    }

    input {
      font-size: 16px !important;
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 12px;

    .form-group {
      margin-bottom: 0 !important;
    }
  }

  .other-modals {
    font-size: 12px;
  }

  button {
    padding: 12px 16px;
  }
`

export default reduxForm({
  form: 'registrationBuyerForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validateRegistrationBuyer
})(RegistrationBuyerForm);
