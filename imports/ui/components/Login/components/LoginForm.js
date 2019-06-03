import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'reactstrap';

import { checkCredentials } from '../modules/actions';
import { renderInputReactstrap } from '../../../form-helpers/renderInputTextFields';
import { validateLogin } from '../../../form-helpers/validation';
import { PrimaryButton } from '../../../components/styled-components/Buttons';

const LoginForm = ({
  handleSubmit,
  pristine,
  submitting,
  openForgotPassword,
  openSignUp,
  passwordType
}) => (
  <StyledForm className="form" onSubmit={handleSubmit} >
    <div className="form-group">
      <Field
        name="email"
        type="email"
        component={renderInputReactstrap}
        placeholder="User Name"
        label=''
      />
    </div>
    <div className="form-group">
      <Field
        name="password"
        type={passwordType}
        component={renderInputReactstrap}
        errorHint={true}
        placeholder="Password"
        showHide={true}
        label=''
      />
    </div>

    <Row className="text-center">
      <Col xs={12}>
        <PrimaryButton block type="submit" disabled={pristine || submitting}>
          Log In
        </PrimaryButton>
      </Col>
    </Row>

    <div className="other-controls">
      <a href="#" onClick={openForgotPassword}>Forgot your password?</a>
      <div>
        <span>Not on Populous yet? </span>
        <a href="#" onClick={openSignUp}>Register</a>
      </div>
    </div>

  </StyledForm>
);

const StyledForm = styled.form`
  .form-group {
    font-size: 16px;
    
    label {
      display: none;
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
  }

  .other-controls {
    font-size: 12px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
  }
`

// Because the LoginForm is displayed in the same
// view for both Borrowers and Investors
// we use pass the `form` prop with a uid for each login form.
export default reduxForm({
  // https://redux-form.com/7.0.4/docs/api/reduxform.md/#-code-onsubmit-function-code-optional-
  // onSubmit takes values and dispatch as parameters
  onSubmit: ({ email, password }, dispatch, { toggleModal }) => {
    dispatch(checkCredentials(email, password, toggleModal));
  },
  validate: validateLogin
})(LoginForm);
