import blockchainDataService from "../../blockchainDataService";
import contracts from "../../config/contract";


export default {
  balanceOf(connect, contract, owner) {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    const params = {
      _id: owner.XAUP_TOKENID,
      _owner: owner.address,
    };

    const encodedABI = contractInstance.methods
      .balanceOf(...Object.values(params))
      .encodeABI();


    return blockchainDataService.call(contracts.XAUToken.address, encodedABI);
  },
};
