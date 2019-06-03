import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux'

import { USER_LOGOUT } from '../ui/wrappers/PrivateApp/modules';

import app from '../ui/wrappers/PrivateApp/modules';
import addInvoice from '../ui/routes/AddInvoice/modules';
import addInvoiceProviders from '../ui/routes/AddInvoiceProviders/modules';
import confirmReset from '../ui/routes/ResetTwoFAKey/modules';
import invoiceDetail from '../ui/routes/Invoice/modules';
import invoiceMarket from '../ui/routes/Market/modules';
import InvestorDashboard from '../ui/routes/Dashboards/InvestorDashboard/modules';
import borrowerDashboard from '../ui/routes/Dashboards/BorrowerDashboard/modules';
import uploadKYC from '../ui/routes/Upload/modules';
import setup2FA from '../ui/routes/Setup2FA/modules';
import wallet from '../ui/routes/Wallet/modules';
import profileSettings from '../ui/routes/Settings/modules';
import requires2FA from '../ui/components/Requires2FA/modules';
import invoices from '../ui/routes/Invoices/modules';
import confirmModal from '../ui/components/ConfirmModal/modules';
import alertModal from '../ui/components/AlertModal/modules';

const appReducer = combineReducers({
  form: formReducer, // Redux Form has to have key 'form'
  router: routerReducer,
  toastr: toastrReducer,
  app,
  addInvoice,
  addInvoiceProviders,
  confirmReset,
  invoiceDetail,
  invoiceMarket,
  InvestorDashboard,
  borrowerDashboard,
  uploadKYC,
  setup2FA,
  requires2FA,
  wallet,
  profileSettings,
  invoices,
  confirmModal,
  alertModal
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
};

export default rootReducer;
