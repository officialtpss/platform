export const INVOICE_SET_CHARTS = 'INVOICE_SET_CHARTS';
export const GET_WALLET_FUNDS = 'GET_WALLET_FUNDS';
export const SET_DATES_RANGE = 'SET_DATES_RANGE';
export const UPDATE_SIC_STATISTIC= 'UPDATE_SIC_STATISTIC';

const initialState = {
  currentWallet: {
    title: '',
    symbol: ''
  },
  datesRange: {
    from: '',
    to: '',
  },
  sicStatistic: null,
};

const InvestorDashboard = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case INVOICE_SET_CHARTS:
      return {...state, chartType: payload};
    case GET_WALLET_FUNDS:
      return {...state, currentWallet: payload};
    case SET_DATES_RANGE:
      return {...state, datesRange: payload};
    case UPDATE_SIC_STATISTIC:
      return {...state, sicStatistic: payload.sicCodesWithInvoicesCount};
    default:
      return state;
  }
};


export default InvestorDashboard;
