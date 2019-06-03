import React, {Fragment} from 'react';
import {Field, reduxForm, } from 'redux-form';
import {Col, Row, } from 'reactstrap';
import {Invoice} from 'meteor/populous:api';
import {
  tierFees,
  invoiceSellerFee,
  invoiceDocumentTypes,
} from 'meteor/populous:constants';

import DottedValue from '../../components/styled-components/DottedValue';
import {PrimaryButton} from '../../components/styled-components/Buttons';
import {renderInputReactstrap} from '../../form-helpers/renderInputTextFields';
import {renderAutocompleteReactstrap} from '../../form-helpers/renderAutocompleInput';
import {renderCountrySelector, renderCurrencySelector} from '../../form-helpers/renderSelectFields';
import {renderDateTimeField} from '../../form-helpers/renderDateTimeField';
import {asyncValidateAddInvoice, validateAddInvoice} from '../../form-helpers/validation';
import {floor} from '../../utils/formatter';
import UploadContract from "../../components/InvoiceContracts/UploadContract";
import {InputFloat} from "../../form-helpers/InputFloat";
import {formatDebtor} from "../../form-helpers/valueFormatters";


class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleNewDebtorField: false,
      visibleNewSellerField:  false
    };
  }

  componentDidUpdate(prevProps) {
    // re-trigger validations when switching tabs
    if (prevProps.type !== this.props.type) {
      const amount = this.props.providerInvoiceForm.values ? this.props.providerInvoiceForm.values.Amount || 0 : 0;
      this.props.change('Amount', (amount * 1))
    }
  }

  toggleVisibleNewDebtorField = (type, boolean) => {
    this.setState({
      [type]: boolean
    });

    const suggestionsChangeType = type === 'visibleNewDebtorField' ? 'debtor' : 'seller';
    if (boolean) {
      this.props.onSuggestionsChange(0, suggestionsChangeType);
    }
  };

  setAmountByClick = (value) => {
    if(value>0){
      const {change} = this.props;
      change('SaleGoal', value);
    }
  };

  getAccessToFields = () => {
    const {invoiceDocument: invoice} = this.props;
    const accessRights = {
      debtorField: false,
      invoiceDoc: false,
      allField: false,
    };

    if (invoice && invoice.invoiceDeclinedReason && invoice.invoiceDeclinedReason.length) {
      invoice.invoiceDeclinedReason.forEach((reason) => {
        if (reason === "Invoice Finance Letter of Offer is not signed") {
          accessRights.invoiceDoc = true;
        } else if (reason === "Debtor doesn't match the invoice document") {
          accessRights.debtorField = true;
        } else if (typeof reason === 'object') {
          accessRights.allField = true;
        }
      });
    } else {
      accessRights.debtorField = true;
      accessRights.invoiceDoc = true;
      accessRights.allField = true;
    }

    return accessRights;
  };

  render() {
    const {
      uploadContract, pristine,
      submitting, handleSubmit, invalid, currentUser,
      debtors, onSuggestionsChange, suggestionsSellerCount, suggestionsDebtorCount,
      onSuggestionSelected,
      providerInvoiceForm, isMarketForm,
      invoiceDocument: invoice,
      invoiceContract,
      removeDocument,
      shouldClearFields,
    } = this.props;

    const {visibleNewDebtorField, visibleNewSellerField} = this.state;
    const accessRights = this.getAccessToFields();

    const formData = providerInvoiceForm ? providerInvoiceForm.values : null;
    const invoiceFileObj = this.props[invoiceDocumentTypes.invoice];
    const amount = parseFloat((formData && formData.Amount) ? formData.Amount : 0);
    const invoiceSalePriceLimits = (new Invoice()).getSalePriceLimits(amount, formData && formData.providerFee, true);
    const invoiceMaxSalePriceLimits = (new Invoice()).getSalePriceLimits(amount, 0, true);
    const maximum_goal_price = amount > 0
      ? `${floor(invoiceSalePriceLimits.max)}`
      : '';
    const suggested = amount > 0
      ? `Enter an amount between ${floor(invoiceSalePriceLimits.min)} and ${maximum_goal_price}`
      : '';

    const isValidMarket = formData ? !!Number.parseFloat(formData.providerFee) : false;
    const isValidBlockchin = formData ? !!Number.parseFloat(formData.SalePrice) : false;
    const inValidForm = invalid || (pristine && !invoice) || submitting || (!invoiceFileObj.savedFileId && !invoiceContract) || (isMarketForm ? !isValidMarket : !isValidBlockchin);

    return (
      <Row>
          <Col lg={'12'}>
            <form className="form multi" onSubmit={handleSubmit}>
              <Row>
                <Col md={'8'} xl={'9'} sm={12} xs={12} className="m-t-40">
                  <Field
                    name="SellerName"
                    component={renderAutocompleteReactstrap}
                    data={debtors}
                    label={'Invoice Seller'}
                    getSuggestionValue={formatDebtor}
                    onSuggestionsChange={onSuggestionsChange}
                    onSuggestionSelected={onSuggestionSelected}
                    toggleVisibleNewDebtorField={this.toggleVisibleNewDebtorField.bind(this, 'visibleNewSellerField')}
                    type="seller"
                    initialValue={invoice && invoice.seller}
                    disabled={!accessRights.allField}
                  />
                  {(visibleNewSellerField || suggestionsSellerCount === 0) &&
                  <Row>
                    <Col md={'6'}>
                      <Field
                        name="sellerCountry"
                        type="text"
                        component={renderCountrySelector}
                        label="Seller Country of Registration"
                        placeholder=""
                      />
                    </Col>
                    <Col md={'6'}>
                      <Field
                        name="sellerNumber"
                        label="Seller Registration Number"
                        component={renderInputReactstrap}
                        type="text"
                        placeholder=""
                      />
                    </Col>
                  </Row>
                  }

                  <Field
                    name="DebtorName"
                    component={renderAutocompleteReactstrap}
                    data={debtors}
                    label={'Invoice Debtor'}
                    getSuggestionValue={formatDebtor}
                    onSuggestionsChange={onSuggestionsChange}
                    onSuggestionSelected={onSuggestionSelected}
                    toggleVisibleNewDebtorField={this.toggleVisibleNewDebtorField.bind(this, 'visibleNewDebtorField')}
                    initialValue={invoice && invoice.debtor}
                    disabled={!accessRights.debtorField}
                  />

                  {(visibleNewDebtorField || suggestionsDebtorCount === 0) &&
                  <Row>
                    <Col md={'6'}>
                      <Field
                        name="debtorCountry"
                        type="text"
                        component={renderCountrySelector}
                        label="Debtor Country of Registration"
                        placeholder=""
                      />
                    </Col>
                    <Col md={'6'}>
                      <Field
                        name="debtorNumber"
                        label="Debtor Registration Number"
                        component={renderInputReactstrap}
                        type="text"
                        placeholder=""
                      />
                    </Col>
                  </Row>
                  }
                  <Row>
                    <Col sm={12} xs={12} md={'8'}>
                      <Field
                        name="Invoicenumber"
                        type="text"
                        component={renderInputReactstrap}
                        label="Invoice Number"
                        placeholder=""
                        disabled={!accessRights.allField}
                      />
                    </Col>
                    <Col sm={12} xs={12} md={'4'}>
                      <Field
                        name="DueDate"
                        label="Due Date"
                        component={renderDateTimeField}
                        noBorder={true}
                        className={'customDatepicker'}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8}>
                      {/*https://redux-form.com/7.1.1/docs/api/field.md/#-code-onchange-event-newvalue-previousvalue-gt-void-code-optional-*/}
                      {/* https://github.com/erikras/redux-form/issues/2406#issuecomment-279847557 */}
                      <Field
                        name="Amount"
                        component={InputFloat}
                        label="Invoice Amount"
                        placeholder=""
                        disabled={!accessRights.allField}
                      />
                    </Col>
                    <Col  xs={4}>
                      <Field
                        name="currencies"
                        type="select"
                        component={renderCurrencySelector}
                        label="Currency"
                        disabled={!accessRights.allField}
                      />
                    </Col>
                  </Row>

                  {isMarketForm
                    ? <Fragment>
                    <Row>
                      <Col xs={'9'}>
                        <Field
                          name="SaleGoal"
                          component={InputFloat}
                          label={"Goal Sale Price"}
                          placeholder={suggested}
                          helperText={accessRights.allField && (<div style={{fontSize: 14}}>
                            Enter an amount between <span onClick={()=>{this.setAmountByClick(invoiceSalePriceLimits.min)}}>
                          <DottedValue primary={1} size={14}>
                          {floor(invoiceSalePriceLimits.min)}
                        </DottedValue></span> - <span onClick={()=>{this.setAmountByClick(invoiceSalePriceLimits.max)}}>
                          <DottedValue primary={1} size={14}>
                          {floor(invoiceSalePriceLimits.max)}
                        </DottedValue></span>
                          </div>)}
                        />
                      </Col>
                      <Col xs={'3'}>
                        <Field
                          name="providerFee"
                          component={InputFloat}
                          label={"Your fee"}
                          max={invoiceMaxSalePriceLimits.max - invoiceMaxSalePriceLimits.min}
                          placeholder={''}
                          disabled={!accessRights.allField}
                        />
                      </Col>
                    </Row>
                  </Fragment>
                    : <Row>
                    <Col md={'6'}>
                      <Field
                        name="SaleGoal"
                        component={InputFloat}
                        label={"Goal Sale Price"}
                        disabled={!accessRights.allField}
                      />
                    </Col>
                    <Col md={'6'}>
                      <Field
                        name="SalePrice"
                        component={InputFloat}
                        label={"Sale Price"}
                        disabled={!accessRights.allField}
                      />
                    </Col>
                  </Row>
                  }
                  <Field
                    name="referenceInfo"
                    type="text"
                    component={renderInputReactstrap}
                    label="Reference info (optional)"
                    placeholder=""
                    disabled={!accessRights.allField}
                  />
                </Col>
                <Col md={'4'} xl={'3'} sm={12} xs={12} className="p-l-30 p-r-30">
                  <div className={'m-t-60 p-t-30 d-none d-md-block d-xl-block'} />
                  {/* Wait for fileSaved to upload, when it does we can submit the form*/}
                  <UploadContract
                    upload={uploadContract}
                    fileType={invoiceDocumentTypes.invoice}
                    {...invoiceFileObj}
                    linkText={'UPLOAD INVOICE'}
                    oldFile={!shouldClearFields && invoiceContract}
                    removeDocument={removeDocument}
                    showRequirements={true}
                    disabled={!accessRights.invoiceDoc}
                  />
                  {/* TODO: Pass fileSaved to the form for submission, we just need some sort of reference to the savedFile (URL, mongo id, to be saved alongside the invoice form */}
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <PrimaryButton
                    type={'submit'}
                    disabled={inValidForm}
                    width="160px"
                    className="m-t-20"
                  >
                    Submit
                  </PrimaryButton>
                </Col>
              </Row>
            </form>
          </Col>
      </Row>
    )
  }
}

const formName = 'providerInvoiceForm';

export default reduxForm({
  form: formName,
  validate: validateAddInvoice,
  asyncValidate: asyncValidateAddInvoice,
  asyncBlurFields: ['Invoicenumber', 'debtorNumber', 'sellerNumber'],
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    const {selectedDebtor, selectedSeller, suggestionsDebtorCount,
      suggestionsSellerCount, invoiceFormSubmit, isMarketForm} = props;

    // Combine the id from file (once uploaded, with the Redux Form Data

    const combineFormWithIPFSId = {
      ...values,
      uploadedInvoiceId: props[invoiceDocumentTypes.invoice].savedFileId,
      newDebtor: suggestionsDebtorCount === 0,
      newSeller: suggestionsSellerCount === 0,
      isMarketForm: isMarketForm
    };

    if (selectedDebtor) {
      combineFormWithIPFSId.debtorId = selectedDebtor._id;
    }
    if (selectedSeller) {
      combineFormWithIPFSId.sellerId = selectedSeller._id;
    }

    invoiceFormSubmit(combineFormWithIPFSId);
  }
})(InvoiceForm);
