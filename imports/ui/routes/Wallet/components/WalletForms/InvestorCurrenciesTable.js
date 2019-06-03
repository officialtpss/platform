import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import moment from 'moment';

import CurrencyRow from '../currencyRow';
import { LinkButton } from '../../../../components/styled-components/Buttons';
import ExchandePPTModal from '../WalletModals/ExchandePPTModal';
import ExchandeXAUpModal from '../WalletModals/ExchandeXAUpModal';
import ExchangeUSDpModal from '../WalletModals/ExchangeUSDpModal';
import PurchasePokensModal from '../WalletModals/PurchasePokensModal';
import { floor } from '../../../../utils/formatter';
import XaupModal from "../WalletModals/XaupModal";

const HoverTr = styled.tr`
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.darkBlue};
  }
`;

const LightGreyTR = styled.tr`
  background-color: #f3f4f5;
`;

const initialSate = {
  showTooltip: false,
  modal: false,
  pokensView: true,
  fundsType: 'Pokens',
  inCollateral: 0,
  usdExpanded: false,
  showExchandePPTModal: false,
  showExchandeXAUpModal: false,
  showWalletXAUpModal: false,
  showExchandeUSDpModal: false,
  showPurchasePokensModal: false,
};

class CurrenciesTable extends React.Component {
  state = { ...initialSate };

  componentDidMount() {
    this.getInCollateral();
  }

  componentWillReceiveProps(props) {
    //what is this about
      if (this.props.wallet !== undefined && this.props.wallet.availableBalance !== props.wallet.availableBalance) {
        this.getInCollateral();
    }
  }

  toggleModal = (type) => {
    this.setState({
      [type]: !this.state[type]
    });
  };

  getInCollateral = () => {
    const { wallet } = this.props;
    if (wallet) {
      wallet.callMethod('getInCollateral', (err, result) => {
        if (!err) {
          this.setState({ inCollateral: result });
        }
      })
    }
  };

  getTableRow = (title, balance, availableBalance = '-', inCollateral = '-') => {
    const isXaup = title === 'XAUp';
    const isUSD = title === 'USD';
    const isGrey = (title === 'USDC' || title === 'TUSD' || title === 'USDp')
    let TRElement = 'tr'
    if (isUSD || isXaup) {
      TRElement = HoverTr
    } else if (isGrey) {
      TRElement = LightGreyTR
    }

    const { usdExpanded } = this.state;

    const cells = (
      <Fragment>
        <td style={{ 'textAlign': 'center', position: 'relative' }}>
          {isUSD && <i className={usdExpanded ? "fa fa-angle-down" : "fa fa-angle-right"} style={{position: 'absolute', left: '20px', top: '15px'}}/>} {title}
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
      </Fragment>
    );
    return React.createElement(TRElement, {
      ...(isXaup ? { onClick: this.toggleModal.bind(this, 'showWalletXAUpModal') } : {}),
      ...(isUSD ? { onClick: this.toggleModal.bind(this, 'usdExpanded') } : {})
    }, cells);
  };

  render() {
    const { inCollateral, usdExpanded } = this.state;
    const { currencies, currenciesBalance, canExchangeXAUp, wallet = {}, depositLedgerLogs = [] } = this.props;

    const { balance, availableBalance, availableBalanceUSDC = 0, balancePXT, balanceXAU = [], balanceTUSD = 0, balanceUSDC = 0, balanceUSDp = 0 } = wallet;
    const balanceUSD = balanceTUSD + balanceUSDC + balanceUSDp;
    const balanceUSDAvailable = balanceTUSD + availableBalanceUSDC + balanceUSDp;

    return (
      <React.Fragment>
        <Table responsive className='custom m-t-10'>
          <thead>
            <tr>
              <th className="text-center"></th>
              <th>AVAILABLE</th>
              <th>WITHDRAWABLE</th>
              <th>RESERVED</th>
            </tr>
          </thead>

          <tbody>
            {this.props.currencies.length > 0 && currencies.map((item, i) =>
              <CurrencyRow
                key={i}
                currency={item}
                currenciesBalance={currenciesBalance}
                role={'investor'}
              />
            )}
            {this.getTableRow('XAUp', balanceXAU.map(xa => xa.amount).reduce((a, b)  => a + b, 0))}

            {this.getTableRow('USD', balanceUSD, balanceUSDAvailable)}
            {usdExpanded && this.getTableRow('USDC', balanceUSDC, availableBalanceUSDC)}
            {usdExpanded && this.getTableRow('TUSD', balanceTUSD, balanceTUSD)}
            {usdExpanded && this.getTableRow('USDp', balanceUSDp, balanceUSDp)}
          </tbody>
        </Table>

        <div className={'text-right p-t-10 p-b-10'}>
          <LinkButton md className="p-0" onClick={this.toggleModal.bind(this, 'showExchandeXAUpModal')}>
            EXCHANGE USDC / TUSD FOR XAUP
          </LinkButton>
        </div>
        <div style={{ borderTop: 'solid 6px #E1E5EB' }}>
          <Table responsive className='custom m-t-10'>
            <thead>
              <tr>
                <th className="text-center" />
                <th>AVAILABLE</th>
                <th>EXCHANGED</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {this.getTableRow('PPT', availableBalance, inCollateral, balance)}
              {this.getTableRow('PXT', balancePXT, undefined, balancePXT)}
              <tr>
                <td colSpan={4} style={{ 'border': 'none' }}>
                  <LinkButton md className="p-t-0 p-r-0" onClick={this.toggleModal.bind(this, 'showExchandePPTModal')}>
                    Exchange PPT for Pokens
                  </LinkButton>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <ExchandePPTModal
          availablePPT={availableBalance}
          availableUSDC={availableBalanceUSDC}
          currencies={currencies}
          wallet={wallet}
          showExchandePPTModal={this.state.showExchandePPTModal}
          toggleExchandePPTModal={this.toggleModal.bind(this, 'showExchandePPTModal')}
          depositLedgerLogs={depositLedgerLogs}
        />

        <ExchandeXAUpModal
          showExchandeXAUpModal={this.state.showExchandeXAUpModal}
          toggleExchandeXAUpModal={this.toggleModal.bind(this, 'showExchandeXAUpModal')}
          wallet={wallet}
          canExchangeXAUp={canExchangeXAUp}
        />

        <ExchangeUSDpModal
          availableUSDC={balanceUSDC}
          wallet={wallet}
          showExchandeUSDpModal={this.state.showExchandeUSDpModal}
          toggleExchandeUSDpModal={this.toggleModal.bind(this, 'showExchandeUSDpModal')}
        />

        <PurchasePokensModal
          availableUSDp={0}
          wallet={wallet}
          showPurchasePokensModal={this.state.showPurchasePokensModal}
          togglePurchasePokensModal={this.toggleModal.bind(this, 'showPurchasePokensModal')}
        />

        <XaupModal
          isOpen={this.state.showWalletXAUpModal}
          toggle={this.toggleModal.bind(this, 'showWalletXAUpModal')}
          deposited={balanceXAU}
        />
      </React.Fragment>
    );
  }
}

export default CurrenciesTable;
