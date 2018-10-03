const Rweb3 = require('../../src/rweb3');

module.exports = {
  isWalletEncrypted: async (rweb3) => {
    let res = await rweb3.getWalletInfo();
    return res.hasOwnProperty('unlocked_until');
  },
};
