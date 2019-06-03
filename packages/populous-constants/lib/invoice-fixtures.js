import {invoiceStatuses, currencies} from "./index";

const InvoiceFixtures = (borrowerId) => {

  const date = new Date();

  const invoices = [{
      "amount": 100,
      "salePrice": 80,
      "currency": currencies.USD,
      "invoiceNumber": "111",
      "debtorName": "One Company Ltd.",
      "status": invoiceStatuses.open,
      "invoiceFileId": "R4yQBqQvRhaDGfwdX",
      "signedContractIPFSHash": "QmWRsfPxirPPgF6r88YQ3Zu3QbnxjYvD4kZAuK1zgXRhgY",
      "signedContractIV": "9559fb6b00470d0fde9d790fa47bc9f7"
    },
    {
      "amount": 200,
      "salePrice": 180,
      "currency": currencies.GBP,
      "invoiceNumber": "222",
      "debtorName": "Two Company Ltd.",
      "status":invoiceStatuses.paid,
      "invoiceFileId": "R4yQBqQvRhaDGfwdX",
      "signedContractIPFSHash": "QmWRsfPxirPPgF6r88YQ3Zu3QbnxjYvD4kZAuK1zgXRhgY",
      "signedContractIV": "9559fb6b00470d0fde9d790fa47bc9f7"
    },
    {
      "amount": 300,
      "salePrice": 280,
      "currency": currencies.EURO,
      "invoiceNumber": "333",
      "debtorName": "Three Company Ltd.",
      "status": invoiceStatuses.pending,
      "invoiceFileId": "R4yQBqQvRhaDGfwdX",
      "signedContractIPFSHash": "QmWRsfPxirPPgF6r88YQ3Zu3QbnxjYvD4kZAuK1zgXRhgY",
      "signedContractIV": "9559fb6b00470d0fde9d790fa47bc9f7"
    },
    {
      "amount": 400,
      "salePrice": 380,
      "currency": currencies.USD,
      "invoiceNumber": "444",
      "debtorName": "Four Company Ltd.",
      "status": invoiceStatuses.paymentPending,
      "invoiceFileId": "R4yQBqQvRhaDGfwdX",
      "signedContractIPFSHash": "QmWRsfPxirPPgF6r88YQ3Zu3QbnxjYvD4kZAuK1zgXRhgY",
      "signedContractIV": "9559fb6b00470d0fde9d790fa47bc9f7"
    },
    {
      "amount": 500,
      "salePrice": 480,
      "currency": currencies.GBP,
      "invoiceNumber": "555",
      "debtorName": "Five Company Ltd.",
      "status": invoiceStatuses.declined,
      "invoiceFileId": "R4yQBqQvRhaDGfwdX",
      "signedContractIPFSHash": "QmWRsfPxirPPgF6r88YQ3Zu3QbnxjYvD4kZAuK1zgXRhgY",
      "signedContractIV": "9559fb6b00470d0fde9d790fa47bc9f7"
    },
    {
      "amount": 600,
      "salePrice": 580,
      "currency": currencies.EURO,
      "invoiceNumber": "6",
      "debtorName": "Six Company Ltd.",
      "status": invoiceStatuses.auctionClosed,
      "invoiceFileId": "R4yQBqQvRhaDGfwdX",
      "signedContractIPFSHash": "QmWRsfPxirPPgF6r88YQ3Zu3QbnxjYvD4kZAuK1zgXRhgY",
      "signedContractIV": "9559fb6b00470d0fde9d790fa47bc9f7"
    },
    {
      "amount": 600,
      "salePrice": 580,
      "currency": currencies.EURO,
      "invoiceNumber": "6",
      "debtorName": "Six Company Ltd.",
      "status": invoiceStatuses.unsuccessful,
      "invoiceFileId": "R4yQBqQvRhaDGfwdX",
      "signedContractIPFSHash": "QmWRsfPxirPPgF6r88YQ3Zu3QbnxjYvD4kZAuK1zgXRhgY",
      "signedContractIV": "9559fb6b00470d0fde9d790fa47bc9f7"
    }
  ];
  return invoices.map(invoice => {
    date.setDate(date.getDate() + 7);

    invoice.dueDate = new Date(date.getTime());
    invoice.borrowerId = borrowerId;

    return invoice;
  });
};
//as
export default InvoiceFixtures;