import React from 'react';
import styled from 'styled-components';
import MetaTags from 'react-meta-tags';

import PublicHeader from '../../components/PublicHeader';
import PublicFooter from '../../components/PublicFooter';
import LandingPage from './pages/LandingPage';

import LoginModal from '../../components/modals/LoginModal';
import RegisterModal from '../../components/modals/RegisterModal';
import PasswordReset from '../../components/modals/PasswordReset';
import QuoteModal from '../../components/modals/QuoteModal';

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginOpened: false,
      signupOpened: false,
      quoteOpened: false,
      forgotPassOpened: false
    }
  }

  openLogin = () => {
    this.setState({
      loginOpened: true,
      signupOpened: false,
      quoteOpened: false,
      forgotPassOpened: false
    })
  }

  toggleLogin = () => {
    this.setState({
      loginOpened: !this.state.loginOpened,
      signupOpened: false,
      quoteOpened: false,
      forgotPassOpened: false
    })
  }

  openSignUp = () => {
    this.setState({
      signupOpened: true,
      loginOpened: false,
      quoteOpened: false,
      forgotPassOpened: false
    })
  }

  toggleSignup = () => {
    this.setState({
      signupOpened: !this.state.signupOpened,
      loginOpened: false,
      quoteOpened: false,
      forgotPassOpened: false
    })
  }

  getQuote = () => {
    this.setState({
      quoteOpened: true,
      signupOpened: false,
      loginOpened: false,
      forgotPassOpened: false
    })
  }

  toggleQuote = () => {
    this.setState({
      quoteOpened: !this.state.quoteOpened,
      signupOpened: false,
      loginOpened: false,
      forgotPassOpened: false
    })
  }

  openForgotPassword = () => {
    this.setState({
      forgotPassOpened: true,
      quoteOpened: false,
      signupOpened: false,
      loginOpened: false
    })
  }

  toggleForgotPassword = () => {
    this.setState({
      forgotPassOpened: !this.state.forgotPassOpened,
      quoteOpened: false,
      signupOpened: false,
      loginOpened: false
    })
  }

  closeAllModals = () => {
    this.setState({
      forgotPassOpened: false,
      quoteOpened: false,
      signupOpened: false,
      loginOpened: false
    })
  }

  render() {
    const { loginOpened, signupOpened, quoteOpened, forgotPassOpened } = this.state

    return (
      <StyledDiv>
        <MetaTags>
          <title>Populous World | Invoice Finance Provider | Factoring and Discounting</title>
          <meta name="description" content="Invoice Finance is a form of funding that instantly unlocks the cash tied up in outstanding sales invoices. Business owners allow invoice buyers to buy invoices at at discounted rate in order to unlock their cash quicker. Once invoices are paid by the invoice debtor, the invoice buyer receives the amount previously agreed upon." />
        </MetaTags>

        <PublicHeader login={this.openLogin} signup={this.openSignUp} getQuote={this.getQuote} />
        <LandingPage openLogin={this.openLogin} openSignUp={this.openSignUp} />
        <PublicFooter />

        <LoginModal
          isOpen={loginOpened}
          toggle={this.toggleLogin}
          openForgotPassword={this.openForgotPassword}
          openSignUp={this.openSignUp}
          closeModal={this.closeAllModals}
          title="Login"
        />

        <RegisterModal
          isOpen={signupOpened}
          toggle={this.toggleSignup}
          title="Register"
          openLogin={this.openLogin}
          closeModal={this.closeAllModals}
        />

        <QuoteModal
          isOpen={quoteOpened}
          toggle={this.toggleQuote}
          title="Get a Quote"
          closeModal={this.closeAllModals}
        />

        <PasswordReset
          open={forgotPassOpened}
          toggle={this.toggleForgotPassword}
          closeModal={this.closeAllModals}
        />
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  @font-face {
    font-family: 'AmTypeWriter';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/american-typewriter/ufonts.com_american-typewriter.eot');
    src: local('AmTypeWriter'),
         url('/fonts/american-typewriter/ufonts.com_american-typewriter.woff2') format('woff2'),
         url('/fonts/american-typewriter/ufonts.com_american-typewriter.woff') format('woff'),
         url('/fonts/american-typewriter/ufonts.com_american-typewriter.ttf') format('truetype'),
         url('/fonts/american-typewriter/ufonts.com_american-typewriter.svg') format('svg');
  }
  
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  overflow-x: hidden;
`

export default Landing;
