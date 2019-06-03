export default {
  ropsten: {
    address: process.env.ETH_HOST || '217.138.132.58',
    port: process.env.ETH_PORT || '8541',
    protocol: process.env.ETH_PROTOCOL || 'http',
    ethAddress: process.env.ETH_ADDRESS || '0xf8b3d742b245ec366288160488a12e7a2f1d720d',
  },

  live: {
    address: '',
    port: '',
  },
};
