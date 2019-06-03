import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';

import {floor} from "../../utils/formatter";
import DottedValue from "../styled-components/DottedValue";
import {Mute, PrimaryText} from "../styled-components/Typography";
import BiddingPresetsModal from "./BiddingPresetsModal";


const initialState = {
  isEditModalOpen: false,
};

class ClickableBidPresets extends Component {
  state = {...initialState};
  static propTypes = {
    maxAvailbaleAmount: PropTypes.number,
    currentUser: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  toggleModal = () => {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen,
    })
  };

  render() {
    const {onClick, currentUser, maxAvailbaleAmount} = this.props;
    const {isEditModalOpen} = this.state;

    if (!currentUser) {
      return null;
    }

    const {settings: {auctions: {bidPresets: {fixedAmounts,}}}} = currentUser;
    const filteredValues = fixedAmounts.filter((value) => value > 0);

    if (!filteredValues.length) {
      return null;
    }

    return (
      <Fragment>
        <div className={'d-flex align-items-center'}>
          {
            filteredValues
              .map(
                (amount, index) => {

                  const isAmountAboveAvailable = maxAvailbaleAmount < amount;

                  const props = {
                    key: index,
                    className: 'm-r-15',
                  };

                  if (isAmountAboveAvailable) {
                    return (
                      <Mute {...props} fontSize={14}>
                        {floor(amount)}
                      </Mute>
                    );
                  }

                  return (
                    <DottedValue {...props} onClick={() => onClick(amount)} size={14}>
                      <PrimaryText>
                        {floor(amount)}
                      </PrimaryText>
                    </DottedValue>
                  )
                }
              )
          }
          <div>
            <img src="/img/icons/ico-edit.svg" width={20}
                 onClick={this.toggleModal} className={'cursor-pointer'}/>
          </div>
        </div>
        <BiddingPresetsModal currentUser={currentUser} isOpen={isEditModalOpen} toggle={this.toggleModal}/>
      </Fragment>
    );
  }
}

const reduxData = connect(
  state => ({currentUser: state.app.currentUser}),
);


export default reduxData(ClickableBidPresets);
