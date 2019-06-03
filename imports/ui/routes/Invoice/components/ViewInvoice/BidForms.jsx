import React, {Fragment} from 'react';
import {Col, Row} from 'reactstrap';

import {H2, Small} from '../../../../components/styled-components/Typography/index';
import {Card} from '../../../../components/styled-components/Card/index';
import IndividuallyBidForm from './IndividuallyBidForm';
import GroupBidForm from './GroupBidForm';

const initialState = {
  activeTab: '1',
  anonymousGroupBid: false,
  anonymousBid: false,
  openGroupBidForm: false
};


class BidForms extends React.Component {
  state = {...initialState};

  componentWillMount() {
    // Set openForms: false - if the user has got pending bids on this crowdsale
  }

  handleAnonymousChecked = (type) => {
    if (type === 'group') {
      this.setState({
        anonymousGroupBid: !this.state.anonymousGroupBid
      });
    } else {
      this.setState({
        anonymousBid: !this.state.anonymousBid
      });
    }
  };

  handleChangeForm = (checked) => {
    this.setState({
      openGroupBidForm: checked
    });
  };

  render() {
    const {currentUser, ledgerBalance, blocked} =this.props;

    return (
      <Row className="m-t-40">
        <Col xs="12" xl={{size: 10, offset: 1}}>
          <Fragment>
            <H2 className="m-b-20 text-center">Place your bid</H2>
            <Card>
              {this.state.openGroupBidForm
                ?
                <GroupBidForm
                  anonymousBid={this.state.anonymousGroupBid}
                  handleAnonymousChecked={this.handleAnonymousChecked.bind(this, 'group')}
                  handleChangeForm={this.handleChangeForm}
                  initialValues={{
                    invoice: this.props.invoice,
                    amount: 0,
                  }}
                  blocked={blocked}
                  currentUser={currentUser}
                  maxAvailableAmount={ledgerBalance.amount}
                />
                :
                <IndividuallyBidForm
                  anonymousBid={this.state.anonymousBid}
                  handleAnonymousChecked={this.handleAnonymousChecked.bind(this, 'individually')}
                  handleChangeForm={this.handleChangeForm}
                  initialValues={{
                    invoice: this.props.invoice,
                    amount: 0,
                    goal: 0,
                    groupName: '',
                  }}
                  blocked={blocked}
                  currentUser={currentUser}
                  maxAvailableAmount={ledgerBalance.amount}
                />
              }
              <Col xs="12" md="12">
                <div className="d-flex justify-content-center m-b-10">
                  <div className="p-r-10">
                    <img src="/img/icons/ico-info.png" />
                  </div>
                  <div className="m-b-20">
                    <Small className="text-left">
                      All bids are final and cannot be undone in line with our <a href="#">bidding policies</a>.<br/>
                      If you have any issues bidding please contact <a href="#">support</a>.
                    </Small>
                  </div>
                </div>
              </Col>
            </Card>
          </Fragment>
        </Col>
      </Row>
    );
  }
}

export default BidForms;
