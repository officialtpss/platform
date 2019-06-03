import {BLOCK_BID_FORM} from "../index";

const blockBidForm = (value) => {
  return {
    type: BLOCK_BID_FORM,
    payload: !!value,
  }
};

export default blockBidForm;
