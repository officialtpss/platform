import {Meteor} from 'meteor/meteor';
import React, {Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import moment from 'moment';
import {toastr} from 'react-redux-toastr';
import Sidebar from 'react-sidebar';
import {userRoles, fixtures, statuses} from 'meteor/populous:constants';

import SidebarContent from './SidebarContent';
import Setup2FA from '../../../routes/Setup2FA';
import {SellerInvoices, BuyerInvoices} from '../../../routes/Invoices';
import Invoice from '../../../routes/Invoice';
import Market from '../../../routes/Market';
import AddInvoice from '../../../routes/AddInvoice';
import AddInvoiceProviders from '../../../routes/AddInvoiceProviders';
import Settings from '../../../routes/Settings';
import Terms from '../../../routes/Terms';
import ResetTwoFAKey from '../../../routes/ResetTwoFAKey';
import Upload from '../../../routes/Upload';
import Wallet from '../../../routes/Wallet';
import BorrowerOnlyRoute from '../../../route-helpers/BorrowerOnlyRoute';
import InvestorOnlyRoute from '../../../route-helpers/InvestorOnlyRoute';
import ProviderOnlyRoute from '../../../route-helpers/ProviderOnlyRoute';
import {ConnectedSwitch} from '../../../route-helpers/ConnectedRoute';
import UnverifiedOrDeclinedRoute from '../../../route-helpers/UnverifiedOrDeclinedRoute';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { Page, Content } from '../../../components/styled-components/Divs';
import { P } from '../../../components/styled-components/Typography';
import { history } from '../../../../../imports/store';
import ChangeCountryModal from "../../../components/modals/ChangeCountryModal";

const styles = {
  content: {
    zIndex: 0
  },
};

class PrivateMainApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      idleOpen: false,
      interval: 60,
      intervalId: null,
      activeId: null,
      timeout: 1000 * 60 * 10
    };

    this.slideMenuHandler = this.slideMenuHandler.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.toggleIdleModal = this.toggleIdleModal.bind(this);
    this.onIdle = this.onIdle.bind(this);
    this.timer = this.timer.bind(this);
    this.activeTimer = this.activeTimer.bind(this);
  }

  slideMenuHandler() {
    this.blockScroll(!this.state.open);
    this.setState(
      {open: !this.state.open}
    );
  }

  timer() {
    const val = localStorage.getItem('lastActiveTime') || 1;
    const lastActiveTime = moment(val).utc();
    const currentTime = moment().utc();
    const duration = currentTime.diff(lastActiveTime);
    if (duration < this.state.timeout) {
      this.toggleIdleModal();
      return;
    }
    if (this.state.interval > 0) {
      this.setState({interval: this.state.interval - 1});
    } else {
      this.toggleIdleModal();
      clearInterval(this.state.activeId);
      localStorage.setItem('lastActiveTime', null);
      this.props.logout();
    }
  }

  blockScroll(isSidebarOpen) {
    const body = document.body;
    if (isSidebarOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }

  onSetOpen(open) {
    this.blockScroll(open);
    this.setState({open: open});
  }

  onIdle() {
    const val = localStorage.getItem('lastActiveTime') || 1;
    const lastActiveTime = moment(val).utc();
    const currentTime = moment().utc();
    const duration = currentTime.diff(lastActiveTime);
    if (duration < this.state.timeout) {
      return;
    }
    if (!this.state.idleOpen) {
      this.setState({idleOpen: true});
      const intervalId = setInterval(this.timer, 1000);
      this.setState({intervalId: intervalId});
    }
  }

  toggleIdleModal() {
    this.setState({idleOpen: !this.state.idleOpen});
    this.setState({interval: 60});
    clearInterval(this.state.intervalId);
  }

  activeTimer() {
    if (this.refs.idleTimer) {
      const val = moment(this.refs.idleTimer.getLastActiveTime()).utc();
      localStorage.setItem('lastActiveTime', val);
    }
  }

  componentDidMount() {
    const expireDate = moment(Meteor._localStorage.getItem('Meteor.loginTokenExpires')).utc();
    const currentDate = moment().add(91, 'days').utc();
    if (expireDate > currentDate) {//Disable Idle Timer with Keep me signed in
      this.refs.idleTimer.pause();
    }
    const activeId = setInterval(this.activeTimer, 1000 * 5);
    this.setState({activeId: activeId});
  }

  componentWillMount() {
    const {currentUser} = this.props;
    const val = localStorage.getItem('lastActiveTime') || 1;
    const lastActiveTime = moment(val).utc();
    const currentTime = moment().utc();
    const duration = currentTime.diff(lastActiveTime);
    if (currentUser.isTermsConfirmed && duration > this.state.timeout) {
      toastr.success(
        'Alert',
        'Please login to continue'
      );
      clearInterval(this.state.activeId);
      localStorage.setItem('lastActiveTime', null);
      localStorage.setItem('isNewUser', null);
      this.props.logout();
    }

    this.redirectToKYC();
  }

  redirectToKYC = () => {
    const isNewUser = JSON.parse(localStorage.getItem('isNewUser'));
    const {currentUser} = this.props;
    const getMissingKYCPart = () => {
      let hash = null;
      let page = 1;

      if (!currentUser.firstName) {
        hash = '';
      } else if (!currentUser.idDocumentType) {
        hash = '#kycInfograph';
      } else if (!currentUser.residentalAddressLine1) {
        hash = '#residentalAddress';
      } else if (!currentUser.addressDocumentIds || !currentUser.addressDocumentIds.length) {
        hash = '#addressIdentification';
      } else if (!currentUser.livePhotoIds || !currentUser.livePhotoIds.length) {
        hash = '#livePhoto';
      } else if (currentUser.isInvestor() && currentUser.KYCStatus === statuses.pending) {
        hash = '';
        page = 2;
      } else if (currentUser.isBorrower()) {
        if (!currentUser.companyName) {
          hash = '';
          page = 2;
        } else if (!currentUser.bankStatementDocumentIds || !currentUser.bankStatementDocumentIds.length) {
          hash = '#bankStatements';
          page = 2;
        } else if (!currentUser.preferredCurrency) {
          hash = '';
          page = 3;
        } else if (currentUser.KYCStatus === statuses.pending) {
          hash = '';
          page = 4;
        }
      }

      return {hash, page};
    };

    const {hash, page} = getMissingKYCPart();
    if (currentUser.isTermsConfirmed && !isNewUser && (currentUser.KYCStatus === statuses.unverified || currentUser.KYCStatus === statuses.pending)) {
      if (hash === null) {
        history.push('/settings#profile');
      } else {
        // Redirect user to the place where he left the app at registration
        history.push('/update-profile', {hash, page});
      }
    }
  };

  componentWillUnmount() {
    this.refs.idleTimer.reset();
    this.blockScroll(false);
  }

  render() {
    const sidebar = <SidebarContent isOpen={this.state.open} onSetOpen={this.onSetOpen}
                                    currentUser={this.props.currentUser} logout={this.props.logout}/>;
    const sidebarProps = {
      sidebar: sidebar,
      docked: false,
      rootClassName: 'sidebar-root',
      sidebarClassName: 'custom-sidebar-class',
      contentClassName: 'custom-side-content',
      open: this.state.open,
      touch: true,
      shadow: true,
      pullRight: true,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
      transitions: true,
      onSetOpen: this.onSetOpen,
    };

    // Make sure the user has 2 factor auth setup
    // Disable 2FA for users from fixtures
    const isNewUser = JSON.parse(localStorage.getItem('isNewUser'));
    const isTermsConfirmed = this.props.currentUser.isTermsConfirmed &&
      this.props.currentVersionTermsAndConditions === this.props.currentUser.termsVersionConfirmed;

    return (
      <IdleTimer
        ref="idleTimer"
        element={document}
        idleAction={this.onIdle}
        timeout={this.state.timeout}
        format="YYYY-MM-DDTHH:mm:ssZ">
        <Sidebar {...sidebarProps} styles={styles}>
          <Page className="app">
            <Navigation user={this.props.currentUser} slideMenuHandler={this.slideMenuHandler}
                        currentPage={history.location.pathname}/>

            <Content>
              {/* TO-DO need to remove this for alpha
               <div className="beta-alert text-center">
               <P invert><img src="/img/icons/ico-exclamation.png" height="30"/> <b>DO NOT DEPOSIT REAL PPT!</b> This is a beta version of the Populous platform for testing purposes</P>
               </div>*/}
              <div onClick={() => {
                this.setState({open: false})
              }}>
                <ConnectedSwitch>
                  {!isTermsConfirmed && <Route exact path="*" component={Terms}/>}
                  {isNewUser && <Route exact path="*" component={Setup2FA}/>}

                  <Route exact path="/settings" component={Settings}/>
                  <Route exact path="/terms" component={Terms}/>
                  <Route exact path="/update-profile" component={Upload}/>
                  <Route exact path="/dashboard" component={this.props.dashboard}/>
                  <BorrowerOnlyRoute exact path="/add-invoice" component={AddInvoice}/>
                  <ProviderOnlyRoute exact path="/add-invoices" component={AddInvoiceProviders}/>
                  <Route exact path="/invoices"
                         component={this.props.currentUser.isBorrower() ? SellerInvoices : BuyerInvoices}/>
                  <Route exact path="/invoice/:invoiceId" component={Invoice}/>
                  <InvestorOnlyRoute exact path="/market" component={Market}/>
                  <Route exact path="/wallet" component={Wallet}/>
                  <Route exact path="/settings/reset-2-fa" component={ResetTwoFAKey}/>
                  <Route exact path="/settings/setup-2-fa" component={Setup2FA}/>
                  {/* This route is only accessible to accounts that are unverified */}
                  <UnverifiedOrDeclinedRoute exact path="/upload" component={Upload}/>
                  <Redirect from="*" to="/"/>
                </ConnectedSwitch>
              </div>
            </Content>
            <Footer />
          </Page>
        </Sidebar>
        <Modal isOpen={this.state.idleOpen} toggle={this.toggleIdleModal} className="custom">
          <ModalHeader toggle={this.toggleIdleModal}>Confirm you are here</ModalHeader>
          <ModalBody>
            <P>We have noticed that you are idle for a while. If you are away, <b>your session will end
              in {this.state.interval} seconds.</b></P>
            <P>Are you still here?</P>
            <div className="d-flex justify-content-center align-content-center">
              <PrimaryButton onClick={() => this.toggleIdleModal()}>Yes, I am here</PrimaryButton>
            </div>
          </ModalBody>
        </Modal>
        <ChangeCountryModal/>
      </IdleTimer>
    );
  }
}

export default PrivateMainApp;
