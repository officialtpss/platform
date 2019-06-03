import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTracker } from 'meteor/react-meteor-data';

import AuctionComponent from "./components/AuctionComponent";


const reduxData = connect(
  state => ({ currentUser: state.app.currentUser }),
);

const meteorData = withTracker((state) => {
    return {
  };
});

export default compose(reduxData, meteorData)(AuctionComponent);
