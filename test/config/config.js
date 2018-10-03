const _ = require('lodash');
require('dotenv').config();

/* 
* Returns the default Runebase address.
* @return {String} Default Runebase address.
*/
function getDefaultRunebaseAddress() {
  if (!process.env.SENDER_ADDRESS) {
    throw Error('Must have SENDER_ADDRESS in .env');
  }
  return String(new Buffer(process.env.SENDER_ADDRESS));
}

/* 
* Returns the Runebase network RPC url.
* @return {String} The Runebase network RPC url.
*/
function getRunebaseRPCAddress() {
  if (!process.env.RUNEBASE_RPC_ADDRESS) {
    throw Error('Must have RUNEBASE_RPC_ADDRESS in .env');
  }
  return String(new Buffer(process.env.RUNEBASE_RPC_ADDRESS)); 
}

/* 
* Returns the wallet passphrase to unlock the encrypted wallet.
* @return {String} The wallet passphrase.
*/
function getWalletPassphrase() {
  return process.env.WALLET_PASSPHRASE ? String(new Buffer(process.env.WALLET_PASSPHRASE)) : '';
}

module.exports = {
  getRunebaseRPCAddress,
  getDefaultRunebaseAddress,
  getWalletPassphrase,
};
