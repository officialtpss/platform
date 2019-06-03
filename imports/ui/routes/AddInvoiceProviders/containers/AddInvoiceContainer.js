import {Meteor} from 'meteor/meteor';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import AddInvoice from '../components/AddInvoice';
import {withTracker} from 'meteor/react-meteor-data';
import {Debtor, Invoice} from 'meteor/populous:api';
import {
  createInvoiceFromForm,
  suggestionSelected,
  suggestionsFetched,
  uploadContract,
  removeDocument
} from "../modules/actions";

const mapStateToProps = ({app, addInvoiceProviders, form:{providerInvoiceForm}}) => ({
  currentUser: app.currentUser,
  providerInvoiceForm,
  ...addInvoiceProviders,
});

const reduxData = connect(
  mapStateToProps,
  (dispatch) => ({
    invoiceForm: bindActionCreators({
      invoiceFormSubmit: createInvoiceFromForm,
      onSuggestionsChange: suggestionsFetched,
      onSuggestionSelected: suggestionSelected,
      uploadContract,
      removeDocument
    }, dispatch),
  })
);

// Subscribe to the meteor db and init the store
const meteorData = withTracker((state) => {
  const handler = Meteor.subscribe('debtor.all');
  const debtors = Debtor.find({}).fetch();

  // We have to return an object for withTracker to work
  return {
    loading: !handler.ready(),
    debtors,
  };
});


// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(AddInvoice);
