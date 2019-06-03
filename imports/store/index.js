import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { Tracker } from 'meteor/tracker';
import createReactiveMiddlewares from 'meteor-redux-middlewares';

import rootReducer from './reducers';

const history = createHistory();

const router = routerMiddleware(history);

const { sources,  subscriptions, } = createReactiveMiddlewares(Tracker);

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,

    // logger must be last
    compose(applyMiddleware(sources, subscriptions, thunk, router, logger))
  );

  //
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store;
};

const store = configureStore();
export default store;
export { history };
