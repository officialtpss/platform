import React from 'react';
import { CardBody, Table, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

const table = ({isEmpty, fundsType, ...props})=>{
  return (
    <CardBody>
      <Table responsive className={'custom m-t-10 ' + (isEmpty && 'empty')}>
        <thead>
        <tr>
          <th/>
          <th>AVAILABLE</th>
        </tr>
        </thead>
        {isEmpty ?
          <tbody>
            <tr>
              <td>{fundsType}</td>
              <td/>
            </tr>
          </tbody>
        : <tbody>
            <tr>
              <td className="text-center">GBPp</td>
              <td>10,500,000.00</td>
            </tr>
            <tr>
              <td className="text-center">USDp</td>
              <td>500,000.00</td>
            </tr>
            <tr>
              <td className="text-center">EURp</td>
              <td>200.50</td>
            </tr>
            <tr>
              <td className="text-center">JPYp</td>
              <td>1.00</td>
            </tr>
          </tbody>
        }
      </Table>

      {isEmpty && <p className="text-center" style={{color: '#A5ACB5'}}>
        You don't have funds yet  <Link to="/wallet">Use wallets page to deposit</Link>
      </p>}
    </CardBody>
  );
}

export default table;