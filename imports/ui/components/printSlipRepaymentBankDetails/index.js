import React from 'react';
import {repaymentBankDepositDetails} from 'meteor/populous:constants';
import jsPDF from 'jspdf';

const printSlipRepaymentBankDetails = ({currency, userReferenceId, depositAmount}) => {
  const bankDepositDetails = repaymentBankDepositDetails[currency] || repaymentBankDepositDetails.GBP;
  const doc = new jsPDF();

  doc.setFontSize(24);
  doc.setFontStyle('bold');
  doc.text(10, 25, 'Payment Confirmation Slip');

  doc.setFontSize(16);
  doc.text(10, 40, 'Please use our credentials below to deposit funds to your account.');

  doc.setFontStyle('normal');
  doc.setFontSize(14);
  doc.text(10, 60, 'Bank:');
  doc.text(65, 60, `${bankDepositDetails.bank}`);
  doc.text(10, 67, 'Beneficiary Name:');
  doc.text(65, 67, 'Populous World, LTD');
  doc.text(10, 74, 'Sort Code:');
  doc.text(65, 74, `${bankDepositDetails.bankCode}`);
  doc.text(10, 81, 'Account Number:');
  doc.text(65, 81, `${bankDepositDetails.accNum}`);
  doc.text(10, 88, 'IBAN');
  doc.text(65, 88, `${bankDepositDetails.IBAN}`);
  doc.text(10, 95, 'BIC:');
  doc.text(65, 95, `${bankDepositDetails.BIC}`);
  doc.text(10, 102, 'Payment Description:');
  doc.text(65, 102, userReferenceId);
  doc.text(10, 109, 'Amount:');
  doc.text(65, 109, currency + ' ' + depositAmount);

  doc.setFontSize(16);
  doc.setFontStyle('bold');
  doc.text(10, 129, 'Please note!');
  doc.setFontSize(14);
  doc.setFontStyle('normal');
  doc.text(15, 139, 'Only BACS and FPS (UK local bank) transfers in GBP can be accepted.');
  doc.text(15, 147, 'Transfers must be made from a company bank account.');
  doc.text(15, 155, 'Transfers in other currencies will be automatically rejected.');

  // TODO: Make name unique
  doc.save(`fiat-deposit.pdf`);
};

export default printSlipRepaymentBankDetails;
