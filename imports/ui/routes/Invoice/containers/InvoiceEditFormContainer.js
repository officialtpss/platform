import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import InvoiceEditForm from '../components/InvoiceEditForm';
import {withTracker} from 'meteor/react-meteor-data';
import {Debtor, Invoice} from 'meteor/populous:api';
import {
  removeDocument,
  suggestionSelected,
  suggestionsFetched,
  uploadContract,
  resetFormFields,
  deleteInvoice
} from "../modules/actions";
import updateInvoice from "../modules/actions/editActions/updateInvoice";

const mapStateToProps = ({app, invoiceDetail, form:{providerInvoiceForm, debtorInvoiceForm}}, {invoiceDocument:invoice}) => ({
  debtorInvoiceForm,
  providerInvoiceForm,
  ...app,
  ...invoiceDetail,
  initialValues: invoiceDetail.shouldClearFields ? {} : {
    DebtorName: (invoice.debtor && invoice.debtor.name),
    SellerName: (invoice.seller && invoice.seller.name),
    Invoicenumber: invoice.invoiceNumber,
    DueDate: new Date(Date.parse(invoice.dueDate)),
    Amount: invoice.amount,
    currencies: invoice.currency,
    SaleGoal: invoice.salePrice,
    providerFee: invoice.providerFeeAmount,
    referenceInfo: invoice.referenceInfo,
  },
});

const reduxData = connect(
  mapStateToProps,
  (dispatch) => ({
    invoiceForm: bindActionCreators({
      invoiceFormSubmit: updateInvoice,
      onSuggestionsChange: suggestionsFetched,
      onSuggestionSelected: suggestionSelected,
      uploadContract,
      removeDocument,
      resetFormFields,
      deleteInvoice
    }, dispatch),
  })
);

// Subscribe to the meteor db and init the store
const meteorData = withTracker((state) => {

  // We have to return an object for withTracker to work
  return {
  };
});


// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(InvoiceEditForm);
