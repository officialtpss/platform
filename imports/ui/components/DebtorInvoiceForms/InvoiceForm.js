import React from 'react';
import {Field, reduxForm, } from 'redux-form';
import {Col, Row, FormGroup} from 'reactstrap';
import {Invoice} from 'meteor/populous:api';
import {
  tierFees,
  invoiceSellerFee,
  invoiceDocumentTypes
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
import {LinkText, H1, LABEL} from '../../components/styled-components/Typography';
import {formatDebtor} from "../../form-helpers/valueFormatters";
import { Input } from '../../components/styled-components/Inputs';


class InvoiceForm extends React.Component {

  constructor(props) {
    super(props);
    const { currentUser } = this.props
    this.state = {
      pdfReviewModal: {},
      visibleNewDebtorField: false,
      rate: (currentUser.fees.dailyFee * 30)
    };
  }

  togglePdfReviewModal = (type) => {
    this.setState({
      pdfReviewModal: {[type]: !this.state.pdfReviewModal[type]}
    });
  };

  toggleVisibleNewDebtorField = (boolean) => {
    this.setState({
      visibleNewDebtorField: boolean
    });

    if (boolean) {
      this.props.onSuggestionsChange(0);
    }
  };

  clearFields = () => {
    const {reset, form, resetFormFields} = this.props;
    resetFormFields();
    reset(form);
  };

  onAmountChange = (value) => {
    const amount = parseFloat(value);
    if (amount) {
      const { rate } = this.state
      const {change, currentUser} = this.props;
      const Amount = amount * currentUser.fees.advancedPercentage * 0.01
      const SaleGoal = Amount * (1 - rate * 0.01)
      change('Amount', Amount.toFixed(2));
      change('SaleGoal', SaleGoal.toFixed(2));
    }
  }

  getAccessToFields = () => {
    return {
      debtorField: true,
      invoiceDoc: true,
      allField: true,
    };
  };

  render() {
    const {
      uploadContract, pristine,
      submitting, handleSubmit, invalid,
      debtors, onSuggestionsChange, suggestionsDebtorCount,
      onSuggestionSelected,
      invoiceDocument: invoice,
      invoiceContract,
      removeDocument,
      deleteInvoice,
      showReferenceField,
      shouldClearFields,
    } = this.props;

    const accessRights = this.getAccessToFields();
    const invoiceFileObj = this.props[invoiceDocumentTypes.invoice];
    const inValidForm = invalid || (pristine && !invoice) || submitting || ((invoiceFileObj && !invoiceFileObj.savedFileId) && !invoiceContract);
    // InputAmount: what user inputs
    // Amount: Advanced Amount calculated
    return (
      <Row>
          <Col lg={'12'}>
            <form className="form multi" onSubmit={handleSubmit}>

              {!invoice &&
              <Row>
                <Col className="page-title">
                  <H1>Add Invoice</H1>
                </Col>
              </Row>
              }

              <Row>
                <Col md={'8'} xl={'9'} sm={12} xs={12} className="m-t-40">
                  <Field
                    name="DebtorName"
                    component={renderAutocompleteReactstrap}
                    data={debtors}
                    label={'Debtor'}
                    getSuggestionValue={formatDebtor}
                    onSuggestionsChange={onSuggestionsChange}
                    onSuggestionSelected={onSuggestionSelected}
                    toggleVisibleNewDebtorField={this.toggleVisibleNewDebtorField}
                    initialValue={(invoice && !shouldClearFields) && invoice.debtor}
                    disabled={!accessRights.debtorField}
                  />
                  {(this.state.visibleNewDebtorField || suggestionsDebtorCount === 0) &&
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
                    <Col xs={4}>
                      {/*https://redux-form.com/7.1.1/docs/api/field.md/#-code-onchange-event-newvalue-previousvalue-gt-void-code-optional-*/}
                      {/* https://github.com/erikras/redux-form/issues/2406#issuecomment-279847557 */}
                      <Field
                        name="InputAmount"
                        component={InputFloat}
                        label="Invoice Amount"
                        onChange={({target: {value}}) => {
                          this.onAmountChange(value)
                        }}
                        placeholder=""
                        disabled={!accessRights.allField}
                      />
                    </Col>
                    <Col xs={4}>
                      {/*https://redux-form.com/7.1.1/docs/api/field.md/#-code-onchange-event-newvalue-previousvalue-gt-void-code-optional-*/}
                      {/* https://github.com/erikras/redux-form/issues/2406#issuecomment-279847557 */}
                      <Field
                        name="Amount"
                        component={InputFloat}
                        label="Advanced Amount"
                        readOnly
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

                  <Row>
                    <Col xs={8}>
                      <Field
                        name="SaleGoal"
                        component={InputFloat}
                        label={"Goal Sale Price"}
                        readOnly
                        disabled={!accessRights.allField}
                      />
                    </Col>
                    <Col xs={4}>
                      <FormGroup>
                        <LABEL>
                          Rate, %
                        </LABEL>
                        <Input type="number" value={this.state.rate.toFixed(2)} readOnly/>
                      </FormGroup>
                    </Col>
                  </Row>

                  {showReferenceField &&
                  <Row>
                    <Col>
                      <Field
                        name="referenceId"
                        type="text"
                        component={renderInputReactstrap}
                        label="reference number (optional)"
                        className={'m-t-15'}
                        placeholder={''}
                        helperText={'From the user who referred you to Populous'}
                        disabled={!accessRights.allField}
                      />
                    </Col>
                  </Row>
                  }
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
                    pdfReviewModal={this.state.pdfReviewModal}
                    togglePdfReviewModal={this.togglePdfReviewModal}
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
              <Row>
                <Col className="text-center d-flex justify-content-center">
                  {accessRights.debtorField && accessRights.invoiceDoc && accessRights.allField &&
                  <LinkText onClick={this.clearFields} className="m-r-15" style={{fontWeight: 600}} disabled>
                    <img src={'/img/icons/ico-clear.png'} height={30} className={'m-b-5 m-r-5'} />
                    CLEAR FIELDS
                  </LinkText>
                  }

                  {!!invoice &&
                  <LinkText onClick={deleteInvoice} className="m-l-15" style={{fontWeight: 600}}>
                    <img src="/img/icons/delete.png" height={20} className={'m-b-5 m-r-5'}/>
                    DELETE INVOICE
                  </LinkText>
                  }
                </Col>
              </Row>
          </form>
        </Col>
      </Row>
    )
  }
}

const formName = 'debtorInvoiceForm';

export default reduxForm({
  form: formName,
  validate: validateAddInvoice,
  asyncValidate: asyncValidateAddInvoice,
  asyncBlurFields: ['Invoicenumber', 'debtorNumber'],
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    const {selectedDebtor, suggestionsDebtorCount, invoiceFormSubmit} = props;

    // Combine the id from file (once uploaded, with the Redux Form Data

    const combineFormWithIPFSId = {
      ...values,
      uploadedInvoiceId: props[invoiceDocumentTypes.invoice].savedFileId,
      newDebtor: suggestionsDebtorCount === 0,
    };

    if (selectedDebtor) {
      combineFormWithIPFSId.debtorId = selectedDebtor._id;
    }
    console.log('HALA VALUES', values, combineFormWithIPFSId)
    invoiceFormSubmit(combineFormWithIPFSId);
  }
})(InvoiceForm);
