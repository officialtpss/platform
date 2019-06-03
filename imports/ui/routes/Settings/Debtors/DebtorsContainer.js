import {Meteor} from 'meteor/meteor';
import {Debtor, Invoice} from 'meteor/populous:api';
import {compose} from 'redux';
import {connect} from "react-redux";
import {withTracker} from 'meteor/react-meteor-data';

import Debtors from "./components/Debtors";


const reduxData = connect(
  state => ({currentUser: state.app.currentUser}),
);

const meteorData = withTracker(({currentUser}) => {

  const debtorsSubscription = Meteor.subscribe('debtor.user', currentUser._id);

  const debtors = [];
  const isDebtorLinkedToInvoice = {};

  if (debtorsSubscription.ready()) {
    Debtor
      .find({
        userId: currentUser._id,
      })
      .forEach((debtor) => {
        debtors.push(debtor);
        isDebtorLinkedToInvoice[debtor._id] = debtor.hasConnectedInvoices();
      });
  }

  return {
    debtors,
    isDebtorLinkedToInvoice,
  };
});

export default compose(reduxData, meteorData)(Debtors);
