import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { statuses } from 'meteor/populous:constants';
import { H1 } from '../styled-components/Typography';
import { PrimaryButton, LinkButton } from '../styled-components/Buttons';

const UnverifiedBanner = ({ status, history, isNewUser }) => {
  const redirectToSetup2FA = () => {
    localStorage.setItem('isNewUser', true);
    history.push('/');
  };
  const setup2FALink = isNewUser ?
    <p className="lead m-0" key="2">
      <LinkButton onClick={redirectToSetup2FA}>Setup 2-factor authentication</LinkButton>
    </p> : '';

  // default is unverified
  let body = [
    <p key="0">To be allowed to upload and sell invoices please</p>,
    <p className="lead m-0" key="1">
      <LinkButton onClick={()=>{history.push('/upload')}} className="p-b-10">
        <div>Complete Populous customer profile</div>
        <div className="m-t-5">and become a verified customer</div>
      </LinkButton>
    </p>,
  ];

  if (status === statuses.declined) {
    body = [
      <p key="0">Your account verification was declined by our admins.</p>,
      <p key="1">Please click the button below to read why and submit a new application.</p>,
      <p className="lead m-t-40" key="2">
        <PrimaryButton outline onClick={()=>{history.push('/upload/declined')}}>View rejection notice</PrimaryButton>
      </p>
    ];
  } else if (status === statuses.pending) {
    statusString = '';
    body = [
      <p key="0">Your account verification is under review.</p>,
      <p key="1">We'll email you shortly with the result of your application.</p>
    ];
  }

  body.push(setup2FALink);

  return (
    <Container>
      <Row>
        <Col xs={'12'} className="page-title">
          <H1>
            Add Invoice
          </H1>
        </Col>
        <Col xs={'12'} className="text-center">
          <div className="text-center m-t-50">
            <img src="/img/no-profile-completed.png" alt="No results" />
          </div>
          { body }
        </Col>
      </Row>
    </Container>
  );
};

export default UnverifiedBanner;
