import React, { Fragment } from 'react';
import styled from 'styled-components';
import { CardBody, Table, Row, Tooltip, UncontrolledTooltip } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom'

import { Card, CardTitle } from '../../../../components/styled-components/Card';
import Tab from '../../../../components/styled-components/Tab';
import QuestionMarkIcon from '../../../../components/Icons/QuestionMark';
import { floor } from '../../../../utils/formatter';
import XaupModal from "../../../Wallet/components/WalletModals/XaupModal";
const HoverTr = styled.tr`
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.darkBlue};
  }
`;

class FundsWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
      showWalletXAUpModal: false
    };
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  toggleTooltip = () => {
    this.setState({
      showTooltip: !this.state.showTooltip,
    })
  };

  toggleModal = (type) => {
    this.setState({
      [type]: !this.state[type]
    });
  };

  tableRender = (walletFunds)=>{

    return walletFunds.map(({title, userBalance: amount = 0, inEscrow = 0, userInterest: interestAmount = 0} , i) => {
      const total = +amount + inEscrow + interestAmount;

      return <tr key={i}>
        <td className="text-center">
          {title}
          </td>
        <td className={'p-l-10'}>
           { floor(amount) }
        </td>
        <td className={'p-l-10'}>
           { floor(interestAmount) }
        </td>
        <td className={'p-l-10'}>
           { floor(inEscrow) }
        </td>
        <td className={'total-value p-l-10'}>
           { floor(total) }
        </td>
      </tr>;
    });
  };

  getTableRow = (title, balance, availableBalance = '-', inCollateral = '-') => {
    const isXaup = title === 'XAUp';

    const cells = (
      <Fragment>
        <td style={{ 'textAlign': 'center', }}>
          {title}
        </td>
        <td style={{ 'borderRight': '0' }}>
          <div>
            {balance? floor(balance) : '-'}
          </div>
        </td>
        <td style={{ 'borderRight': '0' }}>
          <div>
            {availableBalance === '-' ? availableBalance : floor(availableBalance)}
          </div>
        </td>
        <td style={{ 'borderRight': '0' }}>
          <div>
            {inCollateral === '-' ? inCollateral : floor(inCollateral)}
          </div>
        </td>
        <td style={{ 'borderRight': '0' }}>
          <div>
            {balance? floor(balance) : '-'}
          </div>
        </td>
      </Fragment>
    );
    return React.createElement((isXaup ? HoverTr : 'tr'), {
      ...(isXaup ? { onClick: this.toggleModal.bind(this, 'showWalletXAUpModal') } : {})
    }, cells);
  };

  render() {
    const {isEmpty, fundsType, walletFunds, fundsSumInGbp, currentWallet, wallet = {}} = this.props;
    const { balanceXAU = [] } = wallet;
    return (
      <Card className="funds">
        <CardBody>
          <CardTitle className="card-title-bold m-b-0">
            Funds
          </CardTitle>
          <Table responsive className={'funds-table ' + (isEmpty && 'empty')}>
            <thead>
            <tr>
              <th/>
              <th>AVAILABLE</th>
              <th>INTEREST</th>
              <th className="d-flex justify-content-end align-items-center">
                IN ESCROW
                <span id="escrowTooltip">
                  <QuestionMarkIcon />
                </span>
                <Tooltip
                  className="tooltip-custom"
                  placement="top-start"
                  target="escrowTooltip"
                  isOpen={this.state.showTooltip}
                  toggle={this.toggleTooltip}
                  autohide={false}
                >
                  Funds in active crowdsales
                </Tooltip>
              </th>
              <th className={'total-value'} >TOTAL</th>
            </tr>
            </thead>
            {isEmpty
              ? <tbody>
              <tr>
                <td>{fundsType}</td>
                <td/>
                <td/>
                <td/>
              </tr>
              </tbody>
              : <tbody>
              <tr className={'border_bottom'}>
                <td className="text-center" >{currentWallet.title}</td>
                <td>
                  <span className={'approximately-sign'}>&asymp;</span>
                  {floor(fundsSumInGbp.balance)}
                </td>
                <td>
                  <span className={'approximately-sign'}>&asymp;</span>
                  {floor(fundsSumInGbp.interestAmount)}
                </td>
                <td>
                  <span className={'approximately-sign'}>&asymp;</span>
                  {floor(fundsSumInGbp.inEscrow)}
                </td>
                <td className={'total-value'}>
                  <span className={'approximately-sign'}>&asymp;</span>
                  {floor(fundsSumInGbp.balance+fundsSumInGbp.inEscrow + fundsSumInGbp.interestAmount)}
                </td>
              </tr>
              { this.tableRender(walletFunds, fundsType) }
              {this.getTableRow('XAUp', balanceXAU.map(xa => xa.amount).reduce((a, b)  => a + b, 0))}
              </tbody>}
          </Table>
          {isEmpty && <p className="text-center" style={{color: '#A5ACB5'}}>
            You don't have funds yet  <Link to="/wallet">Use wallets page to deposit</Link>
          </p>}
        </CardBody>
        <XaupModal
          isOpen={this.state.showWalletXAUpModal}
          toggle={this.toggleModal.bind(this, 'showWalletXAUpModal')}
          deposited={balanceXAU}
        />
      </Card>
    )
  }
};

export default FundsWidget;
