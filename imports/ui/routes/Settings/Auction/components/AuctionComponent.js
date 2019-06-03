import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {H3} from "../../../../components/styled-components/Typography";
import BiddingPresets from "./BiddingPresets";


const AuctionComponent = ({currentUser}) => {

  return(
    <Fragment>
      <H3>Auctions</H3>
      <BiddingPresets currentUser={currentUser}/>
    </Fragment>
  )
};

AuctionComponent.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default AuctionComponent;
