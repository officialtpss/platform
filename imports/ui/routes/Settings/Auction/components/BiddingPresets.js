import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import BiddingPresetsModal from "../../../../components/UserComponents/BiddingPresetsModal";
import {Lead, Small} from "../../../../components/styled-components/Typography";
import {floor} from '../../../../utils/formatter';
import {Col, Row} from "reactstrap";


const initialState = {
  isEditModalOpen: false,
};

export default class BiddingPresets extends React.Component {
  state = {...initialState};
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
  };

  toggleModal = () => {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen,
    })
  };

  render() {
    const {currentUser, currentUser: {settings: {auctions: {bidPresets: {fixedAmounts, step}}}}} = this.props;
    const {isEditModalOpen} = this.state;

    return (
      <Fragment>
        <Lead>
          Bidding presets
        </Lead>
        <div className={'d-flex m-b-20'}>
          <div>
            <Small>
              Fixed amounts
            </Small>
            <Row>
              {
                fixedAmounts
                  .map(
                    (amounts, index) =>
                      (
                        <Col key={index}>
                          {floor(amounts)}
                        </Col>
                      )
                  )
              }
            </Row>
          </div>
          <div className={'p-l-40'}>
            <img src="/img/icons/ico-edit.svg"
                 onClick={this.toggleModal} className={'cursor-pointer'}/>
          </div>
        </div>
        <div>
          <Small>
            Increase-reduce bid step
          </Small>
          <div>
            {floor(step)}
          </div>
        </div>
        <BiddingPresetsModal currentUser={currentUser} isOpen={isEditModalOpen} toggle={this.toggleModal}/>
      </Fragment>
    );
  }
}
