export const SHOW_MODAL = 'ALERT_MODAL/SHOW_MODAL';
export const HIDE_MODAL = 'ALERT_MODAL/HIDE_MODAL';

const initialState = {
  html: '',
  headerText: 'Alert',
  buttonText: 'OK',
  showModal: false,
  onClose: null,
  args: null
};

const alertModal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        args: action.args,
        html: action.html,
        headerText: action.headerText,
        buttonText: action.buttonText,
        onClose: action.onClose
      };

    case HIDE_MODAL:
      return { ...state, showModal: false };

    default:
      return state;
  }
};

export default alertModal;
