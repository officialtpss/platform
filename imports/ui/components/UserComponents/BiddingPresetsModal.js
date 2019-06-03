import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {toastr} from 'react-redux-toastr';

import {Modal, ModalHeader, ModalBody, Form, FormGroup, Row, Col} from 'reactstrap';
import {PrimaryButton} from "../styled-components/Buttons";
import {LABEL} from "../styled-components/Typography/index";
import {InputFloat} from "../../form-helpers/InputFloat";


export default class BiddingPresetsModal extends Component {
  state = {
    fixedAmounts: [0, 0, 0,],
    step: 0,
  };
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  initState = () => {
    const {currentUser: {settings: {auctions: {bidPresets: {fixedAmounts, step}}}}} = this.props;

    this.setState({
      fixedAmounts: fixedAmounts,
      step: step,
    });
  };

  onChangeFixedAmount = ({target: {name, value}}) => {
    const newFixedAmounts = [...this.state.fixedAmounts];
    newFixedAmounts[Number(name)] = Number(value);

    this.setState({
      fixedAmounts: newFixedAmounts,
    });
  };

  onChangeStep = ({target: {value}}) => {
    this.setState({
      step: Number(value),
    });
  };

  onSubmit = (event) => {
    const {currentUser, toggle} = this.props;
    const {fixedAmounts, step} = this.state;

    event.preventDefault();

    currentUser.callMethod('updateBidPresets', fixedAmounts, step, (error) => {
      if (error) {
        return toastr.error('Error!', error.reason);
      }

      toggle();
    });
  };

  render() {
    const {isOpen, toggle,} = this.props;
    const {fixedAmounts, step} = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="custom" onOpened={this.initState}>
        <ModalHeader toggle={toggle}>Bidding presets</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={this.onSubmit}
            className="form custom"
          >
            <FormGroup>
              <LABEL>fixed amounts</LABEL>
              <Row>
                <Col sm={4}>
                  <InputFloat name="0" value={fixedAmounts[0]} onChange={this.onChangeFixedAmount}/>
                </Col>
                <Col sm={4}>
                  <InputFloat name="1" value={fixedAmounts[1]} onChange={this.onChangeFixedAmount}/>
                </Col>
                <Col sm={4}>
                  <InputFloat name="2" value={fixedAmounts[2]} onChange={this.onChangeFixedAmount}/>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <LABEL>increase-reduce bid step</LABEL>
              <Row>
                <Col sm={8}>
                  <InputFloat name="0" value={step} onChange={this.onChangeStep}/>
                </Col>
              </Row>
            </FormGroup>
            <div className="text-center">
              <PrimaryButton className="m-t-40">
                save
              </PrimaryButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );
  };
};


