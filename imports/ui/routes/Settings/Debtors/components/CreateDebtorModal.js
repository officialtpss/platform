import React from 'react';
import PropTypes from 'prop-types';
import {toastr} from 'react-redux-toastr';
import {Modal, ModalHeader, ModalBody, FormGroup, Row, Col} from 'reactstrap';
import {Debtor} from 'meteor/populous:api';

import {LABEL, Small} from "../../../../components/styled-components/Typography/index";
import {Input} from "../../../../components/styled-components/Inputs";
import {PrimaryButton} from "../../../../components/styled-components/Buttons";
import {CountrySelect} from "../../../../form-helpers/renderSelectFields";


const initialState = {
  name: '',
  country: '',
  companyNumber: '',
};

class CreateDebtorModal extends React.Component {
  state = {...initialState,};
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  onSubmit = (event) => {
    event.preventDefault();

    if(this.isFormValid()){
      (new Debtor({
        ...this.state
      })).callMethod('create', (error, newDebtor) => {
        if(error){
          return toastr.error('Error!', error.reason);
        }
        newDebtor.callMethod('getZScore');
        this.props.toggle();
      })
    }
  };

  isFormValid(){
    const {name, country, companyNumber} = this.state;

    return (name && country && companyNumber);
  }

  onChange = ({target: {name, value}}) => {
    this.setState({[name]: value});
  };

  resetState = () => {
    this.setState(initialState);
  };

  render() {
    const {toggle, isOpen} = this.props;
    const {name, country, companyNumber} = this.state;
    const isButtonDisabled = !this.isFormValid();

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="custom" onClosed={this.resetState}>
        <ModalHeader toggle={toggle}>Add new debtor</ModalHeader>
        <ModalBody>
          <form onSubmit={this.onSubmit} className={'form'}>
            <FormGroup>
              <LABEL>
                debtor company name
              </LABEL>
              <Input name={'name'}
                     onChange={this.onChange}
                     value={name}
              />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <LABEL>
                    company of registration
                  </LABEL>
                  <CountrySelect
                    style={{
                      height: 42,
                      fontSize: 19,
                    }}
                    name={'country'}
                    onChange={this.onChange}
                    value={country}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <LABEL>
                    company number
                  </LABEL>
                  <Input
                    name={'companyNumber'}
                    onChange={this.onChange}
                    value={companyNumber}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className={'text-center p-t-40 p-b-10'}>
              <PrimaryButton disabled={isButtonDisabled}>
                add debtor
              </PrimaryButton>
            </div>
            <Small className={'text-center'}>
              New debtors go through verification process.
            </Small>
          </form>

        </ModalBody>
      </Modal>
    );
  }
}


export default CreateDebtorModal;
