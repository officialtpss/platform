import {invoiceStatuses} from "meteor/populous:constants";

export const invoicesSort = {
  status: {
    column: 'status',
    desc: true,
    label: 'Status',
  },
  updatedAtDesc: {
    column: 'updatedAt',
    desc: true,
    label: 'Latest updates',
  },
  debtorName: {
    column: 'debtorName',
    desc: false,
    label: 'Debtor’s name',
  },
  salePrice: {
    column: 'salePrice',
    desc: false,
    label: 'Sale price',
  },
  dueDate: {
    column: 'dueDate',
    desc: false,
    label: 'Due date',
  },
  createdAt: {
    column: 'createdAt',
    desc: false,
    label: 'Uploaded date',
  },
};

export const buyerInvoiceStatues = {
  auctionOpen: 'Auction Open',
  auctionRejected: 'Auction Rejected',
  auctionClosed: 'Auction Closed',
  repaymentPaid: 'Paid',
  repaymentPending: 'Payment pending'
};

export const sellerInvoiceStatuses = {
  auctionPending: 'Auction Pending',
  auctionOpen: 'Auction Open',
  auctionClosed: 'Auction Closed',
  auctionRejected: 'Auction Rejected',
  repaymentPending: 'Payment Pending',
  repaymentPaid: 'Paid',
  auctionFailed: 'Auction Failed'
};
export const providerInvoiceStatuses = {
  ...sellerInvoiceStatuses,
  externalTrade: 'External trade',
};
