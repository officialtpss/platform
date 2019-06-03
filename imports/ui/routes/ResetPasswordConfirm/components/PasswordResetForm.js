import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {PrimaryButton} from '../../../components/styled-components/Buttons'
import {requires2FA} from '../../../components/Requires2FA/modules/actions';
import {renderInputReactstrap} from '../../../form-helpers/renderInputTextFields';
import {validateResetPassword} from '../../../form-helpers/validation';
import store from "../../../../store/index";
import resetPassword from '../modules/actions/reset-password';


const PasswordResetForm = ({handleSubmit, onShowHideClick, passwordType, passwordConfirmType}) => (
  <form className="form" onSubmit={handleSubmit}>
    <div className="m-b-30">
      <Field
        name="password"
        type={passwordType}
        component={renderInputReactstrap}
        label="New Password"
        passwordSuccess={'Strong enough'}
        errorHint={true}
        placeholder={''}
        showHide={true}
        onShowHideClick={onShowHideClick.bind(this, 'passwordType')}
      />
    </div>
    <div className="m-b-30">
      <Field
        name="passwordConfirm"
        type={passwordConfirmType}
        component={renderInputReactstrap}
        label="Confirm Password"
        placeholder={''}
        showHide={true}
        onShowHideClick={onShowHideClick.bind(this, 'passwordConfirmType')}
      />
    </div>
    <div className="form-group text-center m-t">
      <PrimaryButton type="submit">
        Change Password
      </PrimaryButton>
    </div>
  </form>
);

export default reduxForm({
  form: 'resetPassword',
  validate: validateResetPassword,
  onSubmit: ({password, passwordConfirm}, dispatch, {match}) => {
    Meteor.call('users.token', match.params.token, (error, user) => {
      if (user && user.twoFAKey) {
        store.dispatch(requires2FA(resetPassword, null, {type: 'resetPassword'})(password, passwordConfirm, match.params.token));
      } else {
        store.dispatch(resetPassword(password, passwordConfirm, match.params.token));
      }
    });
  }
})(PasswordResetForm);

