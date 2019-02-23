require('dotenv').config();

module.exports = {
  /**
   * Returns the default Runebase address.
   * @return {String} Default Runebase address.
   */
  getDefaultRunebaseAddress: () => {
    if (!process.env.SENDER_ADDRESS) {
      throw Error('Must have SENDER_ADDRESS in .env');
    }
    return String(Buffer.from(process.env.SENDER_ADDRESS));
  },

  /**
   * Returns the Runebase network RPC url.
   * @return {String} The Runebase network RPC url.
   */
  getRunebaseRPCAddress: () => {
    if (!process.env.RUNEBASE_RPC_ADDRESS) {
      throw Error('Must have RUNEBASE_RPC_ADDRESS in .env');
    }
    return String(Buffer.from(process.env.RUNEBASE_RPC_ADDRESS));
  },

  /**
   * Returns the wallet passphrase to unlock the encrypted wallet.
   * @return {String} The wallet passphrase.
   */
  getWalletPassphrase: () => (process.env.WALLET_PASSPHRASE ? String(Buffer.from(process.env.WALLET_PASSPHRASE)) : ''),

  isWalletEncrypted: async (rweb3) => {
    const res = await rweb3.getWalletInfo();
    return Object.prototype.hasOwnProperty.call(res, 'unlocked_until');
  },
};
