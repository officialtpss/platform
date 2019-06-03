import React from 'react';
import { Row, Col } from 'reactstrap';
import { ExchangeRate } from 'meteor/populous:api';
import { usdConversionFee } from 'meteor/populous:constants';

import { PrimaryButton } from '../../styled-components/Buttons';
import { Small, LABEL } from '../../styled-components/Typography';
import { floor } from '../../../utils/formatter';

class ModalWithdrawal2FA extends React.Component {
  componentWillMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  render() {

    const {bgStyles, mainStyles, verify, onCancel, args, resetTwoFA, data} = this.props;
    let amount = data.amount
    let amountInfo = `${floor(amount)}`
    if (data.currencyName === 'GBP' && data.withdrawCurrency === 'USD') {
      let exchangeRate = ExchangeRate.findOne({from: 'GBP', to: 'USD'})
      amount = (parseFloat(amount) * exchangeRate.ask * (1 - usdConversionFee))
      amountInfo = `~ ${floor(amount)} USD`
    }
    return (
      <div style={bgStyles}>
        <div style={mainStyles} className="modal-dialog custom">
          <div className="modal-content">
            <form
              className="form"
              onSubmit={e => {
                e.preventDefault();
                verify(e.target.code.value);
              }}
            >
              <div className="modal-header">
                <h4 className="modal-title">Withdrawal confirmation</h4>
                <button
                  type="button"
                  className="close"
                  style={{cursor: 'pointer'}}
                  aria-label="Close"
                  onClick={onCancel}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <Row>
                  <Col xs={12}>
                    <div>
                      You requested withdrawal to a bank account. Please check and confirm.
                    </div>
                    <Small className="m-t-20 m-b-5">Operation details</Small>
                    <div className="border-row p-10 p-l-20 bottomless">
                      <LABEL>Withdrawal from</LABEL>
                      <p>{data.currency} wallet</p>
                    </div>
                    <div className="border-row p-10 p-l-20 bottomless">
                      <LABEL>Withdrawal to</LABEL>
                      <p>{`${data.bankCurrency} ${data.bankName}`}</p>
                    </div>
                    <div className="border-row p-10 p-l-20 grey-bg">
                      <LABEL>Amount</LABEL>
                      <p className="text-bold">{amountInfo}</p>
                    </div>
                  </Col>

                  <Col sm={9} xs={8}>
                    <div className="form-group m-t-50">
                      <LABEL>
                        Authentication code
                      </LABEL>
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
                        name="code"
                        maxLength="6"
                        autoFocus
                      />
                      <Small className="pull-right m-t-5" style={{color: '#a5acb5'}}>
                        Example: 123456
                      </Small>
                    </div>
                  </Col>

                  <Col sm={3} xs={4} className="text-center">
                    <img
                      src="/img/img-2FA-device.png"
                      className="m-t-40"
                      alt="2FA Setup Device"
                      width={60}
                    />
                  </Col>
                </Row>
              </div>
              <div className="modal-footer justify-content-center">
                <Row>
                  <Col md={{size: '6', offset: '3'}} xs={{size: '6', offset: '3'}} className="text-center">
                    <PrimaryButton block>Confirm</PrimaryButton>
                  </Col>
                  <Col sm={12} xs={12} className="text-center m-t-10">
                    <a href="javascript:void(0);" onClick={() => resetTwoFA(args[0], data)}>I have a problem with
                      2FA</a>
                  </Col>
                </Row>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWithdrawal2FA;