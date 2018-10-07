module.exports = {
  isWalletEncrypted: async (rweb3) => {
    const res = await rweb3.getWalletInfo();
    return Object.prototype.hasOwnProperty.call(res, 'unlocked_until');
  },
};
