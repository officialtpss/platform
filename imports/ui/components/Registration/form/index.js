import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import {toastr} from "react-redux-toastr";

import RegistrationForm from './RegistrationForm';
import { checkEmail } from '../helpers';

class registrationFormWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: 'password',
      passwordConfirmType: 'password',
    };
  }

  submitForm = (values) => {
    checkEmail(values.email)
      .then(() => {
        this.props.onSubmit(values);
      })
      .catch((result) => {
        if (result === 'exist') {
          toastr.error('', '', {
            component: (<Fragment>This email address is already registered. <br/>
              Note, that Populous World uses <a href="#" onClick={() => {
                this.props.history.push('/login', {showSingleLoginModal: true})
              }}>single
                login</a></Fragment>)
          });
        }
      });
  }



  onShowHideClick = (event) => {
    const state = {};
    state[event + ''] = this.state[event] === 'input' ? 'password' : 'input';
    this.setState(state)
  }

  render() {
    const { passwordType, passwordConfirmType,} = this.state;

    return (
      <div>
        <RegistrationForm onSubmit={this.submitForm} />
      </div>
    );
  }
}

export default withRouter(registrationFormWrapper);
