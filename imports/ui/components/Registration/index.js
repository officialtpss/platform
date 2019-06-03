import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

import TabForm from './TabForm';
import { H1, Lead, Small, P } from '../../components/styled-components/Typography';
import { PageHeader, PageHeaderBGImg, Page, Content } from '../../components/styled-components/Divs';
import NavigationLoggedOut from '../../components/Navigation/NavigationLoggedOut';
import Footer from '../../components/Footer';

const Registration = props => {
  return (
    <div>
      <Page>
        <NavigationLoggedOut page="registration"/>
        <Content>
          <PageHeader invert center>
            <PageHeaderBGImg src="/img/img@login-banner.png" position="top right" />
            <Row>
              <Col xs={'12'} sm={'12'}>
                <H1 invert>
                  Sign Up for Populous
                </H1>
                <Lead invert className="m-t-20">
                  And join invoice financing industry today
                </Lead>
              </Col>
            </Row>
          </PageHeader>
          <Container>
            <Row>
              <Col className="text-center">
                <Small className="m-t-20 m-b-20">
                  REGISTER AS
                </Small>
              </Col>
            </Row>
            <TabForm />
            <Row>
              <Col className="m-t-15 m-b-30 text-center">
                <Small><a href="/terms" target="_blank">Terms and Conditions</a></Small>
              </Col>
            </Row>
          </Container>
        </Content>
        <Footer />
      </Page>
    </div>
  );
};

export default withRouter(Registration);
