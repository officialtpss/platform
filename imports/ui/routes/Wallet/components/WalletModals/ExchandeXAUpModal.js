import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Table } from 'reactstrap';
import { DepositLog } from 'meteor/populous:api';

import XAUpExchangeForm from '../WalletForms/XAUpExchangeForm';

const ExchandeXAUpModal = ({
  showExchandeXAUpModal,
  toggleExchandeXAUpModal,
  canExchangeXAUp,
  wallet
}) => {

  return (
    <Modal isOpen={showExchandeXAUpModal} toggle={toggleExchandeXAUpModal} className="custom"  style={{maxWidth: 990}}>
      <ModalHeader toggle={toggleExchandeXAUpModal}>EXCHANGE XAUP</ModalHeader>
      <ModalBody>
        <Row>
          <Col sm={12} md={5}>
            <XAUpExchangeForm {...{
              toggleExchandeXAUpModal,
              canExchangeXAUp,
              wallet
              }}
            />
          </Col>
          <Col sm={12} md={7}>
            <div className="m-b-10">Factsheet</div>
            <Table responsive className="custom border-table" style={{ overflow: 'hidden' }}>
              <tbody>
                <tr>
                  <td className="text-left" colSpan="2">
                    <div>ISSUER</div>
                    <div>Populous World LTD</div>
                  </td>
                </tr>
                <tr>
                  <td className="text-left" colSpan="2">
                    <div>LISTING</div>
                    <div>Populous Exchange</div>
                  </td>
                </tr>
                <tr>
                  <td className="text-left">
                    <div>VOLUME</div>
                    <div>10,000 Troy Oz</div>
                  </td>
                  <td className="text-left">
                    <div>SERIES</div>
                    <div>2</div>
                  </td>
                </tr>
                <tr>
                  <td className="text-left">
                    <div>MINIMUM PURCHASE</div>
                    <div>1 Troy Oz</div>
                  </td>
                  <td className="text-left">
                    <div>DISCOUNT</div>
                    <div>9.00%</div>
                  </td>
                </tr>
                <tr>
                  <td className="text-left">
                    <div>DELIVERY DATE</div>
                    <div>12 months</div>
                  </td>
                  <td className="text-left">
                    <div>DELIVERY</div>
                    <div>Thu, 6 February 2020</div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ExchandeXAUpModal;
