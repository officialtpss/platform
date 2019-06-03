import React from 'react';
import { Col, Table } from 'reactstrap';
import CurrencyRow from '../currencyRow';

class CurrenciesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAllCurrencies: false,
    };
  }

  toggleShowAllCurrencies = () => {
    this.setState({
      showAllCurrencies: !this.state.showAllCurrencies
    });
  };

  render(){
    const showAllCurrencies = this.state.showAllCurrencies;
    return (
      <React.Fragment>
        <Table responsive className='custom m-t-10'>
          <thead>
          <tr>
            <th className="text-center">
            </th>
            <th>AVAILABLE</th>
          </tr>
          </thead>

          <tbody>
          { this.props.currencies.map((item, i)=>{
            if (showAllCurrencies) {
              return <CurrencyRow
                key={i}
                currency={item}
                currenciesBalance={this.props.currenciesBalance}
                role={'borrower'}
              />
            } else {
              if (i < 4) {
                return <CurrencyRow
                  key={i}
                  currency={item}
                  currenciesBalance={this.props.currenciesBalance}
                  role={'borrower'}
                />
              }
            }
          }) }
          </tbody>
        </Table>
        {this.props.currencies.length > 4 &&
        <img src="/img/icons/ico-more-hide.svg"
             className={"showMoreCurrencies" + (!showAllCurrencies && "rotate")}
             onClick={this.toggleShowAllCurrencies}/>
        }
      </React.Fragment>
    );
  }
}

export default CurrenciesTable;
