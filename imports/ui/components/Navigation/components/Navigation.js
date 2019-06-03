import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classnames from 'classnames';
import { Notifications } from 'meteor/populous:api';

import {
  NotificationsIcon,
  InvoiceIcon,
  WalletIcon,
  DashboardIcon,
  MarketIcon,
  AddInvoiceIcon,
} from '../../Icons';
import Loading from '../../Spinner/Loading';
import { NotificationMenu } from '../../styled-components/Navigation';
import { Small, Mute, P } from '../../styled-components/Typography';

const BadgeNewNotifications = styled.div`
   position: absolute;
   top: 0;
   right: 5px;
   width: 10px;
   height: 10px;
   border-radius: 10px;
   background-color: ${props => props.theme.colors.blue};
`;


class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPreviousNotification: false
    };
    this.togglePreviousNotification = this.togglePreviousNotification.bind(this);
  }

  togglePreviousNotification() {
    this.setState({ showPreviousNotification: !this.state.showPreviousNotification });
  }

  markAsRead = () => {
    const {isUnreadNotifications} = this.props;

    if (isUnreadNotifications) {
      Meteor.call('notifications.markAsRead');
    }
  };

  render() {
    const { user, notifications, loading, isUnreadNotifications } = this.props;
    const { showPreviousNotification } = this.state;
    const isNewUser = JSON.parse(localStorage.getItem('isNewUser'));
    const isTermsConfirmed = user.isTermsConfirmed;
    const borrowerLinks = () => {
      if (user.isBorrower()) {
        return [
          <NavItem key={"1"} className={ isActive('/add-invoice') ? 'current-page' : ''}>
            <Link className="nav-link icon-link" to="/add-invoice">
            <AddInvoiceIcon color={isActive('/add-invoice') ? '#3c74bb' : 'white'}/>
            <span>Add Invoice</span></Link>
          </NavItem>
        ];
      }
    };

    const providerLinks = () => {
      if (user.isInvestor() && user.isProvider()) {
        return [
          <NavItem key={"0"} className={ isActive('/add-invoices') ? 'current-page' : ''}>
            <Link className="nav-link icon-link" to="/add-invoices">
              <AddInvoiceIcon color={isActive('/add-invoices') ? '#3c74bb' : 'white'}/>
              <span>Add Invoice</span></Link>
          </NavItem>
        ];
      }
    };

    const investorLinks = () => {
      if (user.isInvestor()) {
        return [
          <NavItem key={"1"}  className={ isActive('/market') ? 'current-page' : ''}>
            <Link className="nav-link icon-link" to="/market">
            <MarketIcon color={isActive('/market') ? '#3c74bb' : 'white'}/>
            <span>Market</span></Link>
          </NavItem>
        ];
      }
    };

    const isActive = (route) => {
      return this.props.currentPage === route;
    };

    const getNotificationItem = (id, message, createdAt) => (
      <div key={id} className="d-flex notification-item">
        <div className="line">
          <div className="circle"></div>
        </div>
        <div className="d-flex flex-column m-l-15">
          <P className="m-b-5" dangerouslySetInnerHTML={{__html: message}} />
          <Mute>
            {moment(createdAt).calendar(null, {
              sameDay: '[Today], H:mm a',
              lastDay: '[Yesterday], H:mm a',
              lastWeek: 'DD-MM-YYYY, H:mm a',
              sameElse: 'DD-MM-YYYY, H:mm a'
            })}
          </Mute>
        </div>
      </div>
    );

    const notificationMenu = () => (
      <NotificationMenu>
        { loading
          ?
            <div className="d-flex justify-content-center m-2">
              <Loading />
            </div>
          :
            <Fragment>
              <div className="beta-alert">Notifications functionality is under development</div>
              {!notifications.length
                ?
                  <div className="d-flex justify-content-center flex-column m-2 text-center">
                    <img src="/img/img-no-notifications.svg" className="m-3" />
                    <Small>There is no updates yet.</Small>
                  </div>
                :
                  <Fragment>
                    <div className="d-flex flex-column notification-list">
                      { notifications.slice(0, 3).map((log) => getNotificationItem(log._id, log.message, log.createdAt))}
                    </div>
                    { notifications.length > 3 &&
                    <Fragment>
                      <div className="previous-toggle-container">
                        <div className={classnames('previous-toggle-button', {'open' : showPreviousNotification})} onClick={this.togglePreviousNotification}>
                          <Mute className="previous-toggle">
                            Previous {showPreviousNotification ? (<span>&mdash;</span>) : (<span style={{padding: '0 2.5px'}}>&#43;</span>)}
                          </Mute>
                        </div>
                      </div>
                      <Collapse isOpen={showPreviousNotification} className="notification-list-collapse">
                        <div className="d-flex flex-column notification-list notification-list-previous">
                          { notifications.slice(3).map((log) => getNotificationItem(log._id, log.message, log.createdAt))}
                        </div>
                      </Collapse>
                    </Fragment>
                    }
                  </Fragment>
              }
            </Fragment>
        }
      </NotificationMenu>
    );

    return (
      <div style={{ backgroundColor: '#2b3f5c' }}>
        <Navbar className="header icon-header" color="faded" dark expand="lg">
          <Link className="navbar-brand" to="/">
            <img src="/img/logo.png" alt="Populous" height={33} />
          </Link>
          {!isNewUser &&
          <div className="navbar-collapse navbar-collapse-top">
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar className="nav-item-notification" onClick={this.markAsRead}>
                <DropdownToggle nav className="nav-link icon-link">
                  <NotificationsIcon color="white"/>
                  <span>Notifications</span>
                  {isUnreadNotifications &&
                    <BadgeNewNotifications />
                  }
                </DropdownToggle>
                { notificationMenu() }
              </UncontrolledDropdown>
              <NavItem className="nav-item-hamburger">
                <NavLink className="icon-link hamburger-link"
                  href="#sidemenu"
                  onClick={e => {
                    e.preventDefault();
                    this.props.slideMenuHandler();
                  }}
                >
                  <button type="button" className="hamburger-button">
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          }

          <div className="navbar-collapse navbar-collapse-main">
            <Nav className="ml-auto" navbar>
              {!isNewUser &&
              <Fragment>
                <UncontrolledDropdown nav inNavbar className="nav-item-notification">
                  <DropdownToggle nav className="nav-link icon-link" onClick={this.markAsRead}>
                    <NotificationsIcon color="white"/>
                    <span>Notifications</span>
                    {isUnreadNotifications &&
                      <BadgeNewNotifications />
                    }
                  </DropdownToggle>
                  { notificationMenu() }
                </UncontrolledDropdown>
                { borrowerLinks() }
                { providerLinks() }
                <NavItem className={ isActive('/') ? 'current-page' : ''}>
                  <Link className="nav-link icon-link" to="/">
                    <DashboardIcon color={isActive('/') ? '#3c74bb' : 'white'}/>
                    <span>Dashboard</span></Link>
                </NavItem>
                <NavItem className={ isActive('/invoices') ? 'current-page' : ''}>
                  <Link className="nav-link icon-link" to="/invoices">
                    <InvoiceIcon color={isActive('/invoices') ? '#3c74bb' : 'white'}/>
                    <span>My Invoices</span></Link>
                </NavItem>
                { investorLinks() }
                {
                  user.isInvestor() &&
                  <NavItem className={ isActive('/wallet') ? 'current-page' : ''}>
                    <Link className="nav-link icon-link" to="/wallet">
                      <WalletIcon color={isActive('/wallet') ? '#3c74bb' : 'white'}/>
                      <span>Wallets</span></Link>
                  </NavItem>
                }
              </Fragment>
              }

              {(isTermsConfirmed || (!isTermsConfirmed && !isNewUser) ) &&
                <NavItem className="nav-item-hamburger">
                  <NavLink className="icon-link hamburger-link"
                           href="#sidemenu"
                           onClick={e => {
                             e.preventDefault();
                             this.props.slideMenuHandler();
                           }}
                  >
                    <button type="button" className="hamburger-button">
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </NavLink>
                </NavItem>
              }

            </Nav>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
