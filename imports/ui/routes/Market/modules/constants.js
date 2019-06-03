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
  endIn: {
    column: 'closeAt',
    desc: true,
    label: 'Time left to the end of auction'
  },
  rate: {
    column: 'returnPercentage',
    desc: true,
    label: 'Rate'
  },
};

export const buyerInvoiceStatues = {
  auctionOpen: 'Auction Open',
  repaymentPending: 'Awaiting payment',
  auctionRejected: 'Auction Rejected',
  // TODO: When will the logic be added to use the "isDefaulted" need add filtering for this field:
  //defaulted: 'Defaulted',
  auctionClosed: 'Auction Closed',
  repaymentPaid: 'Paid',
  auctionPending: 'Auction Pending',
};
