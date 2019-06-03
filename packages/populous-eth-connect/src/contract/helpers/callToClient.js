import blockchainDataService from "../../blockchainDataService";


const callToClient = (connect, to, encodedABI) => {
  return blockchainDataService
    .call(to, encodedABI)
    .then(data => {

      if(data === '0x'){
        return 0;
      }
      return (data);
    });
};

export default callToClient;
