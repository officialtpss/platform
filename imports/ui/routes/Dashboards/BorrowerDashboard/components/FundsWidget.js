import React from 'react';
import { CardBody, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import classnames from 'classnames';

import { Card, CardTitle } from '../../../../components/styled-components/Card';
import { Mute, LinkText, P } from '../../../../components/styled-components/Typography';
import { CurrencyLabel, CustomTable } from '../../../../components/styled-components/Dashboard/BorrowerDashboard';
import { floor } from '../../../../utils/formatter';

const FundsWidget = ({ isEmpty, selectedCurrency }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          Funds
          { !isEmpty && <CurrencyLabel className="m-l-20">≈ {selectedCurrency.title}</CurrencyLabel> }
          { !isEmpty && <LinkText className="text-uppercase pull-right"><Link to="/wallet">Wallets</Link></LinkText> }
          <div className="clearfix"></div>
        </CardTitle>
        <CustomTable responsive className={classnames({empty: isEmpty})}>
          <tbody>
            <tr>
              <td><P cool={isEmpty}>Total goal sale amount</P></td>
              <td>{ isEmpty ? <div className="crossline" style={{width: '80%'}}></div> : floor(15500) }</td>
            </tr>
            <tr>
              <td><P cool={isEmpty}>Current total raised bids</P></td>
              <td>{ isEmpty ? <div className="crossline" style={{width: '60%'}}></div> : floor(5000) }</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td><P cool={isEmpty}>Pending funds</P></td>
              <td>{ isEmpty ? <div className="crossline" style={{width: '80%'}}></div> : floor(888500000) }</td>
            </tr>
            <tr>
              <td><P cool={isEmpty}>Available</P></td>
              <td>{ isEmpty ? <div className="crossline" style={{width: '60%'}}></div> : floor(120000) }</td>
            </tr>
          </tfoot>
        </CustomTable>
        { isEmpty &&
          <div className="text-center">
            <P cool>You don't have funds yet</P>
            <LinkText><Link to="/add-invoice">Sell the first invoice</Link></LinkText>
          </div>
        }
      </CardBody>
    </Card>
  );
};

export default FundsWidget;
