import { Meteor } from 'meteor/meteor';
import { SET_SUPPORTED_DOCUMENTS } from '../';


const getSupportedDocuments = (countryCode) => {
  return (dispatch, getState) => {
    const { currentUser } = getState().app;
    dispatch({ type: SET_SUPPORTED_DOCUMENTS, payload: null });

    currentUser.callMethod('getSupportedDocuments', countryCode, (err, listDocuments) => {
      if (listDocuments) {
        dispatch({ type: SET_SUPPORTED_DOCUMENTS, payload: listDocuments });
      }
    });
  }
};

export default getSupportedDocuments;
