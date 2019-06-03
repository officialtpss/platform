import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {P} from '../../../../components/styled-components/Typography';
import {CustomCheckbox} from '../../../../components/styled-components/Forms/CustomCheckbox';
import {PrimaryButton} from '../../../../components/styled-components/Buttons';

class TermsApprovedForm extends Component {

  componentDidMount() {
    const {currentUser,} = this.props;
    if (currentUser && currentUser.checkTerms() && currentUser.isInvestor()) {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    const {wallet, createAddress, onPptScreenChange} = this.props;

    if (!wallet) {
      createAddress();
    }
    onPptScreenChange('address');
  };

  render() {
    const {toggleTermsApprove, termsApproved,} = this.props;

    return (
      <div>
        <P>You can use your PPT as a collateral to get Pokens.</P>

        <P className="m-b-30">
          Please read and agree to the <br/>
          <Link to="/terms">Terms of PPT use inside the platform .</Link>
        </P>

        <CustomCheckbox label="I have read and agree with the terms." name="agree"
                        onChange={toggleTermsApprove}
                        value={termsApproved}/>

        <div className="text-center m-t-30">
          <PrimaryButton md
                         disabled={!termsApproved}
                         onClick={this.handleSubmit}>
            DISPLAY DEPOSIT ADDRESS
          </PrimaryButton>
        </div>
      </div>
    );
  }
};

export default TermsApprovedForm;
