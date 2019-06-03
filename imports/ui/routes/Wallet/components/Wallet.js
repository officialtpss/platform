import React, { Fragment } from 'react';
import { Container, Alert, Row, Col } from 'reactstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Currency } from 'meteor/populous:api';
import InfiniteScroll from 'react-infinite-scroller';

import AlertModal from '../../../components/AlertModal';
import LoadMoreSpinner from '../../../components/LoadMoreSpinner';
import { H1, H2, P, Small } from '../../../components/styled-components/Typography';
import TransactionFilterForm from './TransactionFilterForm';
import TransactionCard from './TransactionCard';
import CurrencyForm from './CurrencyForm';
import WalletForms from './WalletForms/WalletForms';
import NotificationBar from '../../../components/NotificationHeader/Notification';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /* TO-DO need to remove this for alpha */
    /*const html = `<div class="text-center text-uppercase m-b-20" style="font-size: 19px;">
        <img src="/img/icons/ico-attention.svg" height="20" /> Do not deposit real ppt
      </div>
      <p>This is a beta version of the Populous platform for testing purposes.<p>`;

    this.props.showAlertModal({
      html: html,
      headerText: 'Attention',
      buttonText: 'Okay, I understand'
    });*/

    const {currentUser, balanceError, wallet, getMaximumCollateralReturn, maximumCollateralReturnAmount} = this.props;

    if(currentUser && !maximumCollateralReturnAmount){
      getMaximumCollateralReturn(currentUser);
    }

    if (wallet && wallet.address && wallet.version < 2 && !wallet.isPending) {
      wallet.callMethod('createNewDepositAddress');
    }
  }

  noTransactions() {
    return (
      <div className="text-center">
        <P>
          No Transactions to display
        </P>
        <img src="/img/no-transactions.png" height={80} alt="No transactions" />
      </div>
    );
  }

  showTransactions(transactions = []) {
    const { filters, hasMore, incrementCurrentTransactionsPage, currencies } = this.props;

    const currencySymbolToTitle = {};

    currencies.forEach(currency => {
      currencySymbolToTitle[currency.symbol] = currency.title;
    });

    if (transactions.length === 0) {
      return this.noTransactions()
    }

    const transactionsList = transactions.map(transaction => {
      if (transaction.fromCurrency && currencySymbolToTitle[transaction.fromCurrency]) {
        transaction.fromCurrency = currencySymbolToTitle[transaction.fromCurrency];
      }
      if (transaction.toCurrency && currencySymbolToTitle[transaction.toCurrency]) {
        transaction.toCurrency = currencySymbolToTitle[transaction.toCurrency];
      }
      return (
        <TransactionCard key={transaction._id} transaction={transaction} wallet={filters.selectedWallet} />
      );
    });

    return (
      <div className={'hello'}>
        <Row className="m-0" style={{borderBottom: "solid 2px #e1e5eb"}}>
          <Col md={6} className="d-none d-md-flex">
            <Small className="p-l-10 m-b-5">Description</Small>
          </Col>
          <Col md={2} className="d-none d-md-flex justify-content-end">
            <Small className="m-b-5">Amount</Small>
          </Col>
          <Col md={2} className="d-none d-md-flex justify-content-end">
            <Small className="m-b-5">Received</Small>
          </Col>
          <Col md={2} className="d-none d-md-flex justify-content-end">
            <Small className="m-b-5">Balance</Small>
          </Col>
        </Row>
            <InfiniteScroll
              pageStart={0}
              loadMore={incrementCurrentTransactionsPage}
              hasMore={hasMore}
              loader={<div className="loader m-t-10" key={'load_more'}><LoadMoreSpinner text={'Load'} /></div>}
              initialLoad={false}
            >
              {transactionsList}
            </InfiniteScroll>
      </div>
    );
  }

  render() {
    const {
      currentUser,
      balanceError,
      getBalanceError,
      getCurrenciesBalance,
      lastRates,
      createAddress,
      currencies,
      wallet,
      currenciesBalance,
      userBanks,
      inEscrow,
      ledgerLogsList,
      updateFilters,
      resetFilters,
      filters,
      depositLedgerLogs,
      externalsAddresses,
      withdrawPPT,
      withdrawPokens,
      withdrawXAUp,
      canWithdrawPPT,
      canExchangeXAUp,
      xaupBlockchainActions,
      canWithdrawXAUp
    } = this.props;
    
    const isNewUser = JSON.parse(localStorage.getItem('isNewUser'));
    return (
      <Fragment>
        {!isNewUser && <NotificationBar />}
        <Container>
          <Row>
            <Col xs={'12'} className="page-title">
              <H1>Wallets</H1>
            </Col>
          </Row>
        </Container>
        <div className="gradient-bg p-b-40">
          <Container>
            <Row>
              <Col xs={12} lg={6} className="m-b-40 p-r-30">
                <CurrencyForm {...{currentUser, currencies, currenciesBalance, lastRates, wallet, depositLedgerLogs,
                  canExchangeXAUp, onUpdate: getCurrenciesBalance, xaupBlockchainActions}}/>
              </Col>
              <Col xs={12} lg={6} className="p-l-30">
                <WalletForms {...{currentUser, balanceError, getBalanceError, createAddress, currencies, userBanks, currenciesBalance, wallet, withdrawXAUp,
                  depositLedgerLogs, externalsAddresses, canWithdrawPPT, withdrawPPT, withdrawPokens, canWithdrawXAUp }} />
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row className="m-t-40 m-b-40">
            <Col xs={12}>
              <H2>TRANSACTION HISTORY</H2>
              <TransactionFilterForm {...{currencies, filters, resetFilters, onUpdateFilters: updateFilters,
                historyAmount: +ledgerLogsList.length}} />
            </Col>
            <Col xs={12} className="m-t-10">
              {this.showTransactions(ledgerLogsList)}
            </Col>
          </Row>
          <AlertModal />
        </Container>
      </Fragment>
    );
  }
}

export default Wallet;
