import methods from '../methods/index';
import contractsConfigs from './contractsConfigs';

const getABI = (name) => {
  if (!contractsConfigs[name]) {
    throw new Error('Unknown contract name');
  }

  return contractsConfigs[name].abi;
};

export default {
  _build: (contractName, contractAddress) => ({
    abi: getABI(contractName),
    address: contractAddress,
    transaction: Object.assign({}, methods.transaction),
  }),
  populous: {
    abi: getABI('Populous'),
    address: '0x2c5e7c1e8e201c72573806235311250a5bff9f52',
    transaction: methods.transaction,
  },
  currencyToken: {
    abi: getABI('CurrencyToken'),
    transaction: methods.transaction,
  },
  populousToken: {
    abi: getABI('PopulousToken'),
    address: '0x0ff72e24af7c09a647865820d4477f98fcb72a2c',
    transaction: methods.transaction,
  },
  dataManager: {
    abi: getABI('DataManager'),
    address: '0x0f8abf5f708f971bd9a994ec3af40988aa0f4873',
    transaction: methods.transaction,
  },
  iERC20Token: {
    abi: getABI('iERC20Token'),
    address: '',
    transaction: methods.transaction,
  },
  ERC1155: {
    abi: getABI('ERC1155'),
    address: '0x9b935e3779098bc5e1ffc073caf916f1e92a6145',
    transaction: methods.transaction,
  },
  PXTToken: {
    address: '0xD8A7C588f8DC19f49dAFd8ecf08eec58e64d4cC9',
    transaction: methods.transaction,
  },
  USDCToken: {
    address: '0xF930f2C7Bc02F89D05468112520553FFc6D24801',
    transaction: methods.transaction,
  },
  TUSDToken: {
    address: '0x78e7BEE398D66660bDF820DbDB415A33d011cD48',
    transaction: methods.transaction,
  },
  XAUToken: {
    address: '0x4974d66e391bf05270384364d14c306246d075fd',
    transaction: methods.transaction,
  },
  GBPpToken: {
    address: '0xe92d265dbe35613468a9ec14a321624faf7653dd',
    transaction: methods.transaction,
  },

};
