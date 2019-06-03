import blockchainDataService from "../blockchainDataService";

const subscribeAll = async (contractName, address, lastEventBlock, callback) => {
  try {
    const response = await blockchainDataService.getEvents(contractName, address, lastEventBlock);
    const events = response.data.events;

    if (events && Array.isArray(events) && events.length) {
      for (let i = 0; i < events.length; i++) {
        let eventObj = events[i];
        if (eventObj.blockNumber !== lastEventBlock) {
          console.log('New BC event', eventObj.event, eventObj);

          await callback(eventObj.event, eventObj)
        }
      }

      lastEventBlock = events[events.length - 1].blockNumber;
    }

  } catch (error) {
    console.log('event handle error', contractName, address, lastEventBlock);
  }


  setTimeout(() => {
    subscribeAll(contractName, address, lastEventBlock, callback);
  }, 1500)

};

export default {
  subscribeAll: subscribeAll,
};
