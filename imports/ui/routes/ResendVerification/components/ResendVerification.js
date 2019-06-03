import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import ResendVerificationForm from '../containers/ResendVerificationFormContainer';
import { H1 } from '../../../components/styled-components/Typography';
import { Block, Page, Content } from '../../../components/styled-components/Divs';
import NavigationLoggedOut from '../../../components/Navigation/NavigationLoggedOut';
import Footer from '../../../components/Footer';

const ResendVerification = () => (
  <Page>
    <div>
      <NavigationLoggedOut />
      <Content>
        <Container>
          <Row>
            <Col xs={'12'} sm={{size: '10', offset: 1}} lg={{size: '6', offset: 3}}>
              <Block>
                <H1 className="text-center m-b-30 text-uppercase">
                  Resend a verification email
                </H1>
                <ResendVerificationForm />
              </Block>
            </Col>
          </Row>
        </Container>
      </Content>
      <Footer/>
    </div>
  </Page>
);

export default ResendVerification;
