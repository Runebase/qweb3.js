const Rweb3 = require('./rweb3');
const Contract = require('./contract');
const Decoder = require('./decoder');
const Utils = require('./utils');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.Rweb3 === 'undefined') {
  window.Rweb3 = Rweb3;
}

module.exports = {
  Rweb3,
  Contract,
  Decoder,
  Utils,
};
