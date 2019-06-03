import React, {Component} from 'react';
import { TabContent, TabPane, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import {userRoles} from 'meteor/populous:constants';

import Tab from '../../components/styled-components/Tab';
import { Small } from '../../components/styled-components/Typography';

import RegistrationForm from './form/index';
import { createUser } from './helpers';


class TabForm extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    // Values comes from Redux Form
    const handleCreateBorrower = values => {
      const {
        email,
        password,
        passwordConfirm,
      } = values;

      createUser(
        email,
        password,
        passwordConfirm,
        userRoles.borrower,
        this.props.history.push
      );
    };

    const handleCreateInvestor = values => {
      const {
        email,
        password,
        passwordConfirm,
      } = values;

      createUser(
        email,
        password,
        passwordConfirm,
        userRoles.investor,
        this.props.history.push
      );
    };

    return (
      <div className="switch-tabs">
        <Row className="m-b-10 tabs">
          <Col xs={'12'} lg={{ size: '6', offset: 3 }} className="text-center">
            <Tab width="45%" className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}>
              <i className="fa fa-check"/> Invoice seller
            </Tab>
            <Tab width="45%" className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}>
              <i className="fa fa-check"/> Invoice buyer
            </Tab>
          </Col>
        </Row>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col xs={'12'} sm={{ size: '10', offset: 1 }} md={{ size: '8', offset: 2 }} lg={{ size: '4', offset: 4 }}>
                <Small className="text-center m-b-10">
                  I want to sell my invoices online to take<br/>
                  control of my cash flow
                </Small>
                <RegistrationForm onSubmit={handleCreateBorrower}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col xs={'12'} sm={{ size: '10', offset: 1 }} md={{ size: '8', offset: 2 }} lg={{ size: '4', offset: 4 }}>
                <Small className="text-center m-b-10">
                  I want to buy invoices and gain returns<br/>
                  on leveraged funds & investment
                </Small>
                <RegistrationForm onSubmit={handleCreateInvestor}/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default withRouter(TabForm);
