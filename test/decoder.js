const chai = require('chai');

const assert = chai.assert;
const expect = chai.expect;

const Decoder = require('../src/decoder');

describe('Decoder', () => {
  describe('toRunebaseAddress()', () => {
    it('returns the converted runebase address', () => {
      assert.equal(
        Decoder.toRunebaseAddress('17e7888aa7412a735f336d2f6d784caefabb6fa3', false),
        '5Tu2jpxUnufPo2XWEuzvJAbD5qWMXGLKhf',
      );
      assert.equal(
        Decoder.toRunebaseAddress('2a2ad24849bc061f0f7abee243ebdb584b0d11f1', true),
        'RD89krfNbNfX4PtpLhXnrdoz2ndjEogG5Q',
      );
    });

    it('throws if hexAddress is undefined or empty', () => {
      expect(() => Decoder.toRunebaseAddress()).to.throw();
      expect(() => Decoder.toRunebaseAddress('')).to.throw();
    });

    it('throws if hexAddress is not hex', () => {
      expect(() => Decoder.toRunebaseAddress('qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy')).to.throw();
    });
  });

  describe('removeHexPrefix()', () => {
    it('returns the value without the hex prefix', () => {
      const hexValue = '0x1111111111111111111111111111111111111111';
      assert.equal(Decoder.removeHexPrefix(hexValue), hexValue.slice(2));
    });

    it('returns the array values with hex prefixes', () => {
      const hexArray = ['0x1111111111111111111111111111111111111111', '0x2222222222222222222222222222222222222222'];
      const expected = [hexArray[0].slice(2), hexArray[1].slice(2)];
      assert.deepEqual(Decoder.removeHexPrefix(hexArray), expected);
    });
  });
});
