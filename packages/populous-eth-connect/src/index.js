import methods from './methods/index';
import { network, contract } from './config/index';
import constants from './contract/constants';

import smartContracts from './contract/populous-smartcontracts/index';

export default {
  methods,
  config: {
    network: network,
    contract: contract,
  },
  contracts: {
    populous: smartContracts.populous,
    currencyToken: smartContracts.currencyToken,
    ierc20token: smartContracts.ierc20token,
    ERC1155: smartContracts.ERC1155,
    USDCToken: smartContracts.USDCToken,
    TUSDToken: smartContracts.TUSDToken,
    PXTToken: smartContracts.PXTToken,
    populousToken: smartContracts.populousToken,
    dataManager: smartContracts.dataManager,
    depositContract: smartContracts.depositContract
  },
  constants: constants,
};
