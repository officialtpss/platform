/* eslint-disable */

export default {
  "contractName": "DepositContract",
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
      "constant": false,
      "inputs": [
        {
          "name": "_erc1155Token",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_id",
          "type": "uint256"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferERC1155",
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
      "inputs": [],
      "name": "getVersion",
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
      "constant": false,
      "inputs": [
        {
          "name": "_operator",
          "type": "address"
        },
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "onERC721Received",
      "outputs": [
        {
          "name": "",
          "type": "bytes4"
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
          "name": "erc721Token",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferERC721",
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
          "name": "erc1155Token",
          "type": "address"
        },
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "balanceOfERC1155",
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
          "name": "erc721Token",
          "type": "address"
        }
      ],
      "name": "balanceOfERC721",
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
      "inputs": [],
      "name": "getClientId",
      "outputs": [
        {
          "name": "_clientId",
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
      "inputs": [],
      "name": "clientId",
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
          "name": "populousTokenContract",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        },
        {
          "name": "inCollateral",
          "type": "uint256"
        },
        {
          "name": "pptFee",
          "type": "uint256"
        },
        {
          "name": "adminExternalWallet",
          "type": "address"
        },
        {
          "name": "pptAddress",
          "type": "address"
        }
      ],
      "name": "transferEther",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "populousTokenContract",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
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
          "name": "_operator",
          "type": "address"
        },
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_id",
          "type": "uint256"
        },
        {
          "name": "_value",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "onERC1155Received",
      "outputs": [
        {
          "name": "",
          "type": "bytes4"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
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
          "name": "_clientId",
          "type": "bytes32"
        },
        {
          "name": "accessManager",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "pptFee",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "adminExternalWallet",
          "type": "address"
        }
      ],
      "name": "EventEtherTransfer",
      "type": "event"
    }
  ],
  "bytecode": "0x60606040526003600255341561001457600080fd5b604051604080610e71833981016040528080519190602001805160008054600160a060020a03909216600160a060020a03199092169190911790555050600155610e0e806100636000396000f300606060405236156100bf5763ffffffff60e060020a60003504166302ab72c481146100c15780630a7e880c146100e05780630d8e6e2c1461011f578063150b7a02146101445780631aca6376146101e5578063418ae2691461020d578063468f26221461022f578063527fe4131461024e57806354fd4d50146102615780636bb3471a1461027457806370a082311461028757806382a4fe69146102a6578063beabacc8146102dd578063f23a6e6114610305578063f7f01b4b14610376575b005b34156100cc57600080fd5b6100bf600160a060020a03600435166103a5565b34156100eb57600080fd5b61010b600160a060020a0360043581169060243516604435606435610458565b604051901515815260200160405180910390f35b341561012a57600080fd5b6101326105eb565b60405190815260200160405180910390f35b341561014f57600080fd5b6101b0600160a060020a036004803582169160248035909116916044359160849060643590810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506105f195505050505050565b6040517fffffffff00000000000000000000000000000000000000000000000000000000909116815260200160405180910390f35b34156101f057600080fd5b61010b600160a060020a036004358116906024351660443561061a565b341561021857600080fd5b610132600160a060020a03600435166024356107b0565b341561023a57600080fd5b610132600160a060020a0360043516610831565b341561025957600080fd5b6101326108ac565b341561026c57600080fd5b6101326108b2565b341561027f57600080fd5b6101326108b8565b341561029257600080fd5b610132600160a060020a03600435166108be565b34156102b157600080fd5b6100bf600160a060020a0360043581169060243590604435906064359060843581169060a4351661095a565b34156102e857600080fd5b61010b600160a060020a0360043581169060243516604435610c24565b341561031057600080fd5b6101b0600160a060020a0360048035821691602480359091169160443591606435919060a49060843590810190830135806020601f82018190048102016040519081016040528181529291906020840183838082843750949650610da995505050505050565b341561038157600080fd5b610389610dd3565b604051600160a060020a03909116815260200160405180910390f35b60008054600160a060020a03169063fda089589033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561040057600080fd5b6102c65a03f1151561041157600080fd5b50505060405180511515600114905061042957600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60008054600160a060020a031663fda0895833836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156104b157600080fd5b6102c65a03f115156104c257600080fd5b50505060405180511515600114905080610553575060008054600160a060020a0316906305fd22d09033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561053257600080fd5b6102c65a03f1151561054357600080fd5b5050506040518051151560011490505b151561055e57600080fd5b84600160a060020a031663ae28b68c85858560405160e060020a63ffffffff8616028152600160a060020a039093166004840152602483019190915260448201526080606482015260006084820181905260c49091019060405180830381600087803b15156105cc57600080fd5b6102c65a03f115156105dd57600080fd5b506001979650505050505050565b60025490565b7f150b7a0200000000000000000000000000000000000000000000000000000000949350505050565b60008054600160a060020a031663fda0895833836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561067357600080fd5b6102c65a03f1151561068457600080fd5b50505060405180511515600114905080610715575060008054600160a060020a0316906305fd22d09033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156106f457600080fd5b6102c65a03f1151561070557600080fd5b5050506040518051151560011490505b151561072057600080fd5b83600160a060020a031663b88d4fde30858560405160e060020a63ffffffff8616028152600160a060020a03938416600482015291909216602482015260448101919091526080606482015260006084820181905260c49091019060405180830381600087803b151561079257600080fd5b6102c65a03f115156107a357600080fd5b5060019695505050505050565b600082600160a060020a0316633656eec2833060006040516020015260405160e060020a63ffffffff85160281526004810192909252600160a060020a03166024820152604401602060405180830381600087803b151561081057600080fd5b6102c65a03f1151561082157600080fd5b5050506040518051949350505050565b600081600160a060020a03166370a082313060006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561088a57600080fd5b6102c65a03f1151561089b57600080fd5b50505060405180519150505b919050565b60015490565b60025481565b60015481565b6000600160a060020a03821615156108e15750600160a060020a033016316108a7565b81600160a060020a03166370a082313060006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561093857600080fd5b6102c65a03f1151561094957600080fd5b5050506040518051905090506108a7565b60008054600160a060020a031663fda0895833836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156109b357600080fd5b6102c65a03f115156109c457600080fd5b50505060405180511515600114905080610a55575060008054600160a060020a0316906305fd22d09033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610a3457600080fd5b6102c65a03f11515610a4557600080fd5b5050506040518051151560011490505b1515610a6057600080fd5b600160a060020a0330163186901015610a7857600080fd5b600160a060020a03871686156108fc0287604051600060405180830381858888f115156001149350610aad9250505057600080fd5b81600160a060020a03166370a082313060006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610b0457600080fd5b6102c65a03f11515610b1557600080fd5b505050604051805191505080851115610b2d57600080fd5b84810384901015610b3d57600080fd5b81600160a060020a031663a9059cbb848660006040516020015260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401602060405180830381600087803b1515610b9a57600080fd5b6102c65a03f11515610bab57600080fd5b505050604051805115156001149050610bc357600080fd5b7fa8f744480abd19068d60b6e904ee9adad171e023b0e0351fff99e6266ba674cc87878686604051600160a060020a03948516815260208101939093526040808401929092529092166060820152608001905180910390a150505050505050565b60008054600160a060020a031663fda0895833836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610c7d57600080fd5b6102c65a03f11515610c8e57600080fd5b50505060405180511515600114905080610d1f575060008054600160a060020a0316906305fd22d09033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610cfe57600080fd5b6102c65a03f11515610d0f57600080fd5b5050506040518051151560011490505b1515610d2a57600080fd5b83600160a060020a031663a9059cbb848460006040516020015260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401602060405180830381600087803b1515610d8757600080fd5b6102c65a03f11515610d9857600080fd5b505050604051805195945050505050565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b600054600160a060020a0316815600a165627a7a72305820edb35ba23a3b768abd6bf74d43220a7de2744b4e281483feba9dc1d884e316750029",
  "deployedBytecode": "0x606060405236156100bf5763ffffffff60e060020a60003504166302ab72c481146100c15780630a7e880c146100e05780630d8e6e2c1461011f578063150b7a02146101445780631aca6376146101e5578063418ae2691461020d578063468f26221461022f578063527fe4131461024e57806354fd4d50146102615780636bb3471a1461027457806370a082311461028757806382a4fe69146102a6578063beabacc8146102dd578063f23a6e6114610305578063f7f01b4b14610376575b005b34156100cc57600080fd5b6100bf600160a060020a03600435166103a5565b34156100eb57600080fd5b61010b600160a060020a0360043581169060243516604435606435610458565b604051901515815260200160405180910390f35b341561012a57600080fd5b6101326105eb565b60405190815260200160405180910390f35b341561014f57600080fd5b6101b0600160a060020a036004803582169160248035909116916044359160849060643590810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506105f195505050505050565b6040517fffffffff00000000000000000000000000000000000000000000000000000000909116815260200160405180910390f35b34156101f057600080fd5b61010b600160a060020a036004358116906024351660443561061a565b341561021857600080fd5b610132600160a060020a03600435166024356107b0565b341561023a57600080fd5b610132600160a060020a0360043516610831565b341561025957600080fd5b6101326108ac565b341561026c57600080fd5b6101326108b2565b341561027f57600080fd5b6101326108b8565b341561029257600080fd5b610132600160a060020a03600435166108be565b34156102b157600080fd5b6100bf600160a060020a0360043581169060243590604435906064359060843581169060a4351661095a565b34156102e857600080fd5b61010b600160a060020a0360043581169060243516604435610c24565b341561031057600080fd5b6101b0600160a060020a0360048035821691602480359091169160443591606435919060a49060843590810190830135806020601f82018190048102016040519081016040528181529291906020840183838082843750949650610da995505050505050565b341561038157600080fd5b610389610dd3565b604051600160a060020a03909116815260200160405180910390f35b60008054600160a060020a03169063fda089589033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561040057600080fd5b6102c65a03f1151561041157600080fd5b50505060405180511515600114905061042957600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60008054600160a060020a031663fda0895833836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156104b157600080fd5b6102c65a03f115156104c257600080fd5b50505060405180511515600114905080610553575060008054600160a060020a0316906305fd22d09033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561053257600080fd5b6102c65a03f1151561054357600080fd5b5050506040518051151560011490505b151561055e57600080fd5b84600160a060020a031663ae28b68c85858560405160e060020a63ffffffff8616028152600160a060020a039093166004840152602483019190915260448201526080606482015260006084820181905260c49091019060405180830381600087803b15156105cc57600080fd5b6102c65a03f115156105dd57600080fd5b506001979650505050505050565b60025490565b7f150b7a0200000000000000000000000000000000000000000000000000000000949350505050565b60008054600160a060020a031663fda0895833836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561067357600080fd5b6102c65a03f1151561068457600080fd5b50505060405180511515600114905080610715575060008054600160a060020a0316906305fd22d09033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156106f457600080fd5b6102c65a03f1151561070557600080fd5b5050506040518051151560011490505b151561072057600080fd5b83600160a060020a031663b88d4fde30858560405160e060020a63ffffffff8616028152600160a060020a03938416600482015291909216602482015260448101919091526080606482015260006084820181905260c49091019060405180830381600087803b151561079257600080fd5b6102c65a03f115156107a357600080fd5b5060019695505050505050565b600082600160a060020a0316633656eec2833060006040516020015260405160e060020a63ffffffff85160281526004810192909252600160a060020a03166024820152604401602060405180830381600087803b151561081057600080fd5b6102c65a03f1151561082157600080fd5b5050506040518051949350505050565b600081600160a060020a03166370a082313060006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561088a57600080fd5b6102c65a03f1151561089b57600080fd5b50505060405180519150505b919050565b60015490565b60025481565b60015481565b6000600160a060020a03821615156108e15750600160a060020a033016316108a7565b81600160a060020a03166370a082313060006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561093857600080fd5b6102c65a03f1151561094957600080fd5b5050506040518051905090506108a7565b60008054600160a060020a031663fda0895833836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156109b357600080fd5b6102c65a03f115156109c457600080fd5b50505060405180511515600114905080610a55575060008054600160a060020a0316906305fd22d09033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610a3457600080fd5b6102c65a03f11515610a4557600080fd5b5050506040518051151560011490505b1515610a6057600080fd5b600160a060020a0330163186901015610a7857600080fd5b600160a060020a03871686156108fc0287604051600060405180830381858888f115156001149350610aad9250505057600080fd5b81600160a060020a03166370a082313060006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610b0457600080fd5b6102c65a03f11515610b1557600080fd5b505050604051805191505080851115610b2d57600080fd5b84810384901015610b3d57600080fd5b81600160a060020a031663a9059cbb848660006040516020015260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401602060405180830381600087803b1515610b9a57600080fd5b6102c65a03f11515610bab57600080fd5b505050604051805115156001149050610bc357600080fd5b7fa8f744480abd19068d60b6e904ee9adad171e023b0e0351fff99e6266ba674cc87878686604051600160a060020a03948516815260208101939093526040808401929092529092166060820152608001905180910390a150505050505050565b60008054600160a060020a031663fda0895833836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610c7d57600080fd5b6102c65a03f11515610c8e57600080fd5b50505060405180511515600114905080610d1f575060008054600160a060020a0316906305fd22d09033906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610cfe57600080fd5b6102c65a03f11515610d0f57600080fd5b5050506040518051151560011490505b1515610d2a57600080fd5b83600160a060020a031663a9059cbb848460006040516020015260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401602060405180830381600087803b1515610d8757600080fd5b6102c65a03f11515610d9857600080fd5b505050604051805195945050505050565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b600054600160a060020a0316815600a165627a7a72305820edb35ba23a3b768abd6bf74d43220a7de2744b4e281483feba9dc1d884e316750029",
  "sourceMap": "177:7498:4:-;;;298:1;273:26;;685:144;;;;;;;;;;;;;;;;;;;;;;;;;;;;1314:2:14;:34;;-1:-1:-1;;;;;1314:34:14;;;-1:-1:-1;;;;;;1314:34:14;;;;;;;;;-1:-1:-1;;1314:34:14;802:20:4;177:7498;;;;;;",
  "deployedSourceMap": "177:7498:4:-;;;;;;;-1:-1:-1;;;177:7498:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1507:122:14;;;;;;;;;;;;-1:-1:-1;;;;;1507:122:14;;;1561:249:4;;;;;;;;;;-1:-1:-1;;;;;1561:249:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7357:83;;;;;;;;;;;;;;;;;;;;;;;;;;;2599:149;;;;;;;;;;-1:-1:-1;;;;;2599:149:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2599:149:4;;-1:-1:-1;2599:149:4;;-1:-1:-1;;;;;;2599:149:4;;;;;;;;;;;;;;;;;;;4400:326;;;;;;;;;;-1:-1:-1;;;;;4400:326:4;;;;;;;;;;;;7048:207;;;;;;;;;;;;-1:-1:-1;;;;;7048:207:4;;;;;6624:185;;;;;;;;;;;;-1:-1:-1;;;;;6624:185:4;;;7578:95;;;;;;;;;;;;273:26;;;;;;;;;;;;230:23;;;;;;;;;;;;6101:316;;;;;;;;;;;;-1:-1:-1;;;;;6101:316:4;;;4996:680;;;;;;;;;;-1:-1:-1;;;;;4996:680:4;;;;;;;;;;;;;;;;;;;;;;;;1264:226;;;;;;;;;;-1:-1:-1;;;;;1264:226:4;;;;;;;;;;;;3591:160;;;;;;;;;;;;;-1:-1:-1;;;;;3591:160:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;3591:160:4;;-1:-1:-1;3591:160:4;;-1:-1:-1;;;;;;3591:160:4;149:23:14;;;;;;;;;;;;;;;-1:-1:-1;;;;;149:23:14;;;;;;;;;;;;;;;1507:122;376:2;;;-1:-1:-1;;;;;376:2:14;;:11;;388:10;;376:23;;;;;;;;;;-1:-1:-1;;;376:23:14;;;-1:-1:-1;;;;;376:23:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:31;;403:4;376:31;;-1:-1:-1;368:40:14;;;;;;1588:2;:34;;-1:-1:-1;;1588:34:14;-1:-1:-1;;;;;1588:34:14;;;;;;;;;;1507:122::o;1561:249:4:-;1701:12;484:2:14;;-1:-1:-1;;;;;484:2:14;:11;496:10;1701:12:4;484:23:14;;;;;;;;;;-1:-1:-1;;;484:23:14;;;-1:-1:-1;;;;;484:23:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:31;;511:4;484:31;;-1:-1:-1;484:31:14;:68;;-1:-1:-1;519:2:14;;;-1:-1:-1;;;;;519:2:14;;:13;;533:10;;519:25;;;;;;;;;;-1:-1:-1;;;519:25:14;;;-1:-1:-1;;;;;519:25:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:33;;548:4;519:33;;-1:-1:-1;484:68:14;476:77;;;;;;;;-1:-1:-1;;;;;1725:35:4;;;1761:3;1766;1771:6;1725:57;;;;;-1:-1:-1;;;1725:57:4;;;-1:-1:-1;;;;;1725:57:4;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;1725:57:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;1799:4:4;;1561:249;-1:-1:-1;;;;;;;1561:249:4:o;7357:83::-;7426:7;;7357:83;:::o;2599:149::-;2723:17;2599:149;;;;;;:::o;4400:326::-;4555:12;484:2:14;;-1:-1:-1;;;;;484:2:14;:11;496:10;4555:12:4;484:23:14;;;;;;;;;;-1:-1:-1;;;484:23:14;;;-1:-1:-1;;;;;484:23:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:31;;511:4;484:31;;-1:-1:-1;484:31:14;:68;;-1:-1:-1;519:2:14;;;-1:-1:-1;;;;;519:2:14;;:13;;533:10;;519:25;;;;;;;;;;-1:-1:-1;;;519:25:14;;;-1:-1:-1;;;;;519:25:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:33;;548:4;519:33;;-1:-1:-1;484:68:14;476:77;;;;;;;;-1:-1:-1;;;;;4632:41:4;;;4674:4;4680:3;4685:8;4632:66;;;;;-1:-1:-1;;;4632:66:4;;;-1:-1:-1;;;;;4632:66:4;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;4632:66:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;4715:4:4;;4400:326;-1:-1:-1;;;;;;4400:326:4:o;7048:207::-;7132:7;-1:-1:-1;;;;;7158:31:4;;;7190:3;7195:4;7132:7;7158:42;;;;;;;;;;-1:-1:-1;;;7158:42:4;;;;;;;;;;-1:-1:-1;;;;;7158:42:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7048:207;-1:-1:-1;;;;7048:207:4:o;6624:185::-;6691:7;-1:-1:-1;;;;;6717:34:4;;;6752:4;6691:7;6717:40;;;;;;;;;;-1:-1:-1;;;6717:40:4;;;-1:-1:-1;;;;;6717:40:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;6624:185:4;;;;:::o;7578:95::-;7658:8;;7578:95;:::o;273:26::-;;;;:::o;230:23::-;;;;:::o;6101:316::-;6172:7;-1:-1:-1;;;;;6212:35:4;;;6208:203;;;-1:-1:-1;6278:4:4;-1:-1:-1;;;;;6270:21:4;;6263:28;;6208:203;-1:-1:-1;;;;;6350:44:4;;;6395:4;6350:50;;;;;;;;;;;-1:-1:-1;;;6350:50:4;;;-1:-1:-1;;;;;6350:50:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6343:57;;;;4996:680;5326:18;484:2:14;;-1:-1:-1;;;;;484:2:14;:11;496:10;5326:18:4;484:23:14;;;;;;;;;;-1:-1:-1;;;484:23:14;;;-1:-1:-1;;;;;484:23:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:31;;511:4;484:31;;-1:-1:-1;484:31:14;:68;;-1:-1:-1;519:2:14;;;-1:-1:-1;;;;;519:2:14;;:13;;533:10;;519:25;;;;;;;;;;-1:-1:-1;;;519:25:14;;;-1:-1:-1;;;;;519:25:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:33;;548:4;519:33;;-1:-1:-1;484:68:14;476:77;;;;;;;;5235:4:4;-1:-1:-1;;;;;5235:12:4;;:22;;;;5227:31;;;;;;-1:-1:-1;;;;;5282:8:4;;:16;;;;;;;;;;;;;;;;;;:24;;5302:4;5282:24;;-1:-1:-1;5274:33:4;;-1:-1:-1;;;5274:33:4;;;;;-1:-1:-1;;;;;5347:33:4;;;5381:4;5347:39;;;;;;;;;;;-1:-1:-1;;;5347:39:4;;;-1:-1:-1;;;;;5347:39:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;5404:26:4;;;;5396:35;;;;;;5450:25;;;5449:37;;;;5441:46;;;;;;-1:-1:-1;;;;;5505:32:4;;;5538:19;5559:6;5505:61;;;;;;;;;;;-1:-1:-1;;;5505:61:4;;;-1:-1:-1;;;;;5505:61:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:69;;5570:4;5505:69;;-1:-1:-1;5497:78:4;;;;;;5586:60;5605:3;5610:6;5618;5626:19;5586:60;;-1:-1:-1;;;;;5586:60:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4996:680;;;;;;;:::o;1264:226::-;1391:12;484:2:14;;-1:-1:-1;;;;;484:2:14;:11;496:10;1391:12:4;484:23:14;;;;;;;;;;-1:-1:-1;;;484:23:14;;;-1:-1:-1;;;;;484:23:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:31;;511:4;484:31;;-1:-1:-1;484:31:14;:68;;-1:-1:-1;519:2:14;;;-1:-1:-1;;;;;519:2:14;;:13;;533:10;;519:25;;;;;;;;;;-1:-1:-1;;;519:25:14;;;-1:-1:-1;;;;;519:25:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:33;;548:4;519:33;;-1:-1:-1;484:68:14;476:77;;;;;;;;-1:-1:-1;;;;;1427:43:4;;;1471:3;1476:6;1427:56;;;;;;;;;;;-1:-1:-1;;;1427:56:4;;;-1:-1:-1;;;;;1427:56:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1264:226;-1:-1:-1;;;;;1264:226:4:o;3591:160::-;3727:17;3591:160;;;;;;;:::o;149:23:14:-;;;-1:-1:-1;;;;;149:23:14;;:::o",
  "source": "pragma solidity ^0.4.17;\n\nimport \"./iERC20Token.sol\";\nimport \"./withAccessManager.sol\";\nimport \"./ERC1155.sol\";\nimport \"./ERC721Basic.sol\";\n\n/// @title DepositContract contract\ncontract DepositContract is withAccessManager {\n\n    bytes32 public clientId; // client ID.\n    uint256 public version = 3;\n\n    // EVENTS\n    event EventEtherTransfer(address to, uint256 value, uint256 pptFee, address adminExternalWallet);\n\n    // NON-CONSTANT METHODS \n\n    /** @dev Constructor that sets the _clientID when the contract is deployed.\n      * @dev The method also sets the manager to the msg.sender.\n      * @param _clientId A string of fixed length representing the client ID.\n      */\n    function DepositContract(bytes32 _clientId, address accessManager) public withAccessManager(accessManager) {\n        clientId = _clientId;\n    }\n     \n    /** @dev Transfers an amount '_value' of tokens from msg.sender to '_to' address/wallet.\n      * @param populousTokenContract The address of the ERC20 token contract which implements the transfer method.\n      * @param _value the amount of tokens to transfer.\n      * @param _to The address/wallet to send to.\n      * @return success boolean true or false indicating whether the transfer was successful or not.\n      */\n    function transfer(address populousTokenContract, address _to, uint256 _value) public\n        onlyServerOrOnlyPopulous returns (bool success) \n    {\n        return iERC20Token(populousTokenContract).transfer(_to, _value);\n    }\n\n    /** @dev This function will transfer iERC1155 tokens\n     */\n    function transferERC1155(address _erc1155Token, address _to, uint256 _id, uint256 _value) \n        public onlyServerOrOnlyPopulous returns (bool success) {\n        ERC1155(_erc1155Token).safeTransfer(_to, _id, _value, \"\");\n        return true;\n    }\n\n    /**\n    * @notice Handle the receipt of an NFT\n    * @dev The ERC721 smart contract calls this function on the recipient\n    * after a `safetransfer` if the recipient is a smart contract. This function MAY throw to revert and reject the\n    * transfer. Return of other than the magic value (0x150b7a02) MUST result in the\n    * transaction being reverted.\n    * Note: the contract address is always the message sender.\n    * @param _operator The address which called `safeTransferFrom` function\n    * @param _from The address which previously owned the token\n    * @param _tokenId The NFT identifier which is being transferred\n    * @param _data Additional data with no specified format\n    * @return `bytes4(keccak256(\"onERC721Received(address,address,uint256,bytes)\"))`\n    */\n    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes _data) public returns(bytes4) {\n        return 0x150b7a02; \n    }\n\n    /// @notice Handle the receipt of an ERC1155 type\n    /// @dev The smart contract calls this function on the recipient\n    ///  after a `safeTransfer`. This function MAY throw to revert and reject the\n    ///  transfer. Return of other than the magic value MUST result in the\n    ///  transaction being reverted.\n    ///  Note: the contract address is always the message sender.\n    /// @param _operator The address which called `safeTransferFrom` function\n    /// @param _from The address which previously owned the token\n    /// @param _id The identifier of the item being transferred\n    /// @param _value The amount of the item being transferred\n    /// @param _data Additional data with no specified format\n    /// @return `bytes4(keccak256(\"onERC1155Received(address,address,uint256,uint256,bytes)\"))`\n    ///  unless throwing\n    function onERC1155Received(address _operator, address _from, uint256 _id, uint256 _value, bytes _data) public returns(bytes4) {\n        return 0xf23a6e61;\n    }\n\n    /**\n    * @dev Safely transfers the ownership of a given token ID to another address\n    * If the target address is a contract, it must implement `onERC721Received`,\n    * which is called upon a safe transfer, and return the magic value\n    * `bytes4(keccak256(\"onERC721Received(address,address,uint256,bytes)\"))`; otherwise,\n    * the transfer is reverted.\n    *\n    * Requires the msg sender to be the owner, approved, or operator\n    * @param erc721Token address of the erc721 token to target\n    * @param _to address to receive the ownership of the given token ID\n    * @param _tokenId uint256 ID of the token to be transferred\n    */\n    function transferERC721(\n        address erc721Token,\n        address _to,\n        uint256 _tokenId\n    )\n        public onlyServerOrOnlyPopulous returns (bool success)\n    {\n        // solium-disable-next-line arg-overflow\n        ERC721Basic(erc721Token).safeTransferFrom(this, _to, _tokenId, \"\");\n        return true;\n    }\n\n    /** @dev Transfers ether from this contract to a specified wallet/address\n      * @param _to An address implementing to send ether to.\n      * @param _value The amount of ether to send in wei. \n      * @return bool Successful or unsuccessful transfer\n      */\n    function transferEther(\n        address _to, uint256 _value,\n        uint256 inCollateral,\n        uint256 pptFee, address adminExternalWallet, address pptAddress) \n        public \n        onlyServerOrOnlyPopulous\n    {   \n        require(this.balance >= _value);      \n        require(_to.send(_value) == true);\n        \n        uint256 pptBalance = iERC20Token(pptAddress).balanceOf(this);\n        require(inCollateral <= pptBalance);\n        require((pptBalance - inCollateral) >= pptFee);\n        require(iERC20Token(pptAddress).transfer(adminExternalWallet, pptFee) == true);\n\n        EventEtherTransfer(_to, _value, pptFee, adminExternalWallet);\n        //return true;\n    }\n\n    // payable function to allow this contract receive ether\n    function () public payable {}\n\n    // CONSTANT METHODS\n    \n    /** @dev Returns the ether or token balance of the current contract instance using the ERC20 balanceOf method.\n      * @param populousTokenContract An address implementing the ERC20 token standard. \n      * @return uint An unsigned integer representing the returned token balance.\n      */\n    function balanceOf(address populousTokenContract) public view returns (uint256) {\n        // ether\n        if (populousTokenContract == address(0)) {\n            return address(this).balance;\n        } else {\n            // erc20\n            return iERC20Token(populousTokenContract).balanceOf(this);\n        }\n    }\n\n    /**\n    * @dev Gets the balance of the specified address\n    * @param erc721Token address to erc721 token to target\n    * @return uint256 representing the amount owned by the passed address\n    */\n    function balanceOfERC721(address erc721Token) public view returns (uint256) {\n        return ERC721Basic(erc721Token).balanceOf(this);\n        // returns ownedTokensCount[_owner];\n    }\n\n    /**\n    * @dev Gets the balance of the specified address\n    * @param _id the token id\n    * @param erc1155Token address to erc1155 token to target\n    * @return uint256 representing the amount owned by the passed address\n    */\n    function balanceOfERC1155(address erc1155Token, uint256 _id) external view returns (uint256) {\n        return ERC1155(erc1155Token).balanceOf(_id, this);\n        // returns items[_id].balances[_owner];\n    }\n\n    /** @dev Gets the version of this deposit contract\n      * @return uint256 version\n      */\n    function getVersion() public view returns (uint256) {\n        return version;\n    }\n\n    // CONSTANT FUNCTIONS\n\n    /** @dev This function gets the client ID or deposit contract owner\n     * returns _clientId\n     */\n    function getClientId() public view returns (bytes32 _clientId) {\n        return clientId;\n    }\n}",
  "sourcePath": "/Users/najienka/Desktop/populous-smartcontracts/contracts/DepositContract.sol",
  "ast": {
    "attributes": {
      "absolutePath": "/Users/najienka/Desktop/populous-smartcontracts/contracts/DepositContract.sol",
      "exportedSymbols": {
        "DepositContract": [
          1781
        ]
      }
    },
    "children": [
      {
        "attributes": {
          "literals": [
            "solidity",
            "^",
            "0.4",
            ".17"
          ]
        },
        "id": 1476,
        "name": "PragmaDirective",
        "src": "0:24:4"
      },
      {
        "attributes": {
          "SourceUnit": 5275,
          "absolutePath": "/Users/najienka/Desktop/populous-smartcontracts/contracts/iERC20Token.sol",
          "file": "./iERC20Token.sol",
          "scope": 1782,
          "symbolAliases": [
            null
          ],
          "unitAlias": ""
        },
        "id": 1477,
        "name": "ImportDirective",
        "src": "26:27:4"
      },
      {
        "attributes": {
          "SourceUnit": 5357,
          "absolutePath": "/Users/najienka/Desktop/populous-smartcontracts/contracts/withAccessManager.sol",
          "file": "./withAccessManager.sol",
          "scope": 1782,
          "symbolAliases": [
            null
          ],
          "unitAlias": ""
        },
        "id": 1478,
        "name": "ImportDirective",
        "src": "54:33:4"
      },
      {
        "attributes": {
          "SourceUnit": 3258,
          "absolutePath": "/Users/najienka/Desktop/populous-smartcontracts/contracts/ERC1155.sol",
          "file": "./ERC1155.sol",
          "scope": 1782,
          "symbolAliases": [
            null
          ],
          "unitAlias": ""
        },
        "id": 1479,
        "name": "ImportDirective",
        "src": "88:23:4"
      },
      {
        "attributes": {
          "SourceUnit": 3484,
          "absolutePath": "/Users/najienka/Desktop/populous-smartcontracts/contracts/ERC721Basic.sol",
          "file": "./ERC721Basic.sol",
          "scope": 1782,
          "symbolAliases": [
            null
          ],
          "unitAlias": ""
        },
        "id": 1480,
        "name": "ImportDirective",
        "src": "112:27:4"
      },
      {
        "attributes": {
          "contractDependencies": [
            5356
          ],
          "contractKind": "contract",
          "documentation": "@title DepositContract contract",
          "fullyImplemented": true,
          "linearizedBaseContracts": [
            1781,
            5356
          ],
          "name": "DepositContract",
          "scope": 1782
        },
        "children": [
          {
            "attributes": {
              "arguments": [
                null
              ]
            },
            "children": [
              {
                "attributes": {
                  "contractScope": null,
                  "name": "withAccessManager",
                  "referencedDeclaration": 5356,
                  "type": "contract withAccessManager"
                },
                "id": 1481,
                "name": "UserDefinedTypeName",
                "src": "205:17:4"
              }
            ],
            "id": 1482,
            "name": "InheritanceSpecifier",
            "src": "205:17:4"
          },
          {
            "attributes": {
              "constant": false,
              "name": "clientId",
              "scope": 1781,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "bytes32",
              "value": null,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "name": "bytes32",
                  "type": "bytes32"
                },
                "id": 1483,
                "name": "ElementaryTypeName",
                "src": "230:7:4"
              }
            ],
            "id": 1484,
            "name": "VariableDeclaration",
            "src": "230:23:4"
          },
          {
            "attributes": {
              "constant": false,
              "name": "version",
              "scope": 1781,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "uint256",
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "name": "uint256",
                  "type": "uint256"
                },
                "id": 1485,
                "name": "ElementaryTypeName",
                "src": "273:7:4"
              },
              {
                "attributes": {
                  "argumentTypes": null,
                  "hexvalue": "33",
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "lValueRequested": false,
                  "subdenomination": null,
                  "token": "number",
                  "type": "int_const 3",
                  "value": "3"
                },
                "id": 1486,
                "name": "Literal",
                "src": "298:1:4"
              }
            ],
            "id": 1487,
            "name": "VariableDeclaration",
            "src": "273:26:4"
          },
          {
            "attributes": {
              "anonymous": false,
              "name": "EventEtherTransfer"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "to",
                      "scope": 1497,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1488,
                        "name": "ElementaryTypeName",
                        "src": "345:7:4"
                      }
                    ],
                    "id": 1489,
                    "name": "VariableDeclaration",
                    "src": "345:10:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "value",
                      "scope": 1497,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1490,
                        "name": "ElementaryTypeName",
                        "src": "357:7:4"
                      }
                    ],
                    "id": 1491,
                    "name": "VariableDeclaration",
                    "src": "357:13:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "pptFee",
                      "scope": 1497,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1492,
                        "name": "ElementaryTypeName",
                        "src": "372:7:4"
                      }
                    ],
                    "id": 1493,
                    "name": "VariableDeclaration",
                    "src": "372:14:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "adminExternalWallet",
                      "scope": 1497,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1494,
                        "name": "ElementaryTypeName",
                        "src": "388:7:4"
                      }
                    ],
                    "id": 1495,
                    "name": "VariableDeclaration",
                    "src": "388:27:4"
                  }
                ],
                "id": 1496,
                "name": "ParameterList",
                "src": "344:72:4"
              }
            ],
            "id": 1497,
            "name": "EventDefinition",
            "src": "320:97:4"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": true,
              "name": "DepositContract",
              "payable": false,
              "scope": 1781,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_clientId",
                      "scope": 1512,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 1498,
                        "name": "ElementaryTypeName",
                        "src": "710:7:4"
                      }
                    ],
                    "id": 1499,
                    "name": "VariableDeclaration",
                    "src": "710:17:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "accessManager",
                      "scope": 1512,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1500,
                        "name": "ElementaryTypeName",
                        "src": "729:7:4"
                      }
                    ],
                    "id": 1501,
                    "name": "VariableDeclaration",
                    "src": "729:21:4"
                  }
                ],
                "id": 1502,
                "name": "ParameterList",
                "src": "709:42:4"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 1506,
                "name": "ParameterList",
                "src": "792:0:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "argumentTypes": null,
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 5356,
                      "type": "type(contract withAccessManager)",
                      "value": "withAccessManager"
                    },
                    "id": 1503,
                    "name": "Identifier",
                    "src": "759:17:4"
                  },
                  {
                    "attributes": {
                      "argumentTypes": null,
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 1501,
                      "type": "address",
                      "value": "accessManager"
                    },
                    "id": 1504,
                    "name": "Identifier",
                    "src": "777:13:4"
                  }
                ],
                "id": 1505,
                "name": "ModifierInvocation",
                "src": "759:32:4"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "bytes32"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1484,
                              "type": "bytes32",
                              "value": "clientId"
                            },
                            "id": 1507,
                            "name": "Identifier",
                            "src": "802:8:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1499,
                              "type": "bytes32",
                              "value": "_clientId"
                            },
                            "id": 1508,
                            "name": "Identifier",
                            "src": "813:9:4"
                          }
                        ],
                        "id": 1509,
                        "name": "Assignment",
                        "src": "802:20:4"
                      }
                    ],
                    "id": 1510,
                    "name": "ExpressionStatement",
                    "src": "802:20:4"
                  }
                ],
                "id": 1511,
                "name": "Block",
                "src": "792:37:4"
              }
            ],
            "id": 1512,
            "name": "FunctionDefinition",
            "src": "685:144:4"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "name": "transfer",
              "payable": false,
              "scope": 1781,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "populousTokenContract",
                      "scope": 1534,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1513,
                        "name": "ElementaryTypeName",
                        "src": "1282:7:4"
                      }
                    ],
                    "id": 1514,
                    "name": "VariableDeclaration",
                    "src": "1282:29:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_to",
                      "scope": 1534,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1515,
                        "name": "ElementaryTypeName",
                        "src": "1313:7:4"
                      }
                    ],
                    "id": 1516,
                    "name": "VariableDeclaration",
                    "src": "1313:11:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_value",
                      "scope": 1534,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1517,
                        "name": "ElementaryTypeName",
                        "src": "1326:7:4"
                      }
                    ],
                    "id": 1518,
                    "name": "VariableDeclaration",
                    "src": "1326:14:4"
                  }
                ],
                "id": 1519,
                "name": "ParameterList",
                "src": "1281:60:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "success",
                      "scope": 1534,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 1522,
                        "name": "ElementaryTypeName",
                        "src": "1391:4:4"
                      }
                    ],
                    "id": 1523,
                    "name": "VariableDeclaration",
                    "src": "1391:12:4"
                  }
                ],
                "id": 1524,
                "name": "ParameterList",
                "src": "1390:14:4"
              },
              {
                "attributes": {
                  "arguments": [
                    null
                  ]
                },
                "children": [
                  {
                    "attributes": {
                      "argumentTypes": null,
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 5315,
                      "type": "modifier ()",
                      "value": "onlyServerOrOnlyPopulous"
                    },
                    "id": 1520,
                    "name": "Identifier",
                    "src": "1357:24:4"
                  }
                ],
                "id": 1521,
                "name": "ModifierInvocation",
                "src": "1357:24:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 1524
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "bool",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "transfer",
                              "referencedDeclaration": 5221,
                              "type": "function (address,uint256) external returns (bool)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "type": "contract iERC20Token",
                                  "type_conversion": true
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_address",
                                          "typeString": "address"
                                        }
                                      ],
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5274,
                                      "type": "type(contract iERC20Token)",
                                      "value": "iERC20Token"
                                    },
                                    "id": 1525,
                                    "name": "Identifier",
                                    "src": "1427:11:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 1514,
                                      "type": "address",
                                      "value": "populousTokenContract"
                                    },
                                    "id": 1526,
                                    "name": "Identifier",
                                    "src": "1439:21:4"
                                  }
                                ],
                                "id": 1527,
                                "name": "FunctionCall",
                                "src": "1427:34:4"
                              }
                            ],
                            "id": 1528,
                            "name": "MemberAccess",
                            "src": "1427:43:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1516,
                              "type": "address",
                              "value": "_to"
                            },
                            "id": 1529,
                            "name": "Identifier",
                            "src": "1471:3:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1518,
                              "type": "uint256",
                              "value": "_value"
                            },
                            "id": 1530,
                            "name": "Identifier",
                            "src": "1476:6:4"
                          }
                        ],
                        "id": 1531,
                        "name": "FunctionCall",
                        "src": "1427:56:4"
                      }
                    ],
                    "id": 1532,
                    "name": "Return",
                    "src": "1420:63:4"
                  }
                ],
                "id": 1533,
                "name": "Block",
                "src": "1410:80:4"
              }
            ],
            "id": 1534,
            "name": "FunctionDefinition",
            "src": "1264:226:4"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "name": "transferERC1155",
              "payable": false,
              "scope": 1781,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_erc1155Token",
                      "scope": 1562,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1535,
                        "name": "ElementaryTypeName",
                        "src": "1586:7:4"
                      }
                    ],
                    "id": 1536,
                    "name": "VariableDeclaration",
                    "src": "1586:21:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_to",
                      "scope": 1562,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1537,
                        "name": "ElementaryTypeName",
                        "src": "1609:7:4"
                      }
                    ],
                    "id": 1538,
                    "name": "VariableDeclaration",
                    "src": "1609:11:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_id",
                      "scope": 1562,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1539,
                        "name": "ElementaryTypeName",
                        "src": "1622:7:4"
                      }
                    ],
                    "id": 1540,
                    "name": "VariableDeclaration",
                    "src": "1622:11:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_value",
                      "scope": 1562,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1541,
                        "name": "ElementaryTypeName",
                        "src": "1635:7:4"
                      }
                    ],
                    "id": 1542,
                    "name": "VariableDeclaration",
                    "src": "1635:14:4"
                  }
                ],
                "id": 1543,
                "name": "ParameterList",
                "src": "1585:65:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "success",
                      "scope": 1562,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 1546,
                        "name": "ElementaryTypeName",
                        "src": "1701:4:4"
                      }
                    ],
                    "id": 1547,
                    "name": "VariableDeclaration",
                    "src": "1701:12:4"
                  }
                ],
                "id": 1548,
                "name": "ParameterList",
                "src": "1700:14:4"
              },
              {
                "attributes": {
                  "arguments": [
                    null
                  ]
                },
                "children": [
                  {
                    "attributes": {
                      "argumentTypes": null,
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 5315,
                      "type": "modifier ()",
                      "value": "onlyServerOrOnlyPopulous"
                    },
                    "id": 1544,
                    "name": "Identifier",
                    "src": "1667:24:4"
                  }
                ],
                "id": 1545,
                "name": "ModifierInvocation",
                "src": "1667:24:4"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                                  "typeString": "literal_string \"\""
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "safeTransfer",
                              "referencedDeclaration": 2247,
                              "type": "function (address,uint256,uint256,bytes memory) external"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "type": "contract ERC1155",
                                  "type_conversion": true
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_address",
                                          "typeString": "address"
                                        }
                                      ],
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3257,
                                      "type": "type(contract ERC1155)",
                                      "value": "ERC1155"
                                    },
                                    "id": 1549,
                                    "name": "Identifier",
                                    "src": "1725:7:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 1536,
                                      "type": "address",
                                      "value": "_erc1155Token"
                                    },
                                    "id": 1550,
                                    "name": "Identifier",
                                    "src": "1733:13:4"
                                  }
                                ],
                                "id": 1551,
                                "name": "FunctionCall",
                                "src": "1725:22:4"
                              }
                            ],
                            "id": 1552,
                            "name": "MemberAccess",
                            "src": "1725:35:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1538,
                              "type": "address",
                              "value": "_to"
                            },
                            "id": 1553,
                            "name": "Identifier",
                            "src": "1761:3:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1540,
                              "type": "uint256",
                              "value": "_id"
                            },
                            "id": 1554,
                            "name": "Identifier",
                            "src": "1766:3:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1542,
                              "type": "uint256",
                              "value": "_value"
                            },
                            "id": 1555,
                            "name": "Identifier",
                            "src": "1771:6:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "string",
                              "type": "literal_string \"\"",
                              "value": ""
                            },
                            "id": 1556,
                            "name": "Literal",
                            "src": "1779:2:4"
                          }
                        ],
                        "id": 1557,
                        "name": "FunctionCall",
                        "src": "1725:57:4"
                      }
                    ],
                    "id": 1558,
                    "name": "ExpressionStatement",
                    "src": "1725:57:4"
                  },
                  {
                    "attributes": {
                      "functionReturnParameters": 1548
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "74727565",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "bool",
                          "type": "bool",
                          "value": "true"
                        },
                        "id": 1559,
                        "name": "Literal",
                        "src": "1799:4:4"
                      }
                    ],
                    "id": 1560,
                    "name": "Return",
                    "src": "1792:11:4"
                  }
                ],
                "id": 1561,
                "name": "Block",
                "src": "1715:95:4"
              }
            ],
            "id": 1562,
            "name": "FunctionDefinition",
            "src": "1561:249:4"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "onERC721Received",
              "payable": false,
              "scope": 1781,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_operator",
                      "scope": 1578,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1563,
                        "name": "ElementaryTypeName",
                        "src": "2625:7:4"
                      }
                    ],
                    "id": 1564,
                    "name": "VariableDeclaration",
                    "src": "2625:17:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_from",
                      "scope": 1578,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1565,
                        "name": "ElementaryTypeName",
                        "src": "2644:7:4"
                      }
                    ],
                    "id": 1566,
                    "name": "VariableDeclaration",
                    "src": "2644:13:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 1578,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1567,
                        "name": "ElementaryTypeName",
                        "src": "2659:7:4"
                      }
                    ],
                    "id": 1568,
                    "name": "VariableDeclaration",
                    "src": "2659:16:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_data",
                      "scope": 1578,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes",
                          "type": "bytes storage pointer"
                        },
                        "id": 1569,
                        "name": "ElementaryTypeName",
                        "src": "2677:5:4"
                      }
                    ],
                    "id": 1570,
                    "name": "VariableDeclaration",
                    "src": "2677:11:4"
                  }
                ],
                "id": 1571,
                "name": "ParameterList",
                "src": "2624:65:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 1578,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes4",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes4",
                          "type": "bytes4"
                        },
                        "id": 1572,
                        "name": "ElementaryTypeName",
                        "src": "2705:6:4"
                      }
                    ],
                    "id": 1573,
                    "name": "VariableDeclaration",
                    "src": "2705:6:4"
                  }
                ],
                "id": 1574,
                "name": "ParameterList",
                "src": "2704:8:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 1574
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "30783135306237613032",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "number",
                          "type": "int_const 353073666",
                          "value": "0x150b7a02"
                        },
                        "id": 1575,
                        "name": "Literal",
                        "src": "2730:10:4"
                      }
                    ],
                    "id": 1576,
                    "name": "Return",
                    "src": "2723:17:4"
                  }
                ],
                "id": 1577,
                "name": "Block",
                "src": "2713:35:4"
              }
            ],
            "id": 1578,
            "name": "FunctionDefinition",
            "src": "2599:149:4"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "onERC1155Received",
              "payable": false,
              "scope": 1781,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_operator",
                      "scope": 1596,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1579,
                        "name": "ElementaryTypeName",
                        "src": "3618:7:4"
                      }
                    ],
                    "id": 1580,
                    "name": "VariableDeclaration",
                    "src": "3618:17:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_from",
                      "scope": 1596,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1581,
                        "name": "ElementaryTypeName",
                        "src": "3637:7:4"
                      }
                    ],
                    "id": 1582,
                    "name": "VariableDeclaration",
                    "src": "3637:13:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_id",
                      "scope": 1596,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1583,
                        "name": "ElementaryTypeName",
                        "src": "3652:7:4"
                      }
                    ],
                    "id": 1584,
                    "name": "VariableDeclaration",
                    "src": "3652:11:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_value",
                      "scope": 1596,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1585,
                        "name": "ElementaryTypeName",
                        "src": "3665:7:4"
                      }
                    ],
                    "id": 1586,
                    "name": "VariableDeclaration",
                    "src": "3665:14:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_data",
                      "scope": 1596,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes",
                          "type": "bytes storage pointer"
                        },
                        "id": 1587,
                        "name": "ElementaryTypeName",
                        "src": "3681:5:4"
                      }
                    ],
                    "id": 1588,
                    "name": "VariableDeclaration",
                    "src": "3681:11:4"
                  }
                ],
                "id": 1589,
                "name": "ParameterList",
                "src": "3617:76:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 1596,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes4",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes4",
                          "type": "bytes4"
                        },
                        "id": 1590,
                        "name": "ElementaryTypeName",
                        "src": "3709:6:4"
                      }
                    ],
                    "id": 1591,
                    "name": "VariableDeclaration",
                    "src": "3709:6:4"
                  }
                ],
                "id": 1592,
                "name": "ParameterList",
                "src": "3708:8:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 1592
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "30786632336136653631",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "number",
                          "type": "int_const 4063915617",
                          "value": "0xf23a6e61"
                        },
                        "id": 1593,
                        "name": "Literal",
                        "src": "3734:10:4"
                      }
                    ],
                    "id": 1594,
                    "name": "Return",
                    "src": "3727:17:4"
                  }
                ],
                "id": 1595,
                "name": "Block",
                "src": "3717:34:4"
              }
            ],
            "id": 1596,
            "name": "FunctionDefinition",
            "src": "3591:160:4"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "name": "transferERC721",
              "payable": false,
              "scope": 1781,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "erc721Token",
                      "scope": 1622,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1597,
                        "name": "ElementaryTypeName",
                        "src": "4433:7:4"
                      }
                    ],
                    "id": 1598,
                    "name": "VariableDeclaration",
                    "src": "4433:19:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_to",
                      "scope": 1622,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1599,
                        "name": "ElementaryTypeName",
                        "src": "4462:7:4"
                      }
                    ],
                    "id": 1600,
                    "name": "VariableDeclaration",
                    "src": "4462:11:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 1622,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1601,
                        "name": "ElementaryTypeName",
                        "src": "4483:7:4"
                      }
                    ],
                    "id": 1602,
                    "name": "VariableDeclaration",
                    "src": "4483:16:4"
                  }
                ],
                "id": 1603,
                "name": "ParameterList",
                "src": "4423:82:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "success",
                      "scope": 1622,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 1606,
                        "name": "ElementaryTypeName",
                        "src": "4555:4:4"
                      }
                    ],
                    "id": 1607,
                    "name": "VariableDeclaration",
                    "src": "4555:12:4"
                  }
                ],
                "id": 1608,
                "name": "ParameterList",
                "src": "4554:14:4"
              },
              {
                "attributes": {
                  "arguments": [
                    null
                  ]
                },
                "children": [
                  {
                    "attributes": {
                      "argumentTypes": null,
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 5315,
                      "type": "modifier ()",
                      "value": "onlyServerOrOnlyPopulous"
                    },
                    "id": 1604,
                    "name": "Identifier",
                    "src": "4521:24:4"
                  }
                ],
                "id": 1605,
                "name": "ModifierInvocation",
                "src": "4521:24:4"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_contract$_DepositContract_$1781",
                                  "typeString": "contract DepositContract"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                                  "typeString": "literal_string \"\""
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "safeTransferFrom",
                              "referencedDeclaration": 3482,
                              "type": "function (address,address,uint256,bytes memory) external"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "type": "contract ERC721Basic",
                                  "type_conversion": true
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_address",
                                          "typeString": "address"
                                        }
                                      ],
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3483,
                                      "type": "type(contract ERC721Basic)",
                                      "value": "ERC721Basic"
                                    },
                                    "id": 1609,
                                    "name": "Identifier",
                                    "src": "4632:11:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 1598,
                                      "type": "address",
                                      "value": "erc721Token"
                                    },
                                    "id": 1610,
                                    "name": "Identifier",
                                    "src": "4644:11:4"
                                  }
                                ],
                                "id": 1611,
                                "name": "FunctionCall",
                                "src": "4632:24:4"
                              }
                            ],
                            "id": 1612,
                            "name": "MemberAccess",
                            "src": "4632:41:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5415,
                              "type": "contract DepositContract",
                              "value": "this"
                            },
                            "id": 1613,
                            "name": "Identifier",
                            "src": "4674:4:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1600,
                              "type": "address",
                              "value": "_to"
                            },
                            "id": 1614,
                            "name": "Identifier",
                            "src": "4680:3:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1602,
                              "type": "uint256",
                              "value": "_tokenId"
                            },
                            "id": 1615,
                            "name": "Identifier",
                            "src": "4685:8:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "string",
                              "type": "literal_string \"\"",
                              "value": ""
                            },
                            "id": 1616,
                            "name": "Literal",
                            "src": "4695:2:4"
                          }
                        ],
                        "id": 1617,
                        "name": "FunctionCall",
                        "src": "4632:66:4"
                      }
                    ],
                    "id": 1618,
                    "name": "ExpressionStatement",
                    "src": "4632:66:4"
                  },
                  {
                    "attributes": {
                      "functionReturnParameters": 1608
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "74727565",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "bool",
                          "type": "bool",
                          "value": "true"
                        },
                        "id": 1619,
                        "name": "Literal",
                        "src": "4715:4:4"
                      }
                    ],
                    "id": 1620,
                    "name": "Return",
                    "src": "4708:11:4"
                  }
                ],
                "id": 1621,
                "name": "Block",
                "src": "4573:153:4"
              }
            ],
            "id": 1622,
            "name": "FunctionDefinition",
            "src": "4400:326:4"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "name": "transferEther",
              "payable": false,
              "scope": 1781,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_to",
                      "scope": 1699,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1623,
                        "name": "ElementaryTypeName",
                        "src": "5028:7:4"
                      }
                    ],
                    "id": 1624,
                    "name": "VariableDeclaration",
                    "src": "5028:11:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_value",
                      "scope": 1699,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1625,
                        "name": "ElementaryTypeName",
                        "src": "5041:7:4"
                      }
                    ],
                    "id": 1626,
                    "name": "VariableDeclaration",
                    "src": "5041:14:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "inCollateral",
                      "scope": 1699,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1627,
                        "name": "ElementaryTypeName",
                        "src": "5065:7:4"
                      }
                    ],
                    "id": 1628,
                    "name": "VariableDeclaration",
                    "src": "5065:20:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "pptFee",
                      "scope": 1699,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1629,
                        "name": "ElementaryTypeName",
                        "src": "5095:7:4"
                      }
                    ],
                    "id": 1630,
                    "name": "VariableDeclaration",
                    "src": "5095:14:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "adminExternalWallet",
                      "scope": 1699,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1631,
                        "name": "ElementaryTypeName",
                        "src": "5111:7:4"
                      }
                    ],
                    "id": 1632,
                    "name": "VariableDeclaration",
                    "src": "5111:27:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "pptAddress",
                      "scope": 1699,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1633,
                        "name": "ElementaryTypeName",
                        "src": "5140:7:4"
                      }
                    ],
                    "id": 1634,
                    "name": "VariableDeclaration",
                    "src": "5140:18:4"
                  }
                ],
                "id": 1635,
                "name": "ParameterList",
                "src": "5018:141:4"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 1638,
                "name": "ParameterList",
                "src": "5214:0:4"
              },
              {
                "attributes": {
                  "arguments": [
                    null
                  ]
                },
                "children": [
                  {
                    "attributes": {
                      "argumentTypes": null,
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 5315,
                      "type": "modifier ()",
                      "value": "onlyServerOrOnlyPopulous"
                    },
                    "id": 1636,
                    "name": "Identifier",
                    "src": "5185:24:4"
                  }
                ],
                "id": 1637,
                "name": "ModifierInvocation",
                "src": "5185:24:4"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5377,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 1639,
                            "name": "Identifier",
                            "src": "5227:7:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": ">=",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "balance",
                                  "referencedDeclaration": null,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5415,
                                      "type": "contract DepositContract",
                                      "value": "this"
                                    },
                                    "id": 1640,
                                    "name": "Identifier",
                                    "src": "5235:4:4"
                                  }
                                ],
                                "id": 1641,
                                "name": "MemberAccess",
                                "src": "5235:12:4"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 1626,
                                  "type": "uint256",
                                  "value": "_value"
                                },
                                "id": 1642,
                                "name": "Identifier",
                                "src": "5251:6:4"
                              }
                            ],
                            "id": 1643,
                            "name": "BinaryOperation",
                            "src": "5235:22:4"
                          }
                        ],
                        "id": 1644,
                        "name": "FunctionCall",
                        "src": "5227:31:4"
                      }
                    ],
                    "id": 1645,
                    "name": "ExpressionStatement",
                    "src": "5227:31:4"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5377,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 1646,
                            "name": "Identifier",
                            "src": "5274:7:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "==",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "type": "bool",
                                  "type_conversion": false
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_uint256",
                                          "typeString": "uint256"
                                        }
                                      ],
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "send",
                                      "referencedDeclaration": null,
                                      "type": "function (uint256) returns (bool)"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 1624,
                                          "type": "address",
                                          "value": "_to"
                                        },
                                        "id": 1647,
                                        "name": "Identifier",
                                        "src": "5282:3:4"
                                      }
                                    ],
                                    "id": 1648,
                                    "name": "MemberAccess",
                                    "src": "5282:8:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 1626,
                                      "type": "uint256",
                                      "value": "_value"
                                    },
                                    "id": 1649,
                                    "name": "Identifier",
                                    "src": "5291:6:4"
                                  }
                                ],
                                "id": 1650,
                                "name": "FunctionCall",
                                "src": "5282:16:4"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "hexvalue": "74727565",
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "subdenomination": null,
                                  "token": "bool",
                                  "type": "bool",
                                  "value": "true"
                                },
                                "id": 1651,
                                "name": "Literal",
                                "src": "5302:4:4"
                              }
                            ],
                            "id": 1652,
                            "name": "BinaryOperation",
                            "src": "5282:24:4"
                          }
                        ],
                        "id": 1653,
                        "name": "FunctionCall",
                        "src": "5274:33:4"
                      }
                    ],
                    "id": 1654,
                    "name": "ExpressionStatement",
                    "src": "5274:33:4"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        1656
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "pptBalance",
                          "scope": 1699,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "uint256",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "uint256",
                              "type": "uint256"
                            },
                            "id": 1655,
                            "name": "ElementaryTypeName",
                            "src": "5326:7:4"
                          }
                        ],
                        "id": 1656,
                        "name": "VariableDeclaration",
                        "src": "5326:18:4"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "uint256",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_contract$_DepositContract_$1781",
                                  "typeString": "contract DepositContract"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "balanceOf",
                              "referencedDeclaration": 5248,
                              "type": "function (address) view external returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "type": "contract iERC20Token",
                                  "type_conversion": true
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_address",
                                          "typeString": "address"
                                        }
                                      ],
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5274,
                                      "type": "type(contract iERC20Token)",
                                      "value": "iERC20Token"
                                    },
                                    "id": 1657,
                                    "name": "Identifier",
                                    "src": "5347:11:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 1634,
                                      "type": "address",
                                      "value": "pptAddress"
                                    },
                                    "id": 1658,
                                    "name": "Identifier",
                                    "src": "5359:10:4"
                                  }
                                ],
                                "id": 1659,
                                "name": "FunctionCall",
                                "src": "5347:23:4"
                              }
                            ],
                            "id": 1660,
                            "name": "MemberAccess",
                            "src": "5347:33:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5415,
                              "type": "contract DepositContract",
                              "value": "this"
                            },
                            "id": 1661,
                            "name": "Identifier",
                            "src": "5381:4:4"
                          }
                        ],
                        "id": 1662,
                        "name": "FunctionCall",
                        "src": "5347:39:4"
                      }
                    ],
                    "id": 1663,
                    "name": "VariableDeclarationStatement",
                    "src": "5326:60:4"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5377,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 1664,
                            "name": "Identifier",
                            "src": "5396:7:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "<=",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 1628,
                                  "type": "uint256",
                                  "value": "inCollateral"
                                },
                                "id": 1665,
                                "name": "Identifier",
                                "src": "5404:12:4"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 1656,
                                  "type": "uint256",
                                  "value": "pptBalance"
                                },
                                "id": 1666,
                                "name": "Identifier",
                                "src": "5420:10:4"
                              }
                            ],
                            "id": 1667,
                            "name": "BinaryOperation",
                            "src": "5404:26:4"
                          }
                        ],
                        "id": 1668,
                        "name": "FunctionCall",
                        "src": "5396:35:4"
                      }
                    ],
                    "id": 1669,
                    "name": "ExpressionStatement",
                    "src": "5396:35:4"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5377,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 1670,
                            "name": "Identifier",
                            "src": "5441:7:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": ">=",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isInlineArray": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "commonType": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      },
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "operator": "-",
                                      "type": "uint256"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 1656,
                                          "type": "uint256",
                                          "value": "pptBalance"
                                        },
                                        "id": 1671,
                                        "name": "Identifier",
                                        "src": "5450:10:4"
                                      },
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 1628,
                                          "type": "uint256",
                                          "value": "inCollateral"
                                        },
                                        "id": 1672,
                                        "name": "Identifier",
                                        "src": "5463:12:4"
                                      }
                                    ],
                                    "id": 1673,
                                    "name": "BinaryOperation",
                                    "src": "5450:25:4"
                                  }
                                ],
                                "id": 1674,
                                "name": "TupleExpression",
                                "src": "5449:27:4"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 1630,
                                  "type": "uint256",
                                  "value": "pptFee"
                                },
                                "id": 1675,
                                "name": "Identifier",
                                "src": "5480:6:4"
                              }
                            ],
                            "id": 1676,
                            "name": "BinaryOperation",
                            "src": "5449:37:4"
                          }
                        ],
                        "id": 1677,
                        "name": "FunctionCall",
                        "src": "5441:46:4"
                      }
                    ],
                    "id": 1678,
                    "name": "ExpressionStatement",
                    "src": "5441:46:4"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5377,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 1679,
                            "name": "Identifier",
                            "src": "5497:7:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "==",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "type": "bool",
                                  "type_conversion": false
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_address",
                                          "typeString": "address"
                                        },
                                        {
                                          "typeIdentifier": "t_uint256",
                                          "typeString": "uint256"
                                        }
                                      ],
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "transfer",
                                      "referencedDeclaration": 5221,
                                      "type": "function (address,uint256) external returns (bool)"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "isStructConstructorCall": false,
                                          "lValueRequested": false,
                                          "names": [
                                            null
                                          ],
                                          "type": "contract iERC20Token",
                                          "type_conversion": true
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "argumentTypes": [
                                                {
                                                  "typeIdentifier": "t_address",
                                                  "typeString": "address"
                                                }
                                              ],
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 5274,
                                              "type": "type(contract iERC20Token)",
                                              "value": "iERC20Token"
                                            },
                                            "id": 1680,
                                            "name": "Identifier",
                                            "src": "5505:11:4"
                                          },
                                          {
                                            "attributes": {
                                              "argumentTypes": null,
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 1634,
                                              "type": "address",
                                              "value": "pptAddress"
                                            },
                                            "id": 1681,
                                            "name": "Identifier",
                                            "src": "5517:10:4"
                                          }
                                        ],
                                        "id": 1682,
                                        "name": "FunctionCall",
                                        "src": "5505:23:4"
                                      }
                                    ],
                                    "id": 1683,
                                    "name": "MemberAccess",
                                    "src": "5505:32:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 1632,
                                      "type": "address",
                                      "value": "adminExternalWallet"
                                    },
                                    "id": 1684,
                                    "name": "Identifier",
                                    "src": "5538:19:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 1630,
                                      "type": "uint256",
                                      "value": "pptFee"
                                    },
                                    "id": 1685,
                                    "name": "Identifier",
                                    "src": "5559:6:4"
                                  }
                                ],
                                "id": 1686,
                                "name": "FunctionCall",
                                "src": "5505:61:4"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "hexvalue": "74727565",
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "subdenomination": null,
                                  "token": "bool",
                                  "type": "bool",
                                  "value": "true"
                                },
                                "id": 1687,
                                "name": "Literal",
                                "src": "5570:4:4"
                              }
                            ],
                            "id": 1688,
                            "name": "BinaryOperation",
                            "src": "5505:69:4"
                          }
                        ],
                        "id": 1689,
                        "name": "FunctionCall",
                        "src": "5497:78:4"
                      }
                    ],
                    "id": 1690,
                    "name": "ExpressionStatement",
                    "src": "5497:78:4"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1497,
                              "type": "function (address,uint256,uint256,address)",
                              "value": "EventEtherTransfer"
                            },
                            "id": 1691,
                            "name": "Identifier",
                            "src": "5586:18:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1624,
                              "type": "address",
                              "value": "_to"
                            },
                            "id": 1692,
                            "name": "Identifier",
                            "src": "5605:3:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1626,
                              "type": "uint256",
                              "value": "_value"
                            },
                            "id": 1693,
                            "name": "Identifier",
                            "src": "5610:6:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1630,
                              "type": "uint256",
                              "value": "pptFee"
                            },
                            "id": 1694,
                            "name": "Identifier",
                            "src": "5618:6:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1632,
                              "type": "address",
                              "value": "adminExternalWallet"
                            },
                            "id": 1695,
                            "name": "Identifier",
                            "src": "5626:19:4"
                          }
                        ],
                        "id": 1696,
                        "name": "FunctionCall",
                        "src": "5586:60:4"
                      }
                    ],
                    "id": 1697,
                    "name": "ExpressionStatement",
                    "src": "5586:60:4"
                  }
                ],
                "id": 1698,
                "name": "Block",
                "src": "5214:462:4"
              }
            ],
            "id": 1699,
            "name": "FunctionDefinition",
            "src": "4996:680:4"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "",
              "payable": true,
              "scope": 1781,
              "stateMutability": "payable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 1700,
                "name": "ParameterList",
                "src": "5752:2:4"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 1701,
                "name": "ParameterList",
                "src": "5770:0:4"
              },
              {
                "attributes": {
                  "statements": [
                    null
                  ]
                },
                "children": [],
                "id": 1702,
                "name": "Block",
                "src": "5770:2:4"
              }
            ],
            "id": 1703,
            "name": "FunctionDefinition",
            "src": "5743:29:4"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "balanceOf",
              "payable": false,
              "scope": 1781,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "populousTokenContract",
                      "scope": 1731,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1704,
                        "name": "ElementaryTypeName",
                        "src": "6120:7:4"
                      }
                    ],
                    "id": 1705,
                    "name": "VariableDeclaration",
                    "src": "6120:29:4"
                  }
                ],
                "id": 1706,
                "name": "ParameterList",
                "src": "6119:31:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 1731,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1707,
                        "name": "ElementaryTypeName",
                        "src": "6172:7:4"
                      }
                    ],
                    "id": 1708,
                    "name": "VariableDeclaration",
                    "src": "6172:7:4"
                  }
                ],
                "id": 1709,
                "name": "ParameterList",
                "src": "6171:9:4"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "==",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1705,
                              "type": "address",
                              "value": "populousTokenContract"
                            },
                            "id": 1710,
                            "name": "Identifier",
                            "src": "6212:21:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "address",
                              "type_conversion": true
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_rational_0_by_1",
                                      "typeString": "int_const 0"
                                    }
                                  ],
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "type": "type(address)",
                                  "value": "address"
                                },
                                "id": 1711,
                                "name": "ElementaryTypeNameExpression",
                                "src": "6237:7:4"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "hexvalue": "30",
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "subdenomination": null,
                                  "token": "number",
                                  "type": "int_const 0",
                                  "value": "0"
                                },
                                "id": 1712,
                                "name": "Literal",
                                "src": "6245:1:4"
                              }
                            ],
                            "id": 1713,
                            "name": "FunctionCall",
                            "src": "6237:10:4"
                          }
                        ],
                        "id": 1714,
                        "name": "BinaryOperation",
                        "src": "6212:35:4"
                      },
                      {
                        "children": [
                          {
                            "attributes": {
                              "functionReturnParameters": 1709
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "balance",
                                  "referencedDeclaration": null,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "isStructConstructorCall": false,
                                      "lValueRequested": false,
                                      "names": [
                                        null
                                      ],
                                      "type": "address",
                                      "type_conversion": true
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": [
                                            {
                                              "typeIdentifier": "t_contract$_DepositContract_$1781",
                                              "typeString": "contract DepositContract"
                                            }
                                          ],
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": true,
                                          "lValueRequested": false,
                                          "type": "type(address)",
                                          "value": "address"
                                        },
                                        "id": 1715,
                                        "name": "ElementaryTypeNameExpression",
                                        "src": "6270:7:4"
                                      },
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 5415,
                                          "type": "contract DepositContract",
                                          "value": "this"
                                        },
                                        "id": 1716,
                                        "name": "Identifier",
                                        "src": "6278:4:4"
                                      }
                                    ],
                                    "id": 1717,
                                    "name": "FunctionCall",
                                    "src": "6270:13:4"
                                  }
                                ],
                                "id": 1718,
                                "name": "MemberAccess",
                                "src": "6270:21:4"
                              }
                            ],
                            "id": 1719,
                            "name": "Return",
                            "src": "6263:28:4"
                          }
                        ],
                        "id": 1720,
                        "name": "Block",
                        "src": "6249:53:4"
                      },
                      {
                        "children": [
                          {
                            "attributes": {
                              "functionReturnParameters": 1709
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "type": "uint256",
                                  "type_conversion": false
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_contract$_DepositContract_$1781",
                                          "typeString": "contract DepositContract"
                                        }
                                      ],
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "balanceOf",
                                      "referencedDeclaration": 5248,
                                      "type": "function (address) view external returns (uint256)"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "isStructConstructorCall": false,
                                          "lValueRequested": false,
                                          "names": [
                                            null
                                          ],
                                          "type": "contract iERC20Token",
                                          "type_conversion": true
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "argumentTypes": [
                                                {
                                                  "typeIdentifier": "t_address",
                                                  "typeString": "address"
                                                }
                                              ],
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 5274,
                                              "type": "type(contract iERC20Token)",
                                              "value": "iERC20Token"
                                            },
                                            "id": 1721,
                                            "name": "Identifier",
                                            "src": "6350:11:4"
                                          },
                                          {
                                            "attributes": {
                                              "argumentTypes": null,
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 1705,
                                              "type": "address",
                                              "value": "populousTokenContract"
                                            },
                                            "id": 1722,
                                            "name": "Identifier",
                                            "src": "6362:21:4"
                                          }
                                        ],
                                        "id": 1723,
                                        "name": "FunctionCall",
                                        "src": "6350:34:4"
                                      }
                                    ],
                                    "id": 1724,
                                    "name": "MemberAccess",
                                    "src": "6350:44:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5415,
                                      "type": "contract DepositContract",
                                      "value": "this"
                                    },
                                    "id": 1725,
                                    "name": "Identifier",
                                    "src": "6395:4:4"
                                  }
                                ],
                                "id": 1726,
                                "name": "FunctionCall",
                                "src": "6350:50:4"
                              }
                            ],
                            "id": 1727,
                            "name": "Return",
                            "src": "6343:57:4"
                          }
                        ],
                        "id": 1728,
                        "name": "Block",
                        "src": "6308:103:4"
                      }
                    ],
                    "id": 1729,
                    "name": "IfStatement",
                    "src": "6208:203:4"
                  }
                ],
                "id": 1730,
                "name": "Block",
                "src": "6181:236:4"
              }
            ],
            "id": 1731,
            "name": "FunctionDefinition",
            "src": "6101:316:4"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "balanceOfERC721",
              "payable": false,
              "scope": 1781,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "erc721Token",
                      "scope": 1746,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1732,
                        "name": "ElementaryTypeName",
                        "src": "6649:7:4"
                      }
                    ],
                    "id": 1733,
                    "name": "VariableDeclaration",
                    "src": "6649:19:4"
                  }
                ],
                "id": 1734,
                "name": "ParameterList",
                "src": "6648:21:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 1746,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1735,
                        "name": "ElementaryTypeName",
                        "src": "6691:7:4"
                      }
                    ],
                    "id": 1736,
                    "name": "VariableDeclaration",
                    "src": "6691:7:4"
                  }
                ],
                "id": 1737,
                "name": "ParameterList",
                "src": "6690:9:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 1737
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "uint256",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_contract$_DepositContract_$1781",
                                  "typeString": "contract DepositContract"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "balanceOf",
                              "referencedDeclaration": 3409,
                              "type": "function (address) view external returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "type": "contract ERC721Basic",
                                  "type_conversion": true
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_address",
                                          "typeString": "address"
                                        }
                                      ],
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3483,
                                      "type": "type(contract ERC721Basic)",
                                      "value": "ERC721Basic"
                                    },
                                    "id": 1738,
                                    "name": "Identifier",
                                    "src": "6717:11:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 1733,
                                      "type": "address",
                                      "value": "erc721Token"
                                    },
                                    "id": 1739,
                                    "name": "Identifier",
                                    "src": "6729:11:4"
                                  }
                                ],
                                "id": 1740,
                                "name": "FunctionCall",
                                "src": "6717:24:4"
                              }
                            ],
                            "id": 1741,
                            "name": "MemberAccess",
                            "src": "6717:34:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5415,
                              "type": "contract DepositContract",
                              "value": "this"
                            },
                            "id": 1742,
                            "name": "Identifier",
                            "src": "6752:4:4"
                          }
                        ],
                        "id": 1743,
                        "name": "FunctionCall",
                        "src": "6717:40:4"
                      }
                    ],
                    "id": 1744,
                    "name": "Return",
                    "src": "6710:47:4"
                  }
                ],
                "id": 1745,
                "name": "Block",
                "src": "6700:109:4"
              }
            ],
            "id": 1746,
            "name": "FunctionDefinition",
            "src": "6624:185:4"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "balanceOfERC1155",
              "payable": false,
              "scope": 1781,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "external"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "erc1155Token",
                      "scope": 1764,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 1747,
                        "name": "ElementaryTypeName",
                        "src": "7074:7:4"
                      }
                    ],
                    "id": 1748,
                    "name": "VariableDeclaration",
                    "src": "7074:20:4"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_id",
                      "scope": 1764,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1749,
                        "name": "ElementaryTypeName",
                        "src": "7096:7:4"
                      }
                    ],
                    "id": 1750,
                    "name": "VariableDeclaration",
                    "src": "7096:11:4"
                  }
                ],
                "id": 1751,
                "name": "ParameterList",
                "src": "7073:35:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 1764,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1752,
                        "name": "ElementaryTypeName",
                        "src": "7132:7:4"
                      }
                    ],
                    "id": 1753,
                    "name": "VariableDeclaration",
                    "src": "7132:7:4"
                  }
                ],
                "id": 1754,
                "name": "ParameterList",
                "src": "7131:9:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 1754
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "uint256",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_contract$_DepositContract_$1781",
                                  "typeString": "contract DepositContract"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "balanceOf",
                              "referencedDeclaration": 2102,
                              "type": "function (uint256,address) view external returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "type": "contract ERC1155",
                                  "type_conversion": true
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_address",
                                          "typeString": "address"
                                        }
                                      ],
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3257,
                                      "type": "type(contract ERC1155)",
                                      "value": "ERC1155"
                                    },
                                    "id": 1755,
                                    "name": "Identifier",
                                    "src": "7158:7:4"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 1748,
                                      "type": "address",
                                      "value": "erc1155Token"
                                    },
                                    "id": 1756,
                                    "name": "Identifier",
                                    "src": "7166:12:4"
                                  }
                                ],
                                "id": 1757,
                                "name": "FunctionCall",
                                "src": "7158:21:4"
                              }
                            ],
                            "id": 1758,
                            "name": "MemberAccess",
                            "src": "7158:31:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 1750,
                              "type": "uint256",
                              "value": "_id"
                            },
                            "id": 1759,
                            "name": "Identifier",
                            "src": "7190:3:4"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5415,
                              "type": "contract DepositContract",
                              "value": "this"
                            },
                            "id": 1760,
                            "name": "Identifier",
                            "src": "7195:4:4"
                          }
                        ],
                        "id": 1761,
                        "name": "FunctionCall",
                        "src": "7158:42:4"
                      }
                    ],
                    "id": 1762,
                    "name": "Return",
                    "src": "7151:49:4"
                  }
                ],
                "id": 1763,
                "name": "Block",
                "src": "7141:114:4"
              }
            ],
            "id": 1764,
            "name": "FunctionDefinition",
            "src": "7048:207:4"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getVersion",
              "payable": false,
              "scope": 1781,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 1765,
                "name": "ParameterList",
                "src": "7376:2:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 1772,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 1766,
                        "name": "ElementaryTypeName",
                        "src": "7400:7:4"
                      }
                    ],
                    "id": 1767,
                    "name": "VariableDeclaration",
                    "src": "7400:7:4"
                  }
                ],
                "id": 1768,
                "name": "ParameterList",
                "src": "7399:9:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 1768
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "overloadedDeclarations": [
                            null
                          ],
                          "referencedDeclaration": 1487,
                          "type": "uint256",
                          "value": "version"
                        },
                        "id": 1769,
                        "name": "Identifier",
                        "src": "7426:7:4"
                      }
                    ],
                    "id": 1770,
                    "name": "Return",
                    "src": "7419:14:4"
                  }
                ],
                "id": 1771,
                "name": "Block",
                "src": "7409:31:4"
              }
            ],
            "id": 1772,
            "name": "FunctionDefinition",
            "src": "7357:83:4"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getClientId",
              "payable": false,
              "scope": 1781,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 1773,
                "name": "ParameterList",
                "src": "7598:2:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_clientId",
                      "scope": 1780,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 1774,
                        "name": "ElementaryTypeName",
                        "src": "7622:7:4"
                      }
                    ],
                    "id": 1775,
                    "name": "VariableDeclaration",
                    "src": "7622:17:4"
                  }
                ],
                "id": 1776,
                "name": "ParameterList",
                "src": "7621:19:4"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 1776
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "overloadedDeclarations": [
                            null
                          ],
                          "referencedDeclaration": 1484,
                          "type": "bytes32",
                          "value": "clientId"
                        },
                        "id": 1777,
                        "name": "Identifier",
                        "src": "7658:8:4"
                      }
                    ],
                    "id": 1778,
                    "name": "Return",
                    "src": "7651:15:4"
                  }
                ],
                "id": 1779,
                "name": "Block",
                "src": "7641:32:4"
              }
            ],
            "id": 1780,
            "name": "FunctionDefinition",
            "src": "7578:95:4"
          }
        ],
        "id": 1781,
        "name": "ContractDefinition",
        "src": "177:7498:4"
      }
    ],
    "id": 1782,
    "name": "SourceUnit",
    "src": "0:7675:4"
  },
  "networks": {},
  "schemaVersion": "1.0.0",
  "updatedAt": "2018-12-05T17:58:00.842Z"
};
