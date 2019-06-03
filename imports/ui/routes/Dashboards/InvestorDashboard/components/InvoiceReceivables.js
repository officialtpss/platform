import React from 'react';
import { Container, Row, Col, CardBody, Table, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Card, CardTitle } from '../../../../components/styled-components/Card/index';
import DateRangePickerWrapper from '../../../../components/DatePicker/DateRangePickerWrapper';
import { UnderLineDiv } from '../../../../components/styled-components/Divs';
import { floor } from '../../../../utils/formatter';

const dueDatesChange = (dates, action) => {
  const range = {
    from: dates.startDate,
    to: dates.endDate,
  };

  action(range);
};

const renderDueDates = (action) => {
  return (
    <div className="d-flex justify-content-end">
      <UnderLineDiv heightAuto>
        <DateRangePickerWrapper
          onChange={(dates) => dueDatesChange(dates, action)}
          className={'dashboard-dates'}
          inner={{isOutsideRange:() => false}}
        />
      </UnderLineDiv>
    </div>
  );
};

const InvoiceReceivables =
  ({isEmpty, principal, interest, penalties, total, setDatesRange, currentWallet}) => {

  return (
    <Card>
      <Container>
        <Row>
          <Col xs={12}>
            <CardBody>
              <CardTitle className="card-title-bold">
                Invoice Receivables {!isEmpty && <b className="p-l-10 normal-text">- {currentWallet.title}</b>}
                <Link to={'/invoices'} className="pull-right">MY INVOICES</Link>
              </CardTitle>
              <Table className={'invoice-receivables ' + (isEmpty && 'empty')}>
                <thead>
                  <tr>
                    <th/>
                    <th className="text-right">Paid-in Period<br/>
                      { renderDueDates(setDatesRange) }
                    </th>
                    <th className="text-right">Awaiting Payments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Principal</td>
                    <td>{ floor(principal.paid) }</td>
                    <td>{floor(principal.awaiting)}</td>
                  </tr>
                  <tr>
                    <td>Interest</td>
                    <td>{ floor(interest.paid) }</td>
                    <td>{floor(interest.awaiting)}</td>
                  </tr>
                  <tr>
                    <td>Penalties</td>
                    <td>{floor(penalties.paid)}</td>
                    <td>{floor(penalties.awaiting)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td><strong>Totals</strong></td>
                    <td>{floor(total.paid)}</td>
                    <td>{floor(total.awaiting)}</td>
                  </tr>
                </tfoot>
              </Table>

              { isEmpty &&
                <p className="text-center" style={{color: '#A5ACB5'}}>
                  Wait for updates here as soon as you <Link to="/market">buy the first invoice</Link>
                </p>
              }
            </CardBody>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default InvoiceReceivables;
