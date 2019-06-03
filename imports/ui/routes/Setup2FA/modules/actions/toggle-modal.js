// toggle modal
import {
  TOGGLE_MODAL,
} from '../';

const toggleModal = () => {
  return (dispatch, getState) => {
    const {
      setup2FA: { modal },
    } = getState();

    dispatch({ type: TOGGLE_MODAL, modal: !modal });
  };
};

export default toggleModal;
