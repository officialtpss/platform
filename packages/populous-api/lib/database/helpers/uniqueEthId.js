import { randomStr } from './randomStr';
import EthId from '../eth_ids/model';

// This function returns a 32 character
// ethId, guaranteeing uniqueness
const uniqueEthId = () => {
  const newId = randomStr(32);

  const currentEthIds = EthId.find().fetch();
  const currentIds = currentEthIds.map(eId => eId.ethId);

  // If the newId is already a ethId, we need a new one
  if (currentIds.includes(newId)) {
    return uniqueEthId();
  }

  return newId;
};

export default uniqueEthId;
