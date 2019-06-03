import React from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { CustomCheckbox } from '../../../components/styled-components/Forms/CustomCheckbox';
import { P } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { userRoles } from 'meteor/populous:constants';

const ConfirmationForm = ({currentUser,confirmationToggle, roleConfirmed, termsConfirmed, setUserTermsConfirmed, className}) => {

  const userRole = currentUser.role === userRoles.investor ? 'Invoice Buyer' : 'Invoice Seller';
  const roleConfirmationText = `I am authorized to act for on behalf of the ${userRole}`;
  const termsConfirmationText = `I have read, understood and agreed, for and on behalf of the ${userRole}, the terms and 
    conditions of this Populous World Ltd. Rules, Terms And Conditions and agree to be bound by them.`;
  const isTermsConfirmed = ()=>{
    return !(roleConfirmed && termsConfirmed);
  }

  return (
    <div className={`m-l-40 p-t-30 m-t-30 ${className}`}>
      <Row>
        <P className={'confirmTitle m-t-10 m-b-20'}>I confirm that:</P>
        <Col sm={12} xs={12} className="m-b-10">
          <CustomCheckbox label={roleConfirmationText} name={'roleConfirmation'}
                          onChange={() => {confirmationToggle('roleConfirmed')}}
                          value={roleConfirmed} checked={roleConfirmed} />
        </Col>
        <Col sm={12} xs={12} className="m-b-10">
          <CustomCheckbox label={termsConfirmationText} name={'termsConfirmation'}
                          onChange={() => {confirmationToggle('termsConfirmed')}}
                          value={termsConfirmed} checked={termsConfirmed} />
        </Col>
      </Row>
      <Row className="text-center">
        <Col md={{ size: '10', offset: '1' }} sm={{ size: '8', offset: '2' }} xs={{ size: '10', offset: '1' }} className='buttonBlock'>
          <PrimaryButton block type="submit" className="next" disabled={isTermsConfirmed()} onClick={setUserTermsConfirmed}>
            Next
          </PrimaryButton>
        </Col>
      </Row>
    </div>
  )
};

export default styled(ConfirmationForm)`

  border-top: solid 2px #e1e5eb;  
  .buttonBlock{
    display: flex;
    justify-content: center;
    
    button{
      max-width: 200px;
    }
  }
  
  p.confirmTitle{
    margin-left: 15px !important;
  }
`;