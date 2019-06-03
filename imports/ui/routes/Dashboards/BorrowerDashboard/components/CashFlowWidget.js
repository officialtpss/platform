import React from 'react';
import { Row, Col, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom'
import classnames from 'classnames';
import { ANCHOR_RIGHT, OPEN_UP } from 'react-dates/constants';

import { Card, CardTitle } from '../../../../components/styled-components/Card';
import { P, LABEL } from '../../../../components/styled-components/Typography';
import { CurrencyLabel, CustomTable } from '../../../../components/styled-components/Dashboard/BorrowerDashboard';
import DateRangePickerWrapper from '../../../../components/DatePicker/DateRangePickerWrapper';
import { UnderLineDiv } from "../../../../components/styled-components/Divs";
import { floor } from '../../../../utils/formatter';

const CashFlowWidget = ({ cashFlowData:{borrowed, returned}, isEmpty, setCashFlowRange, cashFlowDateRange, selectedCurrency}) => {

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center m-b-20">
          <CardTitle>
            Cash flow history
            { !isEmpty && <CurrencyLabel className="m-l-20">≈ {selectedCurrency.title}</CurrencyLabel> }
          </CardTitle>
          <div>
            <UnderLineDiv heightAuto>
              <DateRangePickerWrapper
                onChange={setCashFlowRange}
                className={'dashboard-dates'}
                {...cashFlowDateRange}
                inner={{
                  isOutsideRange: () => false,
                  anchorDirection: ANCHOR_RIGHT,
                  openDirection: OPEN_UP
                }}
              />
            </UnderLineDiv>
          </div>
        </div>
        <Row>
          <Col xs={12} md={6}>
            <CustomTable className={classnames('m-0 ' + { empty: isEmpty })}>
              <thead>
                <tr>
                  <td colSpan="2" className="text-right"><LABEL>BORROWED</LABEL></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><P cool={isEmpty}>Invoices amount</P></td>
                  <td>{isEmpty ? <div className="crossline" style={{ width: '80%' }}/> : floor(borrowed.amount)}</td>
                </tr>
                <tr>
                  <td><P cool={isEmpty}>Interest</P></td>
                  <td>
                    {
                      isEmpty ? 
                      <div className="crossline" style={{ width: '60%' }}/> 
                      : 
                      (parseFloat(borrowed.interest) === 0 ? '' : '-') + floor(borrowed.interest)
                    }
                  </td>
                </tr>
                <tr>
                  <td><P>&nbsp;</P></td>
                  <td><P>&nbsp;</P></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td><strong><P cool={isEmpty}>Amount borrowed</P></strong></td>
                  <td>{isEmpty ? <div className="crossline" style={{ width: '90%' }}/> :
                    <strong>{floor(borrowed.total)}</strong>}</td>
                </tr>
              </tfoot>
            </CustomTable>
          </Col>
          <Col xs={12} md={6}>
            <CustomTable responsive className={classnames('m-0 ' + { empty: isEmpty })}>
              <thead>
                <tr>
                  <td colSpan="2" className="text-right"><LABEL>RETURNED</LABEL></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><P cool={isEmpty}>Amount&nbsp;returned</P></td>
                  <td>{isEmpty ? <div className="crossline" style={{ width: '80%' }}/> : floor(returned.amount)}</td>
                </tr>
                <tr>
                  <td><P cool={isEmpty}>Rate</P></td>
                  <td>{isEmpty ? <div className="crossline" style={{ width: '60%' }}/> : floor(returned.interest)}</td>
                </tr>
                <tr>
                  <td><P cool={isEmpty}>Penalties</P></td>
                  <td>{isEmpty ? <div className="crossline" style={{ width: '40%' }}/> : floor(returned.penalties)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td><strong><P cool={isEmpty}>Total</P></strong></td>
                  <td>{isEmpty ? <div className="crossline" style={{ width: '90%' }}/> :
                    <strong>{floor(returned.total)}</strong>}</td>
                </tr>
              </tfoot>
            </CustomTable>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default CashFlowWidget;
