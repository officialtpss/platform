import { Mongo } from 'meteor/mongo';
import { Class, Union } from 'meteor/jagi:astronomy';
import { blockchainActionTypes, blockchainActionStatuses, } from 'meteor/populous:constants';


const blockchainActionsCollection = new Mongo.Collection('blockchain_actions');

const tx = Class.create({
  name: 'BlockchainActionTx',
  fields: {
    hash: {
      type: String,
    },
    error: {
      type: Object,
      optional: true
    },
  },
});

const NumberOrObjectType = Union.create({
  name: 'NumberOrObjectType',
  types: [Number, Object],
});

const BlockchainAction = Class.create({
  name: 'BlockchainAction',
  collection: blockchainActionsCollection,
  fields: {
    userId: {
      type: String,
      optional: true,
    },
    title: {
      type: String,
      optional: true,
    },
    type: {
      type: String,
      validators: [
        {
          type: 'choice',
          param: Object.values(blockchainActionTypes),
        },
      ],
    },
    amount: {
      type: NumberOrObjectType,
      optional: true
    },
    xaup_id: {
      type: Number,
      optional: true
    },
    feeAmount: {
      type: Number,
      optional: true
    },
    dataId: {
      type: String,
      optional: true,
    },
    status: {
      type: String,
      default: blockchainActionStatuses.pending,
      validators: [
        {
          type: 'choice',
          param: Object.values(blockchainActionStatuses),
        },
      ],
    },
    to: {
      type: String,
      optional: true,
    },
    tx: {
      type: tx,
      optional: true,
    },

    hash:{
      type: String,
      optional: true,
    },

    size:{
      type: Number,
      optional: true,
    },

    invoiceId:{
      type: String,
      optional: true,
    },
    withdrawal:{
      type: Object,
      optional: true,
    },
    data: {
      type: Object,
      optional: true
    },
    version: {
      type: Number,
      optional: true,
    }
  },
  helpers: {
    isCompleted(){
      return this.status === blockchainActionStatuses.complete;
    },
    async handleBlockchainAction(blockChainPromise) {
      return blockChainPromise
        .then(async (response) => {
          return await this.handleBlockchainResponse(false, response);
        })
        .catch(async ({ details }) => {
          return await this.handleBlockchainResponse(true, details);
        });
    },
    async handleBlockchainResponse(isError, blockchainResponse) {
      this.tx = {
        hash: blockchainResponse.transactionHash,
        error: isError ? blockchainResponse : undefined,
      };
      this.status = isError ? blockchainActionStatuses.failed : blockchainActionStatuses.complete;
      await this.save();

      return blockchainResponse;
    }
  },
  behaviors: ['timestamp'],
});

export default BlockchainAction;
