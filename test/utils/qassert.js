const _ = require('lodash');
const chai = require('chai');

const assert = chai.assert;

module.exports = class QAssert {
  static isRunebaseAddress(address) {
    assert.isDefined(address);
    assert.equal(_.size(address), 34);
    assert.isTrue(address.startsWith('5') || address.startsWith('R'));
  }
};
