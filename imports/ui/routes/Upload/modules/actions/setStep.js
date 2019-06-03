import { SET_STEP } from '../';


const setStep = (step) => {
  return (dispatch) => {
    dispatch({type: SET_STEP, payload: step});
  }
};

export {
  setStep
};
