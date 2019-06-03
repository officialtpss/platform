import React, {Fragment} from 'react';

import {Container, Row, Col} from 'reactstrap';
import {statuses} from 'meteor/populous:constants';
import styled from 'styled-components';
import classnames from 'classnames';

import UnverifiedBanner from '../../../components/UnverifiedBanner';
import {H1} from '../../../components/styled-components/Typography';
import Tab from '../../../components/styled-components/Tab';
import InvoiceForm from "../../../components/ProviderInvoiceForms/InvoiceForm";


const CustomTab = styled(Tab)`
  &:disabled {
    background: transparent !important;
    color: ${props => props.theme.colors.primary };
    cursor: not-allowed;
    
    &:hover {
      color: ${props => props.theme.colors.black } !important;
    }
  }
`;

class AddInvoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'market',
    };
  }

  toggleType = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  componentDidMount(){
    this.checkPermissions();
  }

  componentDidUpdate(){
    this.checkPermissions();
  }

  checkPermissions(){
    const {currentUser, history} = this.props;

    if(!currentUser.isProvider()){
      history.push('/');
    }
  }

  render() {
    const {currentUser, history, debtors,invoiceForm, ...props} = this.props;

    if (currentUser.KYCStatus !== statuses.verified) {
      return <UnverifiedBanner status={currentUser.KYCStatus} history={history}/>;
    }

    const isEnabledRecordBlockchain =  currentUser.provider.canRecord;
    const isMarketForm = this.state.activeTab === 'market';

    return (
      <Container>
        <Fragment>
          <Row>
            <Col className="page-title">
              <H1>Add Invoice</H1>
            </Col>
          </Row>
          <Row>
            <Col xs={'12'} lg={'6'} className="tabs walletTab">
              <CustomTab className={classnames('p-l-20', 'p-r-20', {active: this.state.activeTab === 'market'})}
                         onClick={() => {
                           this.toggleType('market')
                         }}>
                Sell on the market
              </CustomTab>
              <CustomTab className={classnames('p-l-20', 'p-r-20', {active: this.state.activeTab === 'blockchain'}, {disabled: !isEnabledRecordBlockchain})}
                         onClick={() => {
                           this.toggleType('blockchain')
                         }}
                         disabled={!isEnabledRecordBlockchain}
              >
                Record on the blockchain
              </CustomTab>
            </Col>
          </Row>
          <InvoiceForm
            currentUser={currentUser}
            debtors={debtors}
            {...invoiceForm}
            {...props}
            isMarketForm={isMarketForm}
            type={this.state.activeTab}
          />
        </Fragment>
      </Container>
    );
  }
}

export default AddInvoice;
