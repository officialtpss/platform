export const UPDATE_SAVING_STATE = 'UPLOAD_KYC/UPDATE_SAVING_STATE';
export const SET_SUPPORTED_DOCUMENTS = 'UPLOAD_KYC/SET_SUPPORTED_DOCUMENTS';
export const SET_CONFIRMED_PHONE = 'UPLOAD_KYC/SET_CONFIRMED_PHONE';
export const SET_INITIAL_LIVE_PHOTO = 'UPLOAD_KYC/SET_INITIAL_LIVE_PHOTO';
export const SET_STEP = 'UPLOAD_KYC/SET_STEP';

const initialState = {
  saving: false,
  supportedDocuments: null,
  isConfirmedPhoneNumber: true,
  confirmedPhoneNumber: null,
  initialLivePhoto: null,
  currentStep: 0
};

const upload = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SAVING_STATE:
      return { ...state, saving: action.state };

    case SET_SUPPORTED_DOCUMENTS:
      return { ...state, supportedDocuments: action.payload };

    case SET_CONFIRMED_PHONE:
      return { ...state,
        isConfirmedPhoneNumber: action.payload.isConfirmedPhoneNumber,
        confirmedPhoneNumber: action.payload.confirmedPhoneNumber,
      };

    case SET_INITIAL_LIVE_PHOTO:
      return { ...state, initialLivePhoto: action.payload };

    case SET_STEP:
      return { ...state, currentStep: action.payload };

    default:
      return state;
  }
};

export default upload;
