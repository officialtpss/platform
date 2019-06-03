import countries from './countries';
import truliooSupportedCountries from './truliooSupportedCountries';
import areaCodes from './area-codes';
import sicList from './sic-list';
import defaultTermsAndConditions from './terms-and-conditions';
import industryKeys from './industryKeys';
import {
  bankDetailsFields,
  personalDetailsFields,
  nonEditableVerifiedFields,
} from './model-fields';
import InvoiceFixtures from "./invoice-fixtures";
import getEmailTemplate from "./getEmailTemplate";

const companyDetails = {
  companyName: 'Populous',
  supportEmail: 'info@populous.co',
  fromEmail: 'info@populous.co',
  adminEmail: "info@populous.world",
};

const userRoles = {
  admin: 'POP_ADMIN',
  investor: 'POP_INVESTOR',
  borrower: 'POP_BORROWER'
};

const statuses = {
  unverified: 'UNVERIFIED',
  pending: 'PENDING',
  verified: 'VERIFIED',
  declined: 'DECLINED',
};

const debtorStatuses = {
  pending: 'PENDING',
  verified: 'VERIFIED',
  unverified: 'UNVERIFIED',
};

const accountStatuses = {
  active: 'ACTIVE',
  suspended: 'SUSPENDED'
};

const invoiceStatuses = {
  auctionFailed: 'AUCTION_FAILED', //After the auction is closed, and there is no winner, the invoice seller will have some time to accept the result or reject it. If they reject the outcome, then the status: AUCTION_FAILED
  awaitingContract: 'AWAITING_CONTRACT', // user submits invoice and signed contract
  auctionRejected: 'AUCTION_REJECTED', //admin rejects auction
  auctionPending: 'AUCTION_PENDING', // it is under process of starting the crowdsale
  auctionOpen: 'AUCTION_OPEN', // Auction is active
  auctionClosed: 'AUCTION_CLOSED', // Finished but no winner selected
  repaymentPending: 'PENDING_REPAYMENT', //Awaiting repayment from seller
  repaymentLate: 'REPAYMENT_LATE', //Seller fails to return funds back to the Buyer withintime limit
  repaymentPaid: 'REPAYMENT_PAID', // Seller has returned funds back to the Buyer

  externalTrade: 'EXTERNAL_TRADE'
};

const userSettingsDefault = {
  marketFilter: null,
};

const invoiceDocumentTypes = {
  offer: 'offer',
  buyer: 'buyer',
  agreement: 'agreement',
  invoice: 'invoice'
};

const crowdsaleStatuses = {
  open: 'open',
  closed: 'closed',
};

const ledgerActionsTypes = {
  withdraw: 'withdraw',
  transfer: 'transfer',
  deposit: 'deposit',
  depositReturn: 'depositReturn',
  crowdsale: 'crowdsale',
  repayment: 'repayment',
  mint: 'mint',
  destroy: 'destroy',
  import: 'import',
  withdrawPPT: 'withdrawPPT',
};

const requestTypes = {
  withdraw: 'withdraw',
  import: 'import',
  invoice: 'invoice',
  debtorList: 'debtor_list',
  reset2fa: 'reset2fa',
  blockchainError: 'blockchain-error',
  kyc: 'KYC',
};

const currencies = {
  GBP: {
    title: "GBPp",
    symbol: "GBP",
    address: "0xc1E50afCd71A09F81f1B4e4dAa1d1A1A4d678d2a",
    decimalUnits: 8
  },
  USD: {
    title: "USDp",
    symbol: "USD",
  },
  EURO: {
    title: "EUROp",
    symbol: "EURO",
  },
  AUD: {
    title: "AUDp",
    symbol: "AUD",
  },

};

const currencySymbols = {
  GBP: 'GBP',
  USD: 'USD',
  EURO: 'EUR'
};

const returnPercentage = [2, 3, 4, 5, 10];

const averageInvoiceValues = {
  5: '0 - 2,000',
  4: '2,000 - 5,000',
  3: '5,000 - 15,000',
  2: '15,000 - 50,000',
  1: '50,0000 - 100,000',
  0: 'more than 100,000'
};

