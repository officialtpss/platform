import React from 'react';
import {Modal, ModalHeader, ModalBody, Col, Row} from 'reactstrap';
import { H2, P, LABEL } from '../../../../components/styled-components/Typography';
import PurchaseUSDpForm from '../WalletForms/PurchaseUSDpForm';

const ExchandeUSDpModal = ({
  showExchandeUSDpModal,
  toggleExchandeUSDpModal,
  wallet,
  availableUSDC
}) => {
  let activeScroll = false;
  return (
    <Modal isOpen={showExchandeUSDpModal} toggle={toggleExchandeUSDpModal} className="custom">
      <Row>
        <Col xs={12}>
          <div className="card-header d-flex justify-content-between" style={{padding: '1.25rem'}}>
            <div className="d-flex">
              <img src={activeScroll?'/img/icons/deposit.png':'/img/icons/withdraw.png'} height={25} />
              <H2 className="m-l-20 m-b-0 title-main">
                Purchase USDp
              </H2>
            </div>
            <a href="javascript:;" className="card-right-icon">
              <img src={activeScroll?'/img/icons/deposit-down.png':'/img/icons/withdraw-up.png'} height={25} />
            </a>
          </div>
        </Col>
      </Row>
      <ModalBody>
        <Row>
          <Col sm={12}>
            <PurchaseUSDpForm {...{
              toggleExchandeUSDpModal,
              wallet,
              availableUSDC,
            }}
            />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ExchandeUSDpModal;
