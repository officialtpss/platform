import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {Modal, ModalHeader, ModalBody, Table} from 'reactstrap';
import {repaymentBankDepositDetails} from 'meteor/populous:constants';

import {Small} from "../../../../components/styled-components/Typography";


const StyledTable = styled(Table)`
  td, th{
    word-break: keep-all;
    white-space: nowrap;
  }
  
  &.table.custom thead th{
    opacity: 1;
    font-size: 14px;
    color: ${({theme: {colors: {grey}}}) => grey};
    border: 2px solid transparent;
    border-bottom-color: ${({theme: {colors: {paleGrey}}}) => paleGrey};
  }
`;

const XaupModal = ({
  deposited, isOpen, toggle
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom modal-lg">
      <ModalHeader toggle={toggle}>XAUP IN THE WALLET</ModalHeader>
      <ModalBody>
        <StyledTable responsive className="custom border-table">
          <thead>
          <tr>
            <th className={'text-left'}>
              ID
            </th>
            <th>
              Amount
            </th>
            <th className={'text-center'}>
              Date of availability for withdrawal
            </th>
          </tr>
          </thead>
          <tbody>
          {
           deposited !== undefined
            ? deposited.map(({amount, xaup_id: xaupId}, index) => (
              <tr key={index}>
                <td className={'text-left'}>
                  {xaupId}
                </td>
                <td>
                  {amount}
                </td>
                <td className={'text-center'}>
                  {/* {moment(createdAt).add(9, 'months').format('MM-DD-YYYY')} */}
                </td>
              </tr>
            ))
              :<div className={'p-20 text-center'}>
                You do not have any XAUP in the wallet
              </div>
          }
          </tbody>
        </StyledTable>
        <Small className={'p-t-10'}>
          To withdraw XAUp, open the Withdraw section in the Wallets.
        </Small>
      </ModalBody>
    </Modal>
)};

export default XaupModal;
