import React from 'react';
import {Modal, ModalHeader, ModalBody, Col, Row} from 'reactstrap';
import { H2, P, LABEL } from '../../../../components/styled-components/Typography';
import PurchasePokensForm from '../WalletForms/PurchasePokensForm';

const PurchasePokensModal = ({
  showPurchasePokensModal,
  togglePurchasePokensModal,
  wallet,
  availableUSDp
}) => {
  let activeScroll = false;
  return (
    <Modal isOpen={showPurchasePokensModal} toggle={togglePurchasePokensModal} className="custom">
      <Row>
        <Col xs={12}>
          <div className="card-header d-flex justify-content-between" style={{padding: '1.25rem'}}>
            <div className="d-flex">
              <img src={activeScroll?'/img/icons/deposit.png':'/img/icons/withdraw.png'} height={25} />
              <H2 className="m-l-20 m-b-0 title-main">
                Purchase Pokens
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
            <PurchasePokensForm {...{
              togglePurchasePokensModal,
              wallet,
              availableUSDp,
            }}
            />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default PurchasePokensModal;
