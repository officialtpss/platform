export default {
  "contractName": "DataManager",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_accessManager",
          "type": "address"
        }
      ],
      "name": "updateAccessManager",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getVersion",
      "outputs": [
        {
          "name": "_version",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        },
        {
          "name": "_depositAddress",
          "type": "address"
        },
        {
          "name": "_clientId",
          "type": "bytes32"
        }
      ],
      "name": "setDepositAddress",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        }
      ],
      "name": "getBlockchainActionIdData",
      "outputs": [
        {
          "name": "_currency",
          "type": "bytes32"
        },
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_accountId",
          "type": "bytes32"
        },
        {
          "name": "_to",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_providerUserId",
          "type": "bytes32"
        }
      ],
      "name": "getProviderByUserId",
      "outputs": [
        {
          "name": "countryCode",
          "type": "bytes2"
        },
        {
          "name": "companyName",
          "type": "bytes32"
        },
        {
          "name": "companyNumber",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_clientId",
          "type": "bytes32"
        }
      ],
      "name": "getDepositAddress",
      "outputs": [
        {
          "name": "clientDepositAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_depositContract",
          "type": "address"
        }
      ],
      "name": "getClientIdWithDepositAddress",
      "outputs": [
        {
          "name": "depositClientId",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "currencySymbols",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "depositClientIds",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "version",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_currencyAddress",
          "type": "address"
        }
      ],
      "name": "getCurrencySymbol",
      "outputs": [
        {
          "name": "currencySymbol",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_invoiceCountryCode",
          "type": "bytes2"
        },
        {
          "name": "_invoiceCompanyNumber",
          "type": "bytes32"
        },
        {
          "name": "_invoiceNumber",
          "type": "bytes32"
        }
      ],
      "name": "getInvoice",
      "outputs": [
        {
          "name": "providerUserId",
          "type": "bytes32"
        },
        {
          "name": "invoiceCompanyName",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "blockchainActionIdData",
      "outputs": [
        {
          "name": "currency",
          "type": "bytes32"
        },
        {
          "name": "amount",
          "type": "uint256"
        },
        {
          "name": "accountId",
          "type": "bytes32"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "pptFee",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "providerCompanyData",
      "outputs": [
        {
          "name": "companyNumber",
          "type": "bytes32"
        },
        {
          "name": "companyName",
          "type": "bytes32"
        },
        {
          "name": "countryCode",
          "type": "bytes2"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes2"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "invoices",
      "outputs": [
        {
          "name": "providerUserId",
          "type": "bytes32"
        },
        {
          "name": "invoiceCompanyName",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        },
        {
          "name": "_providerUserId",
          "type": "bytes32"
        },
        {
          "name": "_invoiceCountryCode",
          "type": "bytes2"
        },
        {
          "name": "_invoiceCompanyNumber",
          "type": "bytes32"
        },
        {
          "name": "_invoiceCompanyName",
          "type": "bytes32"
        },
        {
          "name": "_invoiceNumber",
          "type": "bytes32"
        }
      ],
      "name": "setInvoice",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        },
        {
          "name": "currency",
          "type": "bytes32"
        },
        {
          "name": "amount",
          "type": "uint256"
        },
        {
          "name": "accountId",
          "type": "bytes32"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "pptFee",
          "type": "uint256"
        }
      ],
      "name": "setBlockchainActionData",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        },
        {
          "name": "_currencyAddress",
          "type": "address"
        },
        {
          "name": "_currencySymbol",
          "type": "bytes32"
        }
      ],
      "name": "_setCurrency",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "actionStatus",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        },
        {
          "name": "_userId",
          "type": "bytes32"
        },
        {
          "name": "_companyNumber",
          "type": "bytes32"
        },
        {
          "name": "_companyName",
          "type": "bytes32"
        },
        {
          "name": "_countryCode",
          "type": "bytes2"
        }
      ],
      "name": "setProvider",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "currencyAddresses",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        },
        {
          "name": "_clientId",
          "type": "bytes32"
        },
        {
          "name": "_depositContract",
          "type": "address"
        }
      ],
      "name": "upgradeDepositAddress",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_currencyAddress",
          "type": "address"
        }
      ],
      "name": "getCurrencyDetails",
      "outputs": [
        {
          "name": "_symbol",
          "type": "bytes32"
        },
        {
          "name": "_name",
          "type": "bytes32"
        },
        {
          "name": "_decimals",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        },
        {
          "name": "_userId",
          "type": "bytes32"
        },
        {
          "name": "_companyNumber",
          "type": "bytes32"
        },
        {
          "name": "_companyName",
          "type": "bytes32"
        },
        {
          "name": "_countryCode",
          "type": "bytes2"
        }
      ],
      "name": "_setProvider",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        }
      ],
      "name": "getActionStatus",
      "outputs": [
        {
          "name": "_blockchainActionStatus",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_providerCountryCode",
          "type": "bytes2"
        },
        {
          "name": "_providerCompanyNumber",
          "type": "bytes32"
        }
      ],
      "name": "getProviderByCountryCodeCompanyNumber",
      "outputs": [
        {
          "name": "providerId",
          "type": "bytes32"
        },
        {
          "name": "companyName",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "depositAddresses",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        },
        {
          "name": "_currencyAddress",
          "type": "address"
        },
        {
          "name": "_currencySymbol",
          "type": "bytes32"
        }
      ],
      "name": "setCurrency",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_blockchainActionId",
          "type": "bytes32"
        },
        {
          "name": "_clientId",
          "type": "bytes32"
        },
        {
          "name": "_depositContract",
          "type": "address"
        }
      ],
      "name": "_setDepositAddress",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_currencySymbol",
          "type": "bytes32"
        }
      ],
      "name": "getCurrency",
      "outputs": [
        {
          "name": "currencyAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "actionIdToInvoiceId",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes2"
        },
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "providerData",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "AM",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_accessManager",
          "type": "address"
        },
        {
          "name": "_version",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ],
  "networks": {
    "3": {
      "events": {},
      "links": {},
      "address": "0x0f8abf5f708f971bd9a994ec3af40988aa0f4873"
    }
  },
}
