import {pptMultiplier, gbpMultiplier, usdcMultiplier} from '../constants';
import {sendToClient} from '../helpers/sendToClient';
import contracts from "../../config/contract";

export default {

  createAddress(connect, contract, from,
                clientId, blockchainActionId) {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
    const params = {
      dataManager: contracts.dataManager.address,
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      clientId: connect.utils.asciiToHex(clientId),
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          .createAddress(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
      })
  },

  upgradeDepositAddress(connect, contract, from,
                         blockchainActionId, clientId, oldAddress) {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
    const params = {
      dataManager: contracts.dataManager.address,
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      clientId: connect.utils.asciiToHex(clientId),
      oldAddress,
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          .upgradeDepositAddress(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
      })
  },

  createCurrency: (connect, contract, from, tokenName, decimalUnits, tokenSymbol, blockchainActionId) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    const params = {
        dataManager: contracts.dataManager.address,
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      tokenName: connect.utils.asciiToHex(tokenName),
      decimalUnits: decimalUnits,
      tokenSymbol: connect.utils.asciiToHex(tokenSymbol),
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          .createCurrency(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
      });
  },

  upgradeCurrency: (connect, contract, from,
                    blockchainActionId, oldAddress, tokenSymbol) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
    const params = {
      dataManager: contracts.dataManager.address,
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      oldAddress,
      tokenSymbol: connect.utils.asciiToHex(tokenSymbol),
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          .upgradeCurrency(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
      });
  },

  addProvider: (connect, contract, from,
                blockchainActionId, userId, companyNumber,
                companyName, countryCode,
  ) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
    const params = {
      dataManager: contracts.dataManager.address,
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      userId: connect.utils.asciiToHex(userId),
      companyNumber: connect.utils.asciiToHex(companyNumber.trim().slice(0, 32).toLowerCase()),
      companyName: connect.utils.asciiToHex(companyName.trim().slice(0, 32).toLowerCase()),
      countryCode: connect.utils.asciiToHex(countryCode.trim().toLowerCase()),
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          .addProvider(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
      });
  },

  addInvoice: (connect, contract, from,
                blockchainActionId, providerUserId, invoiceCountryCode,
               invoiceCompanyNumber, invoiceCompanyName, invoiceNumber,
  ) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
    const params = {
      dataManager: contracts.dataManager.address,
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      providerUserId: connect.utils.asciiToHex(providerUserId),
      invoiceCountryCode: connect.utils.asciiToHex(invoiceCountryCode.trim().toLowerCase()),
      invoiceCompanyNumber: connect.utils.asciiToHex(invoiceCompanyNumber.trim().slice(0, 32).toLowerCase()),
      invoiceCompanyName: connect.utils.asciiToHex(invoiceCompanyName.trim().slice(0, 32).toLowerCase()),
      invoiceNumber: connect.utils.asciiToHex(invoiceNumber.trim().slice(0, 32).toLowerCase()),
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          .addInvoice(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
      });
  },


  withdrawERC20(connect, contract, from,
              blockchainActionId, pptAddress, accountId,
                to, amount, inCollateral, pptFee, adminExternalWallet) {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    const params = {
      dataManager: contracts.dataManager.address,
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      pptAddress: pptAddress,
      accountId: connect.utils.asciiToHex(accountId),
      to: to,
      amount: amount * pptMultiplier,
      inCollateral: inCollateral * pptMultiplier,
      pptFee: Number.parseInt((pptFee*pptMultiplier).toFixed(0)),
      adminExternalWallet: adminExternalWallet,
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
          const encodedABI = contractInstance.methods
            .withdrawERC20(...Object.values(params))
            .encodeABI();

          return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
        }
      )
  },


  withdrawPoken(connect, contract, fromAddress,
                blockchainActionId, currency, amount, amountUSD,
                from, to, accountId, inCollateral,
                pptFee, adminExternalWallet, usdAmount) {

    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    const params = {
      dataManager: contracts.dataManager.address,
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      currency: connect.utils.asciiToHex(currency),
      amount: amount * gbpMultiplier,
      amountUSD: amountUSD * usdcMultiplier,
      from: from,
      to: to,
      accountId: connect.utils.asciiToHex(accountId),
      inCollateral,
      pptFee: Number.parseInt((pptFee*pptMultiplier).toFixed(0)),
      adminExternalWallet
    };
    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          .withdrawPoken(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, fromAddress, blockchainActionId, contract.address);
      })
  },

  exchangeXAUP: (connect, contract, from, blockchainActionId, clientId, currency, currencyAmount, xaupAmount) => {
    const currencyAddress = currency === 'USDCToken' ? contracts.USDCToken.address : contracts.TUSDToken.address;
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
    const params = {
      dataManager: contracts.dataManager.address,
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      erc20_tokenAddress: currencyAddress,
      erc20_amount: Number(currencyAmount).toString(16),
      xaup_amount: Number(xaupAmount),
      tokenId:  process.env.XAUP_TOKENID,
      clientId: connect.utils.asciiToHex(clientId),
      adminExternalWallet: process.env.ADMIN_EXTERNAL_WALLET
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          .exchangeXAUP(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
      });
  },
};
