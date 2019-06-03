import React, {Fragment} from 'react';
import {TabContent, TabPane, Card, Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import classnames from 'classnames';

import NotificationBar from '../../../components/NotificationHeader/Notification';
import GeneralSettings from '../containers/GeneralSettings';
import CustomerProfile from '../containers/CustomerProfile';
import BankDetails from '../containers/BankDetails';
import ExternalWallets from '../containers/ExternalWallets';
import Debtors from "../Debtors/DebtorsContainer";
import {H1} from '../../../components/styled-components/Typography';
import {Block} from '../../../components/styled-components/Divs';
import Auction from "../Auction/AuctionContainer";
import KYCStatus from '../helpers/kyc-status';
import {
  TAB_GENERAL_SETTING,
  TAB_CUSTOMER_PROFILE,
  TAB_BANK_DETAIL,
  TAB_EXTERNAL_WALLETS,
  TAB_DEBTORS,
  TAB_AUCTIONS,
} from '../modules';
import '../../../libs/styles/profile.css';

class Settings extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.recheckCurrentTab();
  }

  componentDidMount() {
    this.recheckCurrentTab();
  }

  recheckCurrentTab() {
    const {setActiveTab, currentUser} = this.props;
    const setGeneralTab = () => {
      location.hash = "general";
      setActiveTab(TAB_GENERAL_SETTING);
    };

    switch (location.hash) {
      case "#general":
        setActiveTab(TAB_GENERAL_SETTING);
        break;
      case "#profile":
        setActiveTab(TAB_CUSTOMER_PROFILE);
        break;
      case "#bank-detail":
        setActiveTab(TAB_BANK_DETAIL);
        break;
      case "#debtors":
        if (!currentUser.isBorrower() && !currentUser.isProvider()) {
          setGeneralTab();
          break;
        }
        setActiveTab(TAB_DEBTORS);
        break;
      case "#auctions":
        if (currentUser.isBorrower()) {
          setGeneralTab();
          break;
        }
        setActiveTab(TAB_AUCTIONS);
        break;
      case "#external-wallets":
        if (currentUser.isBorrower()) {
          setGeneralTab();
          break;
        }
        setActiveTab(TAB_EXTERNAL_WALLETS);
        break;
      default:
        setGeneralTab();
    }
  }

  render() {
    const {currentUser, activeTab, setActiveTab} = this.props;
    const kyc = KYCStatus(currentUser.KYCStatus);
    const isNewUser = JSON.parse(localStorage.getItem('isNewUser'));
    return (
      <Fragment>
        {!isNewUser && location.hash !== '#profile' && <NotificationBar />}
        <Container>
          <Row>
            <Col xs="12" className="page-title">
              <H1>
                {currentUser.isInvestor() && 'Investor'}
                {currentUser.isBorrower() && 'Borrower'}'s Account
              </H1>
            </Col>
          </Row>
          <Card className="profile-settings m-b-20">
            <Row>
              <Col xs="12" md="5" lg="4" xl="3">
                <ListGroup>
                  <ListGroupItem className={classnames({active: activeTab === TAB_GENERAL_SETTING})}
                                 onClick={() => {
                                   location.hash = "general";
                                   setActiveTab(TAB_GENERAL_SETTING);
                                 }}>
                    General Settings
                  </ListGroupItem>
                  <ListGroupItem className={classnames({active: activeTab === TAB_CUSTOMER_PROFILE})}
                                 onClick={() => {
                                   location.hash = "profile";
                                   setActiveTab(TAB_CUSTOMER_PROFILE);
                                 }}>
                    Populous Customer Profile
                  </ListGroupItem>
                  <ListGroupItem className={classnames({active: activeTab === TAB_BANK_DETAIL})}
                                 onClick={() => {
                                   location.hash = "bank-detail";
                                   setActiveTab(TAB_BANK_DETAIL);
                                 }}>
                    Bank Details
                  </ListGroupItem>
                  {currentUser.isInvestor() &&
                  <Fragment>
                    <ListGroupItem className={classnames({active: activeTab === TAB_EXTERNAL_WALLETS})}
                                   onClick={() => {
                                     location.hash = "external-wallets";
                                     setActiveTab(TAB_EXTERNAL_WALLETS);
                                   }}>
                      External wallets
                    </ListGroupItem>
                    <ListGroupItem className={classnames({active: activeTab === TAB_AUCTIONS})}
                                   onClick={() => {
                                     location.hash = "auctions";
                                     setActiveTab(TAB_AUCTIONS);
                                   }}>
                      auctions
                    </ListGroupItem>
                  </Fragment>
                  }
                  {(currentUser.isProvider() || currentUser.isBorrower()) &&
                  <ListGroupItem className={classnames({active: activeTab === TAB_DEBTORS})}
                                 onClick={() => {
                                   location.hash = "debtors";
                                   setActiveTab(TAB_DEBTORS);
                                 }}>
                    debtors
                  </ListGroupItem>
                  }
                </ListGroup>
              </Col>
              <Col xs="12" md="7" lg="8" xl="9">
                <Block className="p-l-10">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId={TAB_GENERAL_SETTING}>
                      <GeneralSettings />
                    </TabPane>
                    <TabPane tabId={TAB_CUSTOMER_PROFILE}>
                      <CustomerProfile />
                    </TabPane>
                    <TabPane tabId={TAB_BANK_DETAIL}>
                      <BankDetails />
                    </TabPane>
                    {(currentUser.isProvider() || currentUser.isBorrower()) &&
                    <TabPane tabId={TAB_DEBTORS}>
                      <Debtors/>
                    </TabPane>
                    }
                    {currentUser.isInvestor() &&
                    <Fragment>
                      <TabPane tabId={TAB_EXTERNAL_WALLETS}>
                        <ExternalWallets/>
                      </TabPane>
                      <TabPane tabId={TAB_AUCTIONS}>
                        <Auction/>
                      </TabPane>
                    </Fragment>
                    }
                  </TabContent>
                </Block>
              </Col>
            </Row>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

export default Settings;
