import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { Row, Col, TabContent, TabPane, Button, ButtonGroup } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { statuses, repaymentBankDepositDetails, currencySymbols, userRoles } from 'meteor/populous:constants';

import { H2, P, LABEL } from '../../../../components/styled-components/Typography';
import { MCard } from '../../../../components/styled-components/Divs';
import Tab from '../../../../components/styled-components/Tab';
import BankAccountForm from './BankAccountForm';
import InvestorWithdrawForm from './InvestorWithdrawForm';
import PPTForm from './PPTForm';
import TermsApprovedForm from './TermsApprovedForm';
import ExternalForm from './ExternalForm';
import PPTAddress from './PPTAddress';
import ConfirmationModal from '../WalletModals/ConfirmationModal';
import BalanceMismatchModal from '../WalletModals/BalanceMismatchModal';
import {withdrawFunds} from '../../modules/actions';

const initialState = {
  activeTab: '1',
  scrollTab: '1',
  activeScroll: true,
  withdrawCurrency: 'GBP',
  currency: '',
  currencyBank: {from : '', to: ''},
  currencyExternal: '',
  currencyPpt: '',
  depositAmount: 0,
  pptAmount: 0,
  showConfirmationModal: false,
  showBalanceMismatchModal: false,
  createdAddress: false,
  termsApproved: false,
  pptScreen: 'terms',
  fee: 0,
};


class WalletForms extends React.Component {
  state = {...initialState};

  componentDidMount() {
    const {wallet, currentUser, balanceError, getBalanceError } = this.props;

    if (currentUser.role === userRoles.investor) {
      getBalanceError();
      this.setState({
        showBalanceMismatchModal: balanceError ? true : false
      })
    }

    if (wallet && wallet.address) {
      wallet.callMethod('calculateAvailableBalance');
      wallet.callMethod('calculateAvailableBalanceUSDC');
    }

    // Call once, because fee is not changeable
    if(wallet){
      wallet.callMethod('getOperationFee', (error, result)=>{
        if(result){
          this.setState({
            fee: result,
          });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.balanceError !== this.props.balanceError) {
      this.setState({
        showBalanceMismatchModal: nextProps.balanceError ? true : false
      })
    }
  }

  componentWillMount() {
    const {currentUser} = this.props;

    if (!currentUser.isBorrower()) {
      this.setState({
        activeTab: '3'
      });
    }
  }

  onPptScreenChange = (screen) => {
    this.setState({
      pptScreen: screen
    });
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        scrollTab: tab
      });
    }
  };

  toggleScroll = () => {
    const {activeScroll, activeTab, scrollTab} = this.state;
    const {currentUser} = this.props;

    this.setState({
      activeScroll: !activeScroll
    });

    if (!activeScroll && !currentUser.isBorrower() && (activeTab === '1' || activeTab === '2')) {
      this.setState({
        activeTab: '3'
      });
    }

    if (activeScroll && !currentUser.isBorrower()) {
      this.setState({
        activeTab: scrollTab
      });
    }
  };

  onCurrencyChange = (event, variable) => {
    let _update = {};
    const value = event.nativeEvent.target.value;

    if(variable === 'currencyBank'){
      _update[variable] = this.state[variable];
      _update[variable][this.state.activeScroll ? 'from' : 'to'] = value;
    }else {
      _update[variable] = value;
    }
    _update.currency = value;
    this.setState(_update);
  };

  onAmountChange = (event) => {
    this.setState({
      depositAmount: event.nativeEvent.target.value
    });
  };

  onPptAmountChange = (event) => {
    this.setState({
      pptAmount: event.nativeEvent.target.value
    });
  };

  toggleConfirmationModal = (isOpen) => {
    if (isOpen) {
      if (this.state.currency && this.state.depositAmount > 0) {
        this.setState({
          showConfirmationModal: true
        });
      }
    } else {
      this.setState({
        showConfirmationModal: false
      });
    }
  };

  getCurrenciesOption(currencies) {
    let options = [];

    if (currencies && currencies.length) {
      options.push(
        <option key='currency' value='' style={{display: 'none'}}>Select currency</option>
      );
      options = options.concat(currencies.map((el, i) => {
        return <option key={i} value={el.symbol}>{el.title}</option>
      }));
    } else {
      options.push(
        <option key='currency' value='' disabled={true} >No currency</option>
      );
    }

    return options;
  }