const averageInvoiceVolumes = {
  6: '1 - 2',
  5: '3 - 5',
  4: '5 - 10',
  3: '10 - 20',
  2: '20 - 50',
  1: '50 - 100',
  0: 'more than 100'
};

const fixtures = {
  users: {
    admin: {
      email: 'admin@example.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Admin',
      role: userRoles.admin
    },
    investor: {
      email: 'investor@example.com',
      password: 'password',
      firstName: 'Alice',
      lastName: 'Investor',
      role: userRoles.investor
    },
    borrower: {
      email: 'borrower@example.com',
      password: 'password',
      firstName: 'Jane',
      lastName: 'Borrower',
      role: userRoles.borrower
    }
  },
  invoices: InvoiceFixtures,
};

const employeeNumbers = ['1 - 10', '10 - 50', '50 - 100', '100+'];

const timezoneValues = {
  'GMT-12': 'Etc/GMT+12',
  'GMT-11': 'Etc/GMT+11',
  'GMT-10': 'Etc/GMT+10',
  'GMT-9.5': 'Pacific/Marquesas',
  'GMT-9': 'Etc/GMT+9',
  'GMT-8': 'Etc/GMT+8',
  'GMT-7': 'Etc/GMT+7',
  'GMT-6': 'Etc/GMT+6',
  'GMT-5': 'Etc/GMT+5',
  'GMT-4': 'Etc/GMT+4',
  'GMT-3.5': 'America/St_Johns',
  'GMT-3': 'Etc/GMT+3',
  'GMT-2': 'Etc/GMT+2',
  'GMT-1': 'Etc/GMT+1',
  'GMT0': 'Etc/UCT',
  'GMT1': 'Etc/GMT-1',
  'GMT2': 'Etc/GMT-2',
  'GMT3': 'Etc/GMT-3',
  'GMT3.5': 'Asia/Tehran',
  'GMT4': 'Etc/GMT-4',
  'GMT4.5': 'Asia/Kabul',
  'GMT5': 'Etc/GMT-5',
  'GMT5.5': 'Asia/Kolkata',
  'GMT6': 'Etc/GMT-6',
  'GMT6.5': 'Asia/Yangon',
  'GMT7': 'Etc/GMT-7',
  'GMT8': 'Etc/GMT-8',
  'GMT8.5': 'Asia/Pyongyang',
  'GMT9': 'Etc/GMT-9',
  'GMT9.5': 'Australia/North',
  'GMT10': 'Etc/GMT-10',
  'GMT10.5': 'Australia/South',
  'GMT11': 'Etc/GMT-11',
  'GMT12': 'Etc/GMT-12'
};

const tierFees = {
  1: 0.015,
  2: 0.01,
  3: 0.005,
};

function getTierFee(zScore) {
  if (zScore > 2.6) {
    return tierFees[1];
  }

  if (zScore > 1.1 && zScore <= 2.6) {
    return tierFees[2];
  }

  if (zScore <= 1.1) {
    return tierFees[3];
  }
}

const invoiceSellerFee = 0.025;
const adminFee = 0.01;

const blockchainActionTypes = {
  import: 'import',
  withdraw: 'withdraw',
  invoice: 'invoice',
  newProvider: 'newProvider',
  createAddress: 'createAddress',
  createCurrency: 'createCurrency',
  upgradeCurrency: 'upgradeCurrency',
  exchangeXaup: 'exchange_xaup',
};

const platformActionTypes = {
  startAuction: 'startAuction',
  PPTtoGBPp: 'PPTtoGBPp',
  GBPptoPPT: 'GBPptoPPT'
};

const platformActionStatuses = {
  new: 'new',
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
};

const userSubscriptionTypes = {
  borrower: 'borrower',
};

const blockchainActionStatuses = {
  complete: 'complete',
  failed: 'failed',
  pending: 'pending',
};

const blockchainDefaultConfig = {
  gasPrice: 55000000000,
  gasLimit: 4700036
};

