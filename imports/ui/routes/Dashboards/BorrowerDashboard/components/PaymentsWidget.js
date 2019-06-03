import React, { Fragment } from 'react';
import { Row, Col, CardBody } from 'reactstrap';
import classnames from 'classnames';
import InputRange from 'react-input-range';

import { Card, CardTitle } from '../../../../components/styled-components/Card';
import { P, Lead, LinkText, Mute } from '../../../../components/styled-components/Typography';
import { CurrencyLabel, ComingPaymentContainer, CustomTable } from '../../../../components/styled-components/Dashboard/BorrowerDashboard';
import { floor } from '../../../../utils/formatter';
import DisplayListedInvoices from '../../../../components/modals/DisplayListedInvoices';

class PaymentsWidget extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isSliderVisible: false,
      invoicesModall: false,
    }
  }

  toggleInvoicesModal = () => {
    this.setState({
      invoicesModall: !this.state.invoicesModall
    });
  }

  toggleSliderVisibility = ({nativeEvent}) => {
    nativeEvent.stopImmediatePropagation();

    this.setState({isSliderVisible: !this.state.isSliderVisible})
  }

  closeSlider = () => {
    this.setState({isSliderVisible: false})
  }

  componentDidMount() {
    document.addEventListener('click', this.closeSlider);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeSlider);
  }

  render(){
  const { isSliderVisible, } = this.state;
  const { isEmpty, amountFinanced, interest, penalties, total, coming, dueDays, setDueDays, selectedCurrency,
    invoicesList, isEmptyInvoicesList} = this.props;

  return (
    <Card>
      <Row>
        <Col xs={12} md={7}>
          <CardBody>
            <CardTitle className="m-b-20">
              Payment Dues
              { !isEmpty && <CurrencyLabel className="m-l-20">≈ {selectedCurrency.title}</CurrencyLabel> }
            </CardTitle>
            <CustomTable responsive className={classnames({ empty: isEmpty })}>
              <tbody>
              <tr>
                <td><P cool={isEmpty}>Amount financed</P></td>
                <td>{isEmpty ? <div className="crossline" style={{ width: '80%' }}/> : floor(amountFinanced)}</td>
              </tr>
              <tr>
                <td><P cool={isEmpty}>Interest</P></td>
                <td>{isEmpty ? <div className="crossline" style={{ width: '60%' }}/> : floor(interest)}</td>
              </tr>
              <tr>
                <td><P cool={isEmpty}>Penalties</P></td>
                <td>{isEmpty ? <div className="crossline" style={{ width: '40%' }}/> : floor(penalties)}</td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td><strong><P cool={isEmpty}>Total</P></strong></td>
                <td>{isEmpty ? <div className="crossline" style={{ width: '90%' }}/> : floor(total)}</td>
              </tr>
              </tfoot>
            </CustomTable>
            <Row>
              <Col>
                <P cool={isEmpty}>Funded invoices: 0</P>
              </Col>
              <Col>
                <P cool={isEmpty}>Overdue invoices: 0</P>
              </Col>
            </Row>
          </CardBody>
        </Col>

        <Col xs={12} md={5}>
          <ComingPaymentContainer>
            <div className="coming">
              <img src="/img/icons/alarm.png" className="alarm"/>
              <P cool={isEmptyInvoicesList}>Coming payment dues amount in</P>
            </div>
            <div style={{
              position: 'relative',
              width: '100%',
              marginBottom: 15
            }}>
              <div className="text-center">
                <P cool={isEmptyInvoicesList} className="d-inline border-bottom-line cursor-pointer" onClick={this.toggleSliderVisibility}>
                  {dueDays} days
                </P>
              </div>
              {isSliderVisible && <div className="with-labels payment-range" onClick={({nativeEvent}) => nativeEvent.stopImmediatePropagation()}>
                <InputRange
                  maxValue={30}
                  minValue={1}
                  value={dueDays}
                  onChange={setDueDays}
                />
              </div>}
            </div>
            {isEmptyInvoicesList
              ? <Mute>You don't have any dues in this period</Mute>
              : <Fragment>
                  <Lead>≈ {selectedCurrency.title} {floor(coming)}</Lead>
                  <LinkText className="text-uppercase" onClick={this.toggleInvoicesModal}>See these invoices</LinkText>
                </Fragment>
            }
          </ComingPaymentContainer>
        </Col>
      </Row>

      <DisplayListedInvoices
        isOpen={this.state.invoicesModall}
        toggle={this.toggleInvoicesModal}
        className={this.props.className}
        invoicesList={invoicesList}
      />
    </Card>
  );
}
}

export default PaymentsWidget;
