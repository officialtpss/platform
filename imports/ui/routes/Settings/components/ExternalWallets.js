import React, { Fragment } from 'react';
import { Label, Modal, ModalHeader, ModalBody, Form, Row, Col, FormGroup, Input, Container } from 'reactstrap';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { fixtures } from 'meteor/populous:constants';

import LoadMoreSpinner from '../../../components/LoadMoreSpinner';
import { H3, LABEL,  P } from '../../../components/styled-components/Typography';
import { UnderLineDiv } from '../../../components/styled-components/Divs';
import { InputInvisible } from '../../../components/styled-components/Inputs';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import ModalRestrictedAccess from '../../../components/Requires2FA/components/ModalRestrictedAccess';

class ExternalWallets extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      timeToActivation: '',
      timeToAddressActivation: '',
      externalAddress: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    let externalAddress = '';
    let isNewAddress, timeToActivation;
    let isAddressUpdated = false;
    if (nextProps.externalsAddresses.length) {
      externalAddress = nextProps.selectedAddresses ? nextProps.selectedAddresses : nextProps.externalsAddresses[0];
      isNewAddress = !!externalAddress.newAddress;
      isAddressUpdated = this.state.externalAddress && externalAddress.newAddress!==this.state.externalAddress.newAddress;

      if ((!this.state.timeToAddressActivation && isNewAddress) || isAddressUpdated) {
        timeToActivation = moment(externalAddress.updatedAt).add(48, 'hours');
        this.getLeftUntilActivation(timeToActivation, externalAddress);
      }
    }
  }

  componentDidUpdate() {
    if(this.state.timeToActivation && !this.intervalId) {
      this.intervalId = setInterval(()=>{this.getLeftUntilActivation(this.state.timeToActivation)}, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getLeftUntilActivation = (date, externalAddress = null) => {
    const toDate = moment(date).valueOf();
    const nowDate = moment().valueOf();
    const tempTime = moment.duration(toDate - nowDate);

    if (Math.sign(tempTime) === -1) {
      return 0;
    }

    let days = tempTime.days();
    let hours = days ? (days * 24 + tempTime.hours()) : tempTime.hours();
      hours = hours > 9 ? hours : ('0' + hours);
    let minutes = tempTime.minutes();
      minutes = minutes > 9 ? minutes : ('0' + minutes);
    let seconds = tempTime.seconds();
      seconds = seconds > 9 ? seconds : ('0' + seconds);

    this.setState({
      timeToAddressActivation: `${hours}:${minutes}:${seconds}`,
      timeToActivation: date,
      externalAddress: externalAddress ? externalAddress : this.state.externalAddress
    });

    if (!tempTime.hours() && !tempTime.minutes() && !tempTime.seconds()) {
      this.state.externalAddress.callMethod('confirmationAddress');
    }
  };

  render() {
    const {
      loading, externalsAddresses, selectExternalAddress, removeWalletAddress,
      editWalletAddress, toggleWalletAddressEdit, showWalletAddressEdit, selectedAddresses,
      toggleAddWalletAddress, showAddWalletAddress, addWalletAddress, currentUser
    } = this.props;

    if (loading) {
      return <div className="loader m-t-10"><LoadMoreSpinner /></div>;
    }

    const defaultUsersEmails = Object.values(fixtures.users).map(user => user.email);
    const isNewUser = currentUser && !currentUser.twoFAKey && !defaultUsersEmails.includes(currentUser.emailAddress());

    let externalAddress = '';
    let isNewAddress;
    if (externalsAddresses.length) {
      externalAddress = selectedAddresses ? selectedAddresses : externalsAddresses[0];
      isNewAddress = !!externalAddress.newAddress;
    }

    return (
      <Fragment>
        <H3>External Wallets</H3>
        <Row>
          <Col xs={12} lg={12} xl={4}  className="m-t-30" style={{maxWidth: 260}}>
            { externalsAddresses.length > 0 &&
            <FormGroup>
              <LABEL>Your Ethereum wallets addresses</LABEL>
              <UnderLineDiv>
                <InputInvisible type="select" name="external_address" onChange={(e) => selectExternalAddress(e.target.value)} value={externalAddress._id}>
                  <option value='' hidden disabled>Ethereum wallet address name</option>
                  {
                    externalsAddresses.map((address, i) => (
                      <option value={address._id} key={i}>
                        {address.name}
                      </option>
                    ))
                  }
                </InputInvisible>
              </UnderLineDiv>
            </FormGroup>
            }
            <PrimaryButton onClick={() => toggleAddWalletAddress(true)} md className="m-t-10">+ Add address</PrimaryButton>
          </Col>

          { externalAddress &&
          <Fragment>
            <Col xs={12} lg={9} xl={7} className="m-t-30" style={{marginRight: -40}}>
              <Label className="m-l-15">Address</Label>
              <Col>{externalAddress.address || externalAddress.newAddress}</Col>
              { isNewAddress && !externalAddress.address && 
                <Col className='countdown-color'>
                  Your new address will be available for use after {this.state.timeToAddressActivation}
                </Col>
              }
              { isNewAddress && externalAddress.address && 
                <Col className='countdown-color'>
                  Your wallet address will change to {externalAddress.newAddress} after {this.state.timeToAddressActivation}
                </Col>
              }
            </Col>

            <Col xs={12} lg={3} xl={1} className="m-t-30 d-flex" style={{maxWidth: 120}}>
              <div onClick={() => toggleWalletAddressEdit(true)} className="m-t-30" style={{cursor: 'pointer'}}>
                <img src="/img/icons/ico-edit.svg"/>
              </div>
              <div onClick={() => removeWalletAddress(externalAddress)} className="m-l-20 m-t-30" style={{cursor: 'pointer'}}>
                <img src="/img/icons/ico-trash.svg"/>
              </div>
            </Col>
          </Fragment>
          }
        </Row>

        <Modal isOpen={showWalletAddressEdit} toggle={toggleWalletAddressEdit} className="custom">
          <ModalHeader toggle={() => toggleWalletAddressEdit(false)}>EDIT WALLET ADDRESS</ModalHeader>
          <ModalBody>
            <Form onSubmit={e => {
                    e.preventDefault();
                    const { address, name } = e.target;
                    if (!!address.value) {
                      if ((address.value === externalAddress.address || address.value === externalAddress.newAddress)
                        && name.value === externalAddress.name
                      ) {
                        toastr.error('Error', 'You are trying to save the same data');
                        return;
                      }
                      toggleWalletAddressEdit(false);


                      editWalletAddress(externalAddress, address.value, name.value);
                    } else {
                      toastr.error('Error', 'Wallet address cannot be empty');
                    }
                  }}
              className="form custom"
            >
              <FormGroup>
                <Label for="name">Wallet name</Label>
                <Input name="name" id="name" type="text" defaultValue={externalAddress.name }/>
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input name="address" id="address" type="text" defaultValue={externalAddress.address || externalAddress.newAddress} />
              </FormGroup>

              <div className="d-flex justify-content-center align-content-center">
                <PrimaryButton>Save Changes</PrimaryButton>
              </div>
            </Form>
          </ModalBody>
        </Modal>
        { isNewUser &&
        <ModalRestrictedAccess isOpen={showAddWalletAddress} toggle={toggleAddWalletAddress}/>
        }
        { !isNewUser &&
        <Modal isOpen={showAddWalletAddress} toggle={toggleAddWalletAddress} className="custom">
          <ModalHeader toggle={() => toggleAddWalletAddress(false)}>ADD WALLET ADDRESS</ModalHeader>
          <ModalBody>
            <Form onSubmit={e => {
              e.preventDefault();
              const {newAddress, name} = e.target;
              if (!!name.value && name.value.trim() !== '' && !!newAddress.value) {
                toggleAddWalletAddress(false);
                addWalletAddress(newAddress.value, name.value);
              } else {
                toastr.error('Error', 'Wallet name or address cannot be empty');
              }
            }}
                  className="form custom"
            >
              <FormGroup>
                <Label for="name">Wallet name</Label>
                <Input name="name" id="name" type="text"/>
              </FormGroup>

              <FormGroup>
                <Label for="newAddress">Address</Label>
                <Input name="newAddress" id="newAddress" type="text"/>
              </FormGroup>

              <div className="d-flex justify-content-center align-content-center">
                <PrimaryButton>Add wallet address</PrimaryButton>
              </div>
            </Form>
          </ModalBody>
        </Modal>
        }
      </Fragment>
    );
  }
}

export default ExternalWallets;
