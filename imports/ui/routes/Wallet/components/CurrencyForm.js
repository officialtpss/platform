import React, { Fragment } from 'react';
import {Tooltip} from 'reactstrap';

import { LABEL } from '../../../components/styled-components/Typography';
import InvestorCurrenciesTable from './WalletForms/InvestorCurrenciesTable';
import BorrowerCurrenciesTable from './WalletForms/BorrowerCurrenciesTable';
import { BaseCurrency } from '../../../components/styled-components/Wallets';
import QuestionMarkIcon from '../../../components/Icons/QuestionMark';


class CurrencyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
    };
  }

  toggleTooltip = () => {
    this.setState({
      showTooltip: !this.state.showTooltip,
    })
  };

  getBaseQuestionIco() {
    return (
      <Fragment>
        <span className="base-question-ico vertical-align" id="baseTooltip">
          <QuestionMarkIcon/>
        </span>
        <Tooltip className={'tooltip-custom'} placement="top-start" isOpen={this.state.showTooltip} target="baseTooltip"
                 toggle={this.toggleTooltip} autohide={false}>
          I used to convert amounts to your base currency for preview purpose.
        </Tooltip>
      </Fragment>
    );
  }

  render() {
    const {currentUser, currencies} = this.props;

    let baseCurrency = '';
    if(currentUser.preferredCurrency) {
      let currency = currencies.find((currency) => (currency.symbol === currentUser.preferredCurrency));
      baseCurrency = currency ? currency.title : currentUser.preferredCurrency;
    }

    return (
      <Fragment>
        <div className="p-b-30">
          {currentUser.preferredCurrency &&
          <div className="m-b-10">
            <LABEL>Account Base Currency {this.getBaseQuestionIco()}</LABEL>
            <BaseCurrency>{baseCurrency} <span className="currency-mark">£</span></BaseCurrency>
          </div>
          }
          { currentUser.isBorrower()
              ? <BorrowerCurrenciesTable {...this.props} />
              : <InvestorCurrenciesTable {...this.props} />
          }
        </div>
      </Fragment>
    );
  }
}

export default CurrencyForm;
