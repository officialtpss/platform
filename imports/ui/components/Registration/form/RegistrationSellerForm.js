import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'reactstrap';

import { renderInputReactstrap } from '../../../form-helpers/renderInputTextFields';
import { PrimaryButton } from '../../styled-components/Buttons';
import { validateRegistrationSeller } from '../../../form-helpers/validation';

const RegistrationSellerForm = ({ handleSubmit, pristine, submitting, openLogin }) => (
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
          passwordSuccess={'Strong enough'}
          errorHint={true}
          label="Password"
          placeholder="Your Password"
          showHide={true}
        />
      </Col>
      <Col sm={12} xs={12}>
        <Field
          name="country"
          type="text"
          component={renderInputReactstrap}
          label="Country or Region of Residence"
          placeholder="United Kingdom (UK)"
        />
      </Col>
    </Row>

    <Row className="name-wrapper">
      <Col sm={12} className="text-left name">Name</Col>
      <Col sm={6}>
        <Field
          name="firstName"
          type="text"
          component={renderInputReactstrap}
          label=""
          placeholder="First Name"
        />
      </Col>
      <Col sm={6}>
        <Field
          name="lastName"
          type="text"
          component={renderInputReactstrap}
          label=""
          placeholder="Last Name"
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

    .password-show {
      margin-bottom: 35px;
    }
  }

  .name-wrapper  {
    .name {
      margin: 0 8px 5px 8px;
    }

    label {
      display: none;
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
  form: 'registrationSellerForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validateRegistrationSeller
})(RegistrationSellerForm);
