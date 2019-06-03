import React from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import PasswordResetForm from './PasswordResetForm';
import {H1} from '../../../components/styled-components/Typography';
import {Block, Page, Content} from '../../../components/styled-components/Divs';
import NavigationLoggedOut from '../../../components/Navigation/NavigationLoggedOut';
import Footer from '../../../components/Footer';

const initialState = {
  passwordType: 'password',
  passwordConfirmType: 'password'
};


class ResetPasswordConfirm extends React.Component {
  state = {...initialState};

  onShowHideClick(field) {
    const state = {};
    state[field] = this.state[field] === 'input' ? 'password' : 'input';
    this.setState(state)
  }

  render() {
    const {passwordType, passwordConfirmType} = this.state;
    const {match} = this.props;

    return (
      <Page>
        <div>
          <NavigationLoggedOut />
          <Content>
            <Container>
              <Row>
                <Col xs={'12'} sm={{size: '10', offset: 1}} lg={{size: '6', offset: 3}}>
                  <Block>
                    <H1 className="text-center m-b-30 text-uppercase">
                      Set new password
                    </H1>
                    <PasswordResetForm {...{ onShowHideClick: (e) => this.onShowHideClick(e),
                      passwordType, passwordConfirmType, match}} />
                  </Block>
                </Col>
              </Row>
            </Container>
          </Content>
          <Footer/>
        </div>
      </Page>
    );
  };
}

export default compose(withRouter)(ResetPasswordConfirm);
