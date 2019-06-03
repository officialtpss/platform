import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Input } from 'reactstrap';

import { renderInputReactstrap } from '../../../form-helpers/renderInputTextFields';
import { validateQuote } from '../../../form-helpers/validation';
import { PrimaryButton } from '../../styled-components/Buttons';

const QuoteForm = ({
  handleSubmit,
  pristine,
  submitting,
}) => (
  <StyledForm className="form" onSubmit={handleSubmit} >
    <Row className="form-group">
      <Col sm={6}>
        <Field
          name="firstName"
          type="text"
          component={renderInputReactstrap}
          placeholder="Your Name"
          label='First Name'
        />
      </Col>

      <Col sm={6}>
        <Field
          name="lastName"
          type="text"
          component={renderInputReactstrap}
          placeholder="Your Last Name"
          label='Last Name'
        />
      </Col>
    </Row>

    <Row className="form-group">
      <Col sm={6}>
        <Field
          name="companyName"
          type="text"
          component={renderInputReactstrap}
          placeholder="Your Company Name"
          label='Company Name'
        />
      </Col>

      <Col sm={6}>
        <Field
          name="businessSector"
          type="select"
          component={renderInputReactstrap}
          placeholder="Your Last Name"
          label='Business Sector'
        >
          <option>Manufacturers</option>
          <option>Construction</option>
          <option>Recruitment</option>
          <option>Creative and Media</option>
          <option>Wholesale</option>
          <option>Retail</option>
          <option>Financial services</option>
        </Field>
      </Col>
    </Row>

    <Row className="form-group">
      <Col sm={6}>
        <Field
          name="interestingService"
          type="select"
          component={renderInputReactstrap}
          placeholder=""
          label='Which service are you interested in?'
        >
          <option>Invoice Finance</option>
          <option>Business intelligence</option>
          <option>Exchange</option>
        </Field>
      </Col>

      <Col sm={6}>
        <Field
          name="email"
          type="email"
          component={renderInputReactstrap}
          placeholder="Your Email"
          label='Email'
        />
      </Col>
    </Row>

    <Row className="form-group">
      <Col sm={6}>
        <Field
          name="phone"
          type="text"
          component={renderInputReactstrap}
          placeholder="Your Phone"
          label='Phone'
        />
      </Col>

      <Col sm={6}>
        <Field
          name="annualTurnover"
          type="text"
          component={renderInputReactstrap}
          placeholder="Your Annual Turnover"
          label='Annual Turnover'
        />
      </Col>
    </Row>

    <Row className="text-center">
      <Col xs={12} className="d-flex justify-content-center">
        <PrimaryButton block type="submit" disabled={pristine || submitting}>
          Get a Quote
        </PrimaryButton>
      </Col>
    </Row>

  </StyledForm>
);

const StyledForm = styled.form`
  .form-group {
    font-size: 16px;
    
    label {
      margin: 8px;
      font-size: 16px;
      text-transform: capitalize;
      color: white;
    }

    select {
      background-color: #374866;
      color: white;
      border: none;

      option {
        background-color: #374866;
        color: white;
      }
    }

    input.form-control {
      padding: 12px 10px;
      height: 42px;
      font-size: 16px;
    }
  }

  button {
    padding: 12px 32px;
    margin: 0;
    margin-top: 16px;
    width: 300px;
  }
`

// Because the LoginForm is displayed in the same
// view for both Borrowers and Investors
// we use pass the `form` prop with a uid for each login form.
export default reduxForm({
  // https://redux-form.com/7.0.4/docs/api/reduxform.md/#-code-onsubmit-function-code-optional-
  // onSubmit takes values and dispatch as parameters
  form: 'quoteForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: (values, dispatch, { toggleModal }) => {
    // dispatch(checkCredentials(email, password, toggleModal));
    console.log(values)
  },
  validate: validateQuote
})(QuoteForm);
