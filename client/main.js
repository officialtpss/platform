import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import '../imports/config/accounts';
import App from '../imports/ui/wrappers/App';
import store, { history } from '../imports/store';
import ScrollToTop from '../imports/ui/route-helpers/ScrollToTop';

// Needs to go here apparently
// https://github.com/airbnb/react-dates/issues/845#issuecomment-345407051
import 'react-dates/initialize';

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
});
