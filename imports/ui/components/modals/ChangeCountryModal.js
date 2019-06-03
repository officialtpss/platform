import React from 'react';
import {countries} from 'meteor/populous:constants'
import { toastr } from 'react-redux-toastr';

import {Modal, ModalHeader, ModalBody,} from 'reactstrap';
import {renderCountrySelector as RenderCountrySelector} from "../../form-helpers/renderSelectFields";
import {PrimaryButton} from "../styled-components/Buttons";
import {connect} from "react-redux";


const initialState = {
  country: ''
};

class ChangeCountryModal extends React.Component {
  state = {...initialState};

  onCountryChange = ({target:{value}}) => {
    this.setState({country: value})
  };

  onSubmit = (event) => {
    event.preventDefault();
    const {currentUser} = this.props;
    const {country} = this.state;
    
    currentUser.callMethod('updateUnsupportedCountry', country, (error) => {
      if(error){
        return toastr.error('Error!', error.message);
      }
    })
  };

  render() {
    const {currentUser} = this.props;
    const {country} = this.state;

    if(!currentUser || (currentUser && (!currentUser.hasUnsupportedCountry() || currentUser.isVerifiedKyc()))){
      return null
    }

    return (
      <Modal isOpen={true} className="custom">
        <ModalHeader>COUNTRY UPDATE</ModalHeader>
        <ModalBody>
          <div style={{fontSize: '16px'}}>
            We have made some updates and have to ask you to update your country selection. Please select your country
            from the list.
          </div>
          <form className={'form'} onSubmit={this.onSubmit}>
            <div className={'m-t-30 m-b-30'}>
              <RenderCountrySelector
                value={country}
                onChange={this.onCountryChange}
              />
            </div>
            <div className={'text-center'}>
              <PrimaryButton>
                save changes
              </PrimaryButton>
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default connect(({app:{currentUser}}) => ({currentUser}))(ChangeCountryModal);
