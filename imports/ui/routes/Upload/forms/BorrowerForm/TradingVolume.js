import React from 'react';
import {connect} from 'react-redux';
import {averageInvoiceValues, averageInvoiceVolumes} from 'meteor/populous:constants';
import {Field, reduxForm} from 'redux-form';
import {Row, Col} from 'reactstrap';

import {renderCurrencySelector} from '../../../../form-helpers/renderSelectFields';
import renderRangeSlider from '../../../../form-helpers/renderRangeSlider';
import {PrimaryButton} from '../../../../components/styled-components/Buttons';
import {H2, Small} from '../../../../components/styled-components/Typography';
import {TradingVolumeValidateBorrower} from '../KYCValidation'

class BorrowerFormTradingVolume extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  saveCurrentProgress = () => {
    const {saveCurrentProgress, pristine} = this.props;

    if (!pristine) {
      saveCurrentProgress(false);
    }
  };

  render() {
    const {handleSubmit, previousPage, initialValuesReduxForm: {averageInvoiceVolume, averageInvoiceValue}} = this.props;
    let n_averageInvoiceVolumes = {};
    for (var i in averageInvoiceVolumes) {
      n_averageInvoiceVolumes[i] = averageInvoiceVolumes[i] + ' invoices';
    }

    return (
      <form className="form" onSubmit={handleSubmit}>
        <H2 className="text-center m-b-30">
          Trading volume
        </H2>

        <div style={{maxWidth: '200px', margin: 'auto'}}>
          <Field component={renderCurrencySelector} name="currencySelector" label={"Currency: "}/>
        </div>

        <Row className="m-t-20">
          <Col xs={12} md={6} className="m-t-10 text-center">
            <Small>Our expected monthly volume of invoices financed</Small>
            <Field
              component={renderRangeSlider}
              name="averageInvoiceVolume"
              max={6}
              min={0}
              step={1}
              orientation={'vertical'}
              labels={n_averageInvoiceVolumes}
            />
          </Col>
          <Col xs={12} md={6} className="m-t-10 text-center">
            <Small>Our expected average value of invoices financed</Small>
            <Field
              component={renderRangeSlider}
              name="averageInvoiceValue"
              max={5}
              min={0}
              step={1}
              orientation={'vertical'}
              labels={averageInvoiceValues}
            />
          </Col>
        </Row>

        <Row className={`${this.props.className} p-t-40`}>
          <Col xs={12} className="d-flex justify-content-center">
            <PrimaryButton outline block className="previous m-r-10" onClick={previousPage}>
              Previous
            </PrimaryButton>
            <PrimaryButton block type="submit" className="next m-l-10" onClick={this.saveCurrentProgress}>
              Next
            </PrimaryButton>
          </Col>
        </Row>
      </form>
    );
  }
}

BorrowerFormTradingVolume = reduxForm({
  form: 'kycwizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: TradingVolumeValidateBorrower
})(BorrowerFormTradingVolume);

export default connect((state, ownProps) => ({
  initialValues: ownProps.initialValuesReduxForm,
}))(BorrowerFormTradingVolume);