const repaymentBankDepositDetails = {
  EUR: {
    bank: 'Wirecard Bank AG (EUR)',
    accNum: 67152,
    bankCode: 51230800,
    IBAN: 'DE76 5123 0800 0000 0671 52',
    BIC: 'WIREDEMMXXX',
  },
  GBP: {
    bank: 'Wirecard Bank AG (GBP)',
    accNum: 67390,
    bankCode: 51230800,
    IBAN: 'DE52 5123 0800 0000 0673 90',
    BIC: 'WIREDEMMXXX',
  },
  JPY: {
    bank: 'Wirecard Bank AG (JPY)',
    accNum: 67391,
    bankCode: 51230800,
    IBAN: 'DE25 5123 0800 0000 0673 91',
    BIC: 'WIREDEMMXXX',
  }
};

const genders = {
  male: 'Male',
  female: 'Female',
};

const userProviderPermissions = {
  canRecord: 'canRecord',
};

const userProviderStatuses = {
  completed: 'completed',
  pending: 'pending',
};

const userProviderDefault = {
  isEnabled: true,
  [userProviderPermissions.canRecord]: false,
  status: userProviderStatuses.pending,
};

const documentTypes = {
  DrivingLicence: 'Driving licence',
  IdentityCard: 'Identity card',
  ResidencePermit: 'Residence permit',
  Passport: 'Passport'
};

