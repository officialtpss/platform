import React from 'react';
import styled from 'styled-components';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { repaymentBankDepositDetails } from 'meteor/populous:constants';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { P, Small, LABEL } from '../../../../components/styled-components/Typography';
import printSlipRepaymentBankDetails from '../../../../components/printSlipRepaymentBankDetails';

const balanceMismatchModalStyle = {
  width: '330px',
  margin: `calc(50vh - 150px) calc(50vw - 165px)`
};

const BalanceMismatchModal = ({
  showBalanceMismatchModal, referenceNumber
}) => {

  return (
    <Modal isOpen={showBalanceMismatchModal} className="custom modal-lg" style={balanceMismatchModalStyle}>
      <ModalHeader>BALANCE MISMATCH</ModalHeader>
      <ModalBody>
        <Row>
          <div>
            Balance issue found, please contact 
            &nbsp; <a href="https://forum.populous.world/index.php/board,12.0.html">support</a>
          </div>
        </Row>
        <br />
        <Row>
          <div>
            <div className="sc-VigVT EVnRc">
              Reference number
            </div>
            <p className="sc-gqjmRU guRLbD">{referenceNumber}</p></div>
        </Row>
      </ModalBody>
    </Modal>
  )
};

export default BalanceMismatchModal;