  getBankAccountsOption(banks) {
    if (banks && banks.length) {
      return banks.map((el, i) => {
        return (
          <option key={i} value={el._id}>{el.name}</option>
        );
      });
    } else {
      return (
        <option key='bank' value='' disabled={true} >No banks accounts</option>
      );
    }
  }

  handleWithdrawCurrencyChange = (withdrawCurrency) => {
    this.setState({withdrawCurrency})
  }

  toggleTermsApprove =({nativeEvent:{target, target:{checked}}}) => {
    this.setState({
      termsApproved: checked
    });
  };

  render() {
    const { createAddress, wallet, currentUser, canWithdrawPPT, userBanks, externalsAddresses, depositLedgerLogs = [],
      withdrawPokens, className, canWithdrawXAUp, currencies, currenciesBalance, withdrawXAUp } = this.props;
    const {activeScroll, activeTab, currencyBank, pptScreen, fee, showConfirmationModal, currency,
      depositAmount, termsApproved, currencyExternal, withdrawCurrency, showBalanceMismatchModal} = this.state;

    const isBorrower = currentUser.isBorrower();

    if (!currentUser.isVerifiedKyc()) {
      return (
        <MCard className="withdraw-wallet m-t-30 p-30">
          <div className="d-flex">
            <div className="p-r-10">
              <img src="/img/icons/ico-attention@2x.png" height="20"/>
            </div>
            <div className="m-b-20">
              <P>Your customer profile data have not yet been verified.<br/>
              Please <Link to={'/upload'}>verify</Link> your account in order to deposit and withdraw PPT.</P>
            </div>
            {showBalanceMismatchModal &&
              <BalanceMismatchModal {...{showBalanceMismatchModal, referenceNumber: currentUser._id}} />
            }
          </div>
        </MCard>
      );
    }

    return (
      <MCard className={`withdraw-wallet m-t-30 ${className}`}>
        <Row>
          <Col xs={12}>
            <div className="card-header d-flex">
              <img src={activeScroll?'/img/icons/deposit.png':'/img/icons/withdraw.png'} height={25} />
              <H2 className="m-l-20 m-b-0 title-main">
                { activeScroll ? 'DEPOSIT' : 'WITHDRAW' }
              </H2>
              {!activeScroll && currency === 'GBP' &&
              <ButtonGroup className="currency-selector">
                <Button color="primary" size="sm" onClick={() => this.handleWithdrawCurrencyChange('GBP')} active={withdrawCurrency === 'GBP'} outline>GBP</Button>
                <Button color="primary" size="sm" onClick={() => this.handleWithdrawCurrencyChange('USD')} active={withdrawCurrency === 'USD'} outline>USD</Button>
              </ButtonGroup>
              }
              <a href="javascript:;" className="card-right-icon" onClick={() => { this.toggleScroll() }}>
                <img src={activeScroll?'/img/icons/deposit-down.png':'/img/icons/withdraw-up.png'} height={25} />
              </a>
            </div>
          </Col>
        </Row>

        <Row className="card-body">
          { currentUser.KYCStatus !== statuses.verified &&
          <Col xs={12}>
            <div className="d-flex align-items-center m-b-20">
              <img src="/img/icons/ico-attention@2x.png" width="24" />
              <P className="m-0 m-l-10">
                Your customer profile data have not yet been verified.
                You will be able to make deposits after your profile have been verified and confirmed to be acceptable.
              </P>
            </div>
          </Col>
          }

          <Col xs={12} className="tabs walletTab">
            <div className="d-flex align-items-stretch">
              { isBorrower &&
              <div style={{paddingLeft: 0, paddingRight: 0, size: 16}}>
                Bank account
              </div>
              }

              {/* { (!isBorrower && activeScroll) &&
              <div style={{paddingLeft: 0, paddingRight: 0, size: 16}}>
                PPT, Pokens, and ETH
              </div>
              } */}

              { (!isBorrower && !activeScroll && false) &&
              <Fragment>
                {/* <Tab width={"32.5%"} size={'16px'}
                  className={classnames({active: activeTab === '1'})}
                  style={{paddingLeft: 0, paddingRight: 0}}
                  onClick={() => { this.toggle('1'); }}>
                  Bank account
                </Tab>

                <Tab width={"35%"} size={'16px'}
                  style={{margin: '0px -2px'}}
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}>
                  {activeScroll ? 'PPT & Pokens' : 'PPT'}
                </Tab>

                <Tab width={"32.5%"} size={'16px'}
                  style={{paddingLeft: 0, paddingRight: 0}}
                  className={classnames({active: activeTab === '2'})}
                  onClick={() => { this.toggle('2'); }}>
                  Pokens
                </Tab> */}
              </Fragment>
              }
            </div>
            { (!isBorrower && !activeScroll) &&
                <InvestorWithdrawForm {...{wallet, activeScroll, currencies, userBanks, currenciesBalance, fee, isBorrower,
                  currentCurrency: currencyBank[activeScroll ? 'from' : 'to'],
                  onCurrencyChange: (e) => this.onCurrencyChange(e, 'currencyBank'),
                  onAmountChange: this.onAmountChange,
                  toggleConfirmationModal: this.toggleConfirmationModal,
                  withdrawFunds: this.props.withdrawFunds,
                  externalsAddresses,
                  withdrawCurrency
                }} />
              }
          </Col>

          <Col xs={12} className="p-t-20">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
               { isBorrower &&
                  <BankAccountForm {...{wallet, activeScroll, currencies, userBanks, currenciesBalance, fee, depositAmount, isBorrower,
                    currentCurrency: currencyBank[activeScroll ? 'from' : 'to'],
                    getCurrenciesOption: this.getCurrenciesOption,
                    onCurrencyChange: (e) => this.onCurrencyChange(e, 'currencyBank'),
                    onAmountChange: this.onAmountChange,
                    toggleConfirmationModal: this.toggleConfirmationModal,
                    getBankAccountsOption: this.getBankAccountsOption,
                    withdrawFunds: this.props.withdrawFunds
                  }} />
                }
              </TabPane>

              <TabPane tabId="3">
                { activeScroll && pptScreen === 'terms' &&
                <TermsApprovedForm {...{currentUser, wallet, createAddress, termsApproved,
                  toggleTermsApprove: this.toggleTermsApprove, onPptScreenChange: this.onPptScreenChange
                }} />
                }

                { pptScreen === 'address' && activeScroll &&
                <PPTAddress
                  wallet={wallet}
                  isBorrower={isBorrower}
                  onPptScreenChange={this.onPptScreenChange}
                />
                }

                { !activeScroll &&
                // WITHDRAW
                <PPTForm {...{wallet, externalsAddresses, canWithdrawPPT, fee,
                  withdrawPPT: this.props.withdrawPPT
                }} />
                }
              </TabPane>

              <TabPane tabId="2">
                <ExternalForm {...{canWithdrawXAUp, wallet, isBorrower, activeScroll, currencies, currenciesBalance,
                  getCurrenciesOption: this.getCurrenciesOption,
                  onCurrencyChange: (e) => this.onCurrencyChange(e, 'currencyExternal'),
                  currentCurrency: currencyExternal,
                  externalsAddresses, withdrawPokens, hasCollatirized: !!depositLedgerLogs.length, fee, withdrawXAUp
                }} />
              </TabPane>
            </TabContent>
          </Col>
        </Row>

        <ConfirmationModal {...{showConfirmationModal, currency, depositAmount, currentUser,
          toggleConfirmationModal: this.toggleConfirmationModal,
          fullName: this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName,
          companyName: this.props.currentUser.companyName
        }} />
        {showBalanceMismatchModal &&
          <BalanceMismatchModal {...{showBalanceMismatchModal, referenceNumber: currentUser._id}} />
        }
      </MCard>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  withdrawFunds: () => {
    dispatch(withdrawFunds());
  }
});

const styledWallet = styled(WalletForms)`
  .feeValue{
    font-weight: 600;
  }
`;

export default connect(null, mapDispatchToProps)(styledWallet);
