import {Meteor} from 'meteor/meteor';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import InvoiceForm from '../components/InvoiceForm';
import {withTracker} from 'meteor/react-meteor-data';
import {Debtor, Invoice} from 'meteor/populous:api';
import moment from "moment";
import {
  createInvoiceFromForm,
  removeDocument,
  suggestionSelected,
  suggestionsFetched,
  uploadContract,
} from "../modules/actions";
import {RESET_FORM_FIELDS} from "../modules";

const mapStateToProps = ({app, addInvoice, form:{debtorInvoiceForm}}) => ({
  debtorInvoiceForm,
  ...app,
  ...addInvoice,
});

const reduxData = connect(
  mapStateToProps,
  (dispatch) => ({
    invoiceForm: bindActionCreators({
      invoiceFormSubmit: createInvoiceFromForm,
      onSuggestionsChange: suggestionsFetched,
      onSuggestionSelected: suggestionSelected,
      resetFormFields: () => dispatch({type: RESET_FORM_FIELDS}),
      uploadContract,
      removeDocument,
    }, dispatch),
  })
);

// Subscribe to the meteor db and init the store
const meteorData = withTracker(({currentUser}) => {
  const handlerInvoices = Meteor.subscribe('invoices.user', Meteor.userId());
  const handler = Meteor.subscribe('debtor.all');
  const debtors = Debtor.find({}).fetch();
  let showReferenceField = false;
  if(handlerInvoices.ready()) {
    const invoice = Invoice.findOne({
      borrowerId: currentUser._id,
      createdAt: {$lte: moment.utc().subtract(30, 'days').toDate()}
    });

    if(!invoice) {
      showReferenceField = true;
    }

  }

  // We have to return an object for withTracker to work
  return {
    loading: !handler.ready(),
    debtors,
    showReferenceField,
  };
});


// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(InvoiceForm);
