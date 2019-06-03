export const SET_2FA_KEY = 'SETUP_2FA/SET_2FA_KEY';
export const TOGGLE_MODAL = 'APP/TOGGLE_MODAL';

const initialState = {
  secret: null,
  modal: false
};

const setup2FA = (state = initialState, action) => {
  switch (action.type) {
    case SET_2FA_KEY:
      return { ...state, secret: action.secret };

    case TOGGLE_MODAL:
      return { ...state, modal: action.modal };

    default:
      return state;
  }
};

export default setup2FA;
