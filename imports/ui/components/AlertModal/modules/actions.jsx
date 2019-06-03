import { SHOW_MODAL, HIDE_MODAL } from './';

const requireAlert = (child, options) => {
  return (...args) => {
    return (dispatch, getState) => {

      const dispatchChild = () => {
        if (typeof child === 'function') {
          dispatch(child(...args));
        } else {
          dispatch(child);
        }
      };

      dispatch({
        type: SHOW_MODAL,
        args,
        html: options.html,
        headerText: options.headerText,
        buttonText: options.buttonText,
        onClose: () => {
          dispatch({ type: HIDE_MODAL });
          dispatchChild();
        }
      });
    }
  }
};

export const showAlertModal = (options = {}) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_MODAL,
      html: options.html,
      headerText: options.headerText,
      buttonText: options.buttonText,
      onClose: () => {
        dispatch({ type: HIDE_MODAL });
      }
    });
  };
};

export default requireAlert;
