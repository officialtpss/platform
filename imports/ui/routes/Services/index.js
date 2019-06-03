import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../../components/PublicHeader';
import Footer from '../../components/PublicFooter';
import InvoiceFactoring from './pages/InvoiceFactoring'
import InvoiceFinance from './pages/InvoiceFinance'
import InvoiceDiscounting from './pages/InvoiceDiscounting'
import FinanceInvoices from './pages/FinanceInvoices'
import KnowledgeBase from './pages/KnowledgeBase'

import LoginModal from '../../components/modals/LoginModal';
import RegisterModal from '../../components/modals/RegisterModal';
import PasswordReset from '../../components/modals/PasswordReset';
import QuoteModal from '../../components/modals/QuoteModal';

class Services extends React.Component {
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
        <Header login={this.openLogin} signup={this.openSignUp} getQuote={this.getQuote} />

        <Switch>
          <Route exact path="/services/invoice-factoring" render={() => <InvoiceFactoring />} />
          <Route exact path="/services/invoice-finance" render={() => <InvoiceFinance />} />
          <Route exact path="/services/invoice-discounting" render={() => <InvoiceDiscounting />} />
          <Route exact path="/services/invest" render={() => <FinanceInvoices signup={this.openSignUp}/>} />
          <Route exact path="/services/knowledge-base" render={() => <KnowledgeBase />} />
          <Redirect to="/services/invoice-factoring" />
        </Switch>

        <Footer />

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

export default Services;
