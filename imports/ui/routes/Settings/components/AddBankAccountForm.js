import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Col, Row } from 'reactstrap';

import LoadMoreSpinner from '../../../components/LoadMoreSpinner';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { CustomCheckbox } from '../../../components/styled-components/Forms/CustomCheckbox';
import { renderInputReactstrap } from '../../../form-helpers/renderInputTextFields';
import { renderCountrySelector, renderBankCurrencySelector } from '../../../form-helpers/renderSelectFields';
import { validateBankDetails } from '../../../form-helpers/validation';

class AddBankAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmed: false,
      codeLabel: (props.initialValues.country && props.initialValues.country != 'GB' && props.initialValues.country != 'IE')? 'Swift Code':'Sort Code'
    };

    this.onConfirmation = this.onConfirmation.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
  }

  onConfirmation() {
    this.setState({
      confirmed: !this.state.confirmed
    })
  }

  onChangeCountry(country) {
    if (country == 'GB' || country == 'IE') {
      this.setState({
        codeLabel: 'Sort Code'
      })
    } else {
      this.setState({
        codeLabel: 'Swift Code'
      })
    }
  }

  render() {

    const {
      handleSubmit, name, country, currency, sortCode, number, confirmation,
      loading, selectedBank, showBankModal, addBankDetail, updateBankDetails, toggleModal
    } = this.props;

    if (loading) {
      return <div className="loader m-t-10"><LoadMoreSpinner /></div>;
    }

    return (
      <form onSubmit={handleSubmit} className="form custom">
        <Row>
          <Col xs={12}>
            <Field
              name="name"
              type={'text'}
              component={renderInputReactstrap}
              label={'Bank Name'}
              placeholder={''}
            />
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Field name="country" component={renderCountrySelector} onChange={(event) => this.onChangeCountry(event.nativeEvent.target.value)}/>
          </Col>
          <Col md="4">
            <Field component={renderBankCurrencySelector} name="currency" label={"Currency"}/>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Field
              name="sortCode"
              type={'text'}
              component={renderInputReactstrap}
              label={this.state.codeLabel}
              placeholder={''}
            />
          </Col>
          <Col md="8">
            <Field
              name="number"
              type={'text'}
              component={renderInputReactstrap}
              label={'Account Number'}
              placeholder={''}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center m-t-10">
            <CustomCheckbox
              label='I confirm the bank account details above'
              name="confirmed"
              style={{textTransform: 'none'}}
              onChange={() => this.onConfirmation()}
              checked={this.state.confirmed}
            />

          </Col>
        </Row>
        <div className="d-flex justify-content-center align-content-center">
          <PrimaryButton disabled={!this.state.confirmed} type={'submit'}>{showBankModal == 2 ? 'Edit' : 'Add'} Account</PrimaryButton>
        </div>
      </form>
    );
  }
};

export default reduxForm({
  form: 'addBankAccount',
  validate: validateBankDetails,
  onSubmit: (values, dispatch, props) => {
    props.toggleModal(0);
    if (props.showBankModal == 1) {
      props.addBankDetail(values);
    } else if (props.showBankModal == 2) {
      props.updateBankDetails(props.selectedBank, values);
    }
  }
})(AddBankAccount);