const emailTemplates = {
  'ResetTwoFaKey': {
    name: 'Reset TwoFa key',
    subject: 'Reset TwoFA Key',
    body: '<div>Hi {{name}},</div>' +
      '<div>You have requested a 2FA reset.</div>' +
      '<div style="text-align: center; margin-top: 40px; margin-bottom: 40px;">' +
      '<a style="display: inline-block;vertical-align: middle;margin: 7px;font-weight: 700;font-size: 0.875rem;line-height: 1.25;letter-spacing: 0.05em;text-transform: uppercase;border-radius: 0;padding: 0.8em 2em;border: 2px solid;text-align: center;white-space: normal;background-color: #5CA0F6;border-color: #5CA0F6; text-decoration: none; color: #FFFFFF" href="{{link}}">RESET 2FA</a>' +
      '</div>' +
      'Please ignore this e-mail if you did not request this 2FA reset. However, ' +
      'if you have any queries on why this email was sent please contact us on <a href="mailto:{{supportMail}}">{{supportMail}}.</a>',
    systemName: 'ResetTwoFaKey',
  },
  'InvoiceDecline': {
    name: 'Invoice Decline',
    subject: 'Invoice is declined',
    body: '<div>Hi {{name}},</div>' +
      '<div>Invoice {{invoiceNumber}} has been declined</div>',
    systemName: 'InvoiceDecline',
  },
  'InvoiceRestated': {
    name: 'Invoice Restarted',
    subject: 'Invoice number {{invoiceNumber}} has been restarted',
    body: '<div>Hi {{name}},</div>' +
      '<div>Invoice {{invoiceNumber}} has been restarted</div>',
    systemName: 'InvoiceRestated',
  },
  'AddExternalAddress': {
    name: 'Add External address',
    subject: 'Notification: your wallet external address has been {{type}}',
    body: `<div>Hi {{name}},</div>` +
      `<div>You have added an external wallet {{newAddress}}. This new address will be available for use after 48 hrs.</div>`,
    systemName: 'AddExternalAddress',
  },
  'UpdateExternalAddress': {
    name: 'Update External address',
    subject: 'Notification: you wallet external address has been {{type}}',
    body: `<div>Hi {{name}},</div>` +
      `<div>You've requested a wallet update. Your wallet address {{address}} will change to {{newAddress}} after 48 hrs.</div>`,
    systemName: 'UpdateExternalAddress',
  },
  'KycVerificationConfirm': {
    name: 'Kyc Verification confirm',
    subject: '[Populous] Account Approved',
    body: `<div>Hi {{name}},</div>` +
      `<div>Your Populous account has been approved. You can now access all areas of the website.</div>`,
    systemName: 'KycVerificationConfirm',
  },
  'KycVerificationDecline': {
    name: 'Kyc Verification decline',
    subject: '[Populous] Account Declined',
    body: `<div>Hi {{name}},</div>` +
      `You've been denied full access to Populous and its relating services. Contact support for further information: {{supportMail}}</div>`,
    systemName: 'KycVerificationDecline',
  },
  'EmailVerification': {
    name: 'Email verification',
    subject: '[{{companyName}}] Verify Your Email Address',
    body: `<div>Hi,</div>` +
      `<div>You've requested an email verification for: ({{emailAddress}})</div>` +
      `<div style="text-align: center; margin-top: 40px; margin-bottom: 40px;">` +
      `<a style="display: inline-block;vertical-align: middle;margin: 7px;font-weight: 700;font-size: 0.875rem;line-height: 1.25;letter-spacing: 0.05em;text-transform: uppercase;border-radius: 0;padding: 0.8em 2em;border: 2px solid;text-align: center;white-space: normal;background-color: #5CA0F6;border-color: #5CA0F6; text-decoration: none; color: #FFFFFF" href="{{link}}">VERIFY MY EMAIL </a>` +
      `</div>` +
      `<div>For mobile, verification code: {{emailToken}}</div>` +
      `<div>Please ignore this e-mail if you did not request this verification link. However, if you have any queries on why this email was sent please contact us on <a href="mailto:{{supportMail}}">{{supportMail}}.</a></div>`,
    systemName: 'EmailVerification',
  },
  'ResetPassword': {
    name: 'Reset password',
    subject: '[{{companyName}}] Reset your password',
    body: `<div>Hi {{name}},</div>` +
      `<div>You've requested a password reset.</div>` +
      `<div style="text-align: center; margin-top: 40px; margin-bottom: 40px;">` +
      `<a style="display: inline-block;vertical-align: middle;margin: 7px;font-weight: 700;font-size: 0.875rem;line-height: 1.25;letter-spacing: 0.05em;text-transform: uppercase;border-radius: 0;padding: 0.8em 2em;border: 2px solid;text-align: center;white-space: normal;background-color: #5CA0F6;border-color: #5CA0F6; text-decoration: none; color: #FFFFFF" href="{{link}}">RESET PASSWORD</a>` +
      `</div>` +
      `<div>For mobile, verification code: {{emailToken}}</div>` +
      `<div>Please ignore this e-mail if you did not request this password reset. However, if you have any queries on why this email was sent please contact us on <a href="mailto:{{supportMail}}">{{supportMail}}.</a></div>`,
    systemName: 'ResetPassword',
  },
  'SendBankDetails': {
    name: 'Send Bank Details',
    subject: 'Notification: your bank details has been {{type}}',
    body: `<div>Hi {{name}},</div>` +
      `<div style="margin-top: 20px; margin-bottom: 20px;">You've added new bank details.</div>` +
      `<div>Bank name: {{bankName}}</div>` +
      `<div>Country: {{country}}</div>` +
      `<div>Account Number: {{number}}</div>`,
    systemName: 'SendBankDetails',
  },
  'InvoiceActivityInfo': {
    name: 'Send Invoice Activity Info',
    subject: 'Notification: {{subject}}',
    body: `<div>Hi {{name}},</div>` +
      `<div style="margin-top: 20px; margin-bottom: 20px;">{{message}}</div>` +
      `<div style="font-weight: 700; font-size: 0.875rem;">Invoice Info</div>` +
      `<div>Seller name: {{sellerName}}</div>` +
      `<div>Invoice Amount: GBPp {{amount}}</div>` +
      `<div>Interest rate: {{rate}}%</div>`,
    systemName: 'InvoiceActivityInfo',
  }
};

const minBidAmount = 50;

