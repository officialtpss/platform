export const INVOICE_SET_BORROWER_CURRENCY = 'INVOICE_SET_BORROWER_CURRENCY';
export const BORROWER_DASHBOARD_DATE_RANGE = 'BORROWER_DASHBOARD_DATE_RANGE';
export const BORROWER_DASHBOARD_DUE_DAYS = 'BORROWER_DASHBOARD_DUE_DAYS';


const initialState = {
  selectedCurrency: null,

  cashFlowDateRange: {
    startDate: '',
    endDate: '',
  },
  dueDays: 7,
};

const borrowerDashboard = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case INVOICE_SET_BORROWER_CURRENCY:
      return {...state, selectedCurrency: payload};
    case BORROWER_DASHBOARD_DATE_RANGE:
      return {...state, cashFlowDateRange: {...payload}};
    case BORROWER_DASHBOARD_DUE_DAYS:
      return {...state, dueDays: payload};
    default:
      return state;
  }
};


export default borrowerDashboard;
