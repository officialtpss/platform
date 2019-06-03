export const RESET_PAGE_ADD_CONFIRM_PHOTO = 'RESET_PAGE_ADD_CONFIRM_PHOTO';
export const RESET_PAGE_RESET_PHOTO = 'RESET_PAGE_RESET_PHOTO';

const initialState = {
  savedFile: null,
};

const confirmReset = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PAGE_ADD_CONFIRM_PHOTO:
      return { ...state, savedFile: action.file };

    case RESET_PAGE_RESET_PHOTO:
      return { ...state, savedFile: null };

    default:
      return state;
  }
};

export default confirmReset;
