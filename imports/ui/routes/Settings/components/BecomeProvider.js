import React, {Fragment} from 'react';
import {toastr} from 'react-redux-toastr';
import {fixtures} from 'meteor/populous:constants';

import {H3, LABEL, Mute, P, Small} from '../../../components/styled-components/Typography';
import {PrimaryButton} from '../../../components/styled-components/Buttons';
import {Col, FormGroup, Input, Row} from "reactstrap";
import {StyledInput} from "../../../components/styled-components/Inputs";
import {KYCProvideStatus, KYCVerifyStatus} from "./kycHelpers";
import checkTableValue from "./checkTableValue";

const initialState = {
  companyName: '',
  companyNumber: '',
};

class BecomeProvider extends React.Component {

  state = {
    ...initialState,
  };

  onFormFieldChange = ({target: {name, value}}) => {
    this.setState({[name]: value});
  };

  isSubmitPossible() {
    const {user} = this.props;

    return user.isSubmitProviderRequestPossible(this.state);
  }

  onSubmit = () => {

    if (!this.isSubmitPossible()) {
      return;
    }

    const {user} = this.props;
    const {companyName, companyNumber} = this.state;

    user.callMethod('becomeProviderRequest', {
      companyName,
      companyNumber,
    }, (error) => {
      if (error) {
        toastr.error('', error.reason);
      }
    })
  }

  render() {
    const {user} = this.props;
    const {companyName, companyNumber} = this.state;
    return (
      <Fragment>
        <H3 className={'m-b-20'}>Become a provider</H3>
        <P>
          If you are an Invoice Discounting company, you have an opportunity to sell and buy invoices on the Populous
          market on behalf of your clients.
        </P>
        <P>
          Populous platform also allows to record invoices that were processed at another marketplace to the blockchain.
        </P>
        <P>
          Please send any questions to <a href={'mailto:info@populous.co'}>info@populous.co</a>.
        </P>
        {(!user.companyName || !user.companyNumber)
         ? <div style={{width: '100%', maxWidth: 400,}}>
          <P>
            Complete the form below and submit your request.
          </P>
          <FormGroup className={'m-b-40'}>
            <LABEL>
              company name
            </LABEL>
            <StyledInput
              name="companyName"
              type="text"
              value={companyName}
              onChange={this.onFormFieldChange}
            />
          </FormGroup>
          <FormGroup className={'m-b-40'}>
            <LABEL>
              company number
            </LABEL>
            <StyledInput
              name="companyNumber"
              type="text"
              value={companyNumber}
              onChange={this.onFormFieldChange}
            />
          </FormGroup>
        </div>
          :<Row className="table-row m-0 m-b-20">
            <Col xs={12} sm={6} className="col-border-top">
              <LABEL>Company Name</LABEL>
              <P>
                {user.companyName}
              </P>
            </Col>
            <Col xs={12} sm={6} className="col-border-top col-sep">
              <LABEL>Company Number</LABEL>
              <P>
                {user.companyNumber}
              </P>
            </Col>
          </Row>
        }

        <div>
          <LABEL>
            profile data status
          </LABEL>
          <div className={'d-flex m-b-20'}>
            <div className={'m-r-40'}>
              <KYCProvideStatus user={user}/>
            </div>
            <div>
              <KYCVerifyStatus user={user}/>
            </div>
          </div>
          <Mute>
            You should provide your data and it should be verified before submitting this request.
          </Mute>
        </div>

        <div className={'m-t-30'}>
          <PrimaryButton onClick={this.onSubmit} disabled={!this.isSubmitPossible()}>
            become a provider
          </PrimaryButton>
        </div>
      </Fragment>
    );
  }
}

export default BecomeProvider;
