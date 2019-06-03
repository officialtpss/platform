export const SHOW_MODAL = 'CONFIRM_MODAL/SHOW_MODAL';
export const HIDE_MODAL = 'CONFIRM_MODAL/HIDE_MODAL';

const initialState = {
  text: '',
  showModal: false,
  onSuccess: null,
  onCancel: null,
  args: null
};

const confirmModal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        args: action.args,
        text: action.text,
        onSuccess: action.onSuccess,
        onCancel: action.onCancel,
      };

    case HIDE_MODAL:
      return { ...state, showModal: false };

    default:
      return state;
  }
};

export default confirmModal;