const populousEvents = {
  loginSuccess: 'loginSuccess',
  bidPlaced: 'bidPlaced',
  bidIncreased: 'bidIncreased',
  bidJoined: 'bidJoined',
  invoiceWinner: 'invoiceWinner',
  invoiceSuccessfulClosed: 'invoiceSuccessfulClosed',
  authReset: 'authResetEvent',
  pptWithdraw: 'pptWithdraw',
  pptDeposited: 'pptDeposited',
  pptReturned: 'pptReturned',
  pptBalanceIncreased: 'pptBalanceIncreased',
  pptBalanceDecreased: 'pptBalanceDecreased',
  pokenWithdraw: 'pokenWithdraw',
  xaupWithdraw: 'xaupWithdraw',
  PXTWithdraw: 'PXTWithdraw',
  USDCWithdraw: 'USDCWithdraw',
  TUSDWithdraw: 'TUSDWithdraw',
  postingNewInvoices: 'postingNewInvoices',
  auctionWillStartSoon: 'auctionWillStartSoon',
  auctionOpenForNewInvoices: 'auctionOpenForNewInvoices',
  declineInvoice: 'declineInvoice',
  restartAuction: 'restartAuction',
  canceledAuction: 'canceledAuction',
  closedAuction: 'closedAuction',
  unsuccessfulBids: 'unsuccessfulBids',
  beatBid: 'beatBid',
  dueDate: 'dueDate',
  repayment: 'repayment',
  updateExternalAddress: 'updateExternalAddress',
  changesProfile: 'changesProfile',
  PPTDeposit: 'PPTDeposit',
  withdrawalToBankAccountConfirmation: 'withdrawalToBankAccountConfirmation',
};

const tokenPrecision = {
  PXTToken: 1e8,
  USDCToken: 1e6,
  TUSDToken: 1e18,
  GBPpToken: 1e6,
  PopulousToken: 1e8,
};


const currencyDefinitions = [
  { symbol: 'PPTToken', title: 'PPT', getAvailableBalance: (wallet) => wallet.availableBalance },
  { symbol: 'GBP', title: 'GBPp' },
  {
    symbol: 'XAUToken', title: 'XAUp', getAvailableBalance: (wallet, id) => {
      if (id && wallet.balanceXAU && wallet.balanceXAU.length > 0) {
        let balance = wallet.balanceXAU.find(b => b.xaup_id.toString() === id.toString())
        if (balance) {
          return balance.amount
        }
      }
      return 0
    }
  },
  { symbol: 'PXTToken', title: 'PXT', getAvailableBalance: (wallet) => wallet.balancePXT },
  { symbol: 'USDCToken', title: 'USD Coin', getAvailableBalance: (wallet) => wallet.balanceUSDC },
  { symbol: 'TUSDToken', title: 'True USD', getAvailableBalance: (wallet) => wallet.balanceTUSD },
];

const usdConversionFee = 0.002; // = 0.2%;

export {
  areaCodes,
  sicList,
  averageInvoiceValues,
  averageInvoiceVolumes,
  bankDetailsFields,
  companyDetails,
  countries,
  truliooSupportedCountries,
  currencies,
  debtorStatuses,
  returnPercentage,
  fixtures,
  personalDetailsFields,
  statuses,
  accountStatuses,
  invoiceStatuses,
  userRoles,
  crowdsaleStatuses,
  employeeNumbers,
  ledgerActionsTypes,
  timezoneValues,
  tierFees,
  invoiceSellerFee,
  adminFee,
  requestTypes,
  getTierFee,
  blockchainActionTypes,
  blockchainActionStatuses,
  invoiceDocumentTypes,
  blockchainDefaultConfig,
  repaymentBankDepositDetails,
  genders,
  userProviderPermissions,
  userProviderStatuses,
  userProviderDefault,
  userSettingsDefault,
  minBidAmount,
  emailTemplates,
  industryKeys,
  currencySymbols,
  nonEditableVerifiedFields,
  defaultTermsAndConditions,
  documentTypes,
  getEmailTemplate,
  populousEvents,
  platformActionTypes,
  platformActionStatuses,
  userSubscriptionTypes,
  tokenPrecision,
  currencyDefinitions,
  usdConversionFee
};
