import { SHOW_MODAL, HIDE_MODAL } from '../';

const requireConfirmation = (child, options) => {
  return (...args) => {
    console.log(args);
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
        args, // set args incase we need them
        text: options.text,
        onSuccess: () => {

          // Run the child thunk
          // (it might be an action creator or a action)
          dispatch({ type: HIDE_MODAL });
          dispatchChild();
        },
        onCancel: () => {

          // Call the provided onCancel function if it exists
          options.onCancel && options.onCancel();
          dispatch({ type: HIDE_MODAL });
        },
      });
    }
  }
};

export default requireConfirmation;
