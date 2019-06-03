import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';
import { Meteor } from 'meteor/meteor';

export const ACCOUNTS_USER_SUBSCRIPTION_READY = 'ACCOUNTS_USER_SUBSCRIPTION_READY';
export const ACCOUNTS_USER_SUBSCRIPTION_CHANGED = 'ACCOUNTS_USER_SUBSCRIPTION_CHANGED';
export const ACCOUNTS_USER_SUB = 'accounts.user';
export const USER_LOGOUT = 'USER_LOGOUT';

const initialState = {
  currentUser: null,
  loading: true,
};

const app = (state = initialState, action) => {
  switch (action.type) {

    case ACCOUNTS_USER_SUBSCRIPTION_READY:
      return {...state, loading: !action.payload.ready};

    case ACCOUNTS_USER_SUBSCRIPTION_CHANGED:
      if(!action.payload[0] || (Meteor.userId() && action.payload[0] && Meteor.userId() == action.payload[0]._id)) {
        Meteor.call('users.checkToken', (err, result) => {
          if (result === false) {
           
            // Meteor.logout(() => {
            //   location.reload();
            // });

            /* DEV Log
             *
             * don't log user out if they have more than 1 login token,
             * they should be asked to verify their new browser or IP
             * 
             */
          }
        });

        return {
          ...state,
          currentUser: action.payload[0]
        };
      }

    case STOP_SUBSCRIPTION:
      if (action.payload === ACCOUNTS_USER_SUB) {
        return {...state, currentUser: null};
      }

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default app;
