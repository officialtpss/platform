import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import TwoFAKeyResetForm from './TwoFAKeyResetForm';
import { H3, P } from '../../../components/styled-components/Typography';
import { Page, Content } from '../../../components/styled-components/Divs';
import NavigationLoggedOut from '../../../components/Navigation/NavigationLoggedOut';
import Navigation from '../../../components/Navigation/NavigationEmpty';
import Footer from '../../../components/Footer';

const ResetTwoFAKey = (props) => {

  return (
    <Page className="reset-page">
      {!props.currentUser && <NavigationLoggedOut />}
      <Content>
        <Container>
          <Row>
            <Col>
              <H3 className="m-t-60">Confirm your request for 2fa reset</H3>
              <P className="m-t-20">
                Take a high quality photo of yourself holding your ID document and a handwritten note
              </P>
              <P style={{fontStyle: 'italic'}}>
                "[current date] for Populous only"
              </P>
              <TwoFAKeyResetForm {...props} />
            </Col>
          </Row>
        </Container>
      </Content>
      {!props.currentUser && <Footer /> }
    </Page>
  );
}

export default ResetTwoFAKey;
