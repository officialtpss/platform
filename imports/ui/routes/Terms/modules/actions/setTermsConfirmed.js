import {toastr} from "react-redux-toastr";
import {ACCOUNTS_USER_SUBSCRIPTION_CHANGED} from "../../../../wrappers/PrivateApp/modules";
import {push} from "react-router-redux";

const setTermsConfirmed = () => {
  return (dispatch, getState) => {
    const { currentUser } = getState().app;

    currentUser.confirmTerms(null, (err, user) => {
      if (err) {
        toastr.error('Error while set terms confirmed', err.reason);
      } else {
        // Update the user
        dispatch({ type: ACCOUNTS_USER_SUBSCRIPTION_CHANGED, payload: [user] });

        // Redirect to 2FA setup
        //localStorage.setItem('isNewUser', true);
        dispatch(push('/'));
      }
    });

  }
};

export default setTermsConfirmed;