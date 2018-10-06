const chai = require('chai');

const ContractMetadata = require('./data/contract_metadata');
const Decoder = require('../src/decoder');

const { assert, expect } = chai;

describe('Decoder', () => {
  describe('toRunebaseAddress()', () => {
    it('returns the converted runebase address', () => {
      assert.equal(
        Decoder.toRunebaseAddress('e456717646ba42713cd44a651fe2a25497e15ef7', false),
        '5nXyT7TjAEhinqhtseenfcjKPSPYDtGgQy',
      );
      assert.equal(
        Decoder.toRunebaseAddress('346a7035c9ed5fb011915a26b7f242bd54acdc72', true),
        'RE4LixNHnNyTqqWhDj5WumQ4DQHjcWZ7hA',
      );
    });

    it('throws if hexAddress is undefined or empty', () => {
      expect(() => Decoder.toRunebaseAddress()).to.throw();
      expect(() => Decoder.toRunebaseAddress('')).to.throw();
    });

    it('throws if hexAddress is not hex', () => {
      expect(() => Decoder.toRunebaseAddress('5Tu2jpxUnufPo2XWEuzvJAbD5qWMXGLKhf')).to.throw();
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

  describe('decodeCall()', () => {
    const rawOutput = {
      address: 'a6dd0b0399dc6162cedde85ed50c6fa4a0dd44f1',
      executionResult: {
        gasUsed: 21720,
        excepted: 'None',
        newAddress: 'a6dd0b0399dc6162cedde85ed50c6fa4a0dd44f1',
        output: '000000000000000000000000000000000000000000000000002386f26fc10000',
        codeDeposit: 0,
        gasRefunded: 0,
        depositSize: 0,
        gasForDeposit: 0,
      },
      transactionReceipt: {
        stateRoot: 'e6dfdcb1a7b722f39cf036d681ff76637f556447a8dea0d29f05b83df82d9cc0',
        gasUsed: 21720,
        bloom: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        log: [],
      },
    };

    it('returns the formattedOutput in the object', () => {
      const decoded = Decoder.decodeCall(rawOutput, ContractMetadata.RunebasePredictionToken.abi, 'tokenTotalSupply');
      assert.isDefined(decoded.executionResult.formattedOutput);
    });

    it('throws if rawOutput, contractABI, or methodName is undefined', () => {
      expect(() => Decoder.decodeCall(undefined, ContractMetadata.RunebasePredictionToken.abi, 'tokenTotalSupply')).to.throw();
      expect(() => Decoder.decodeCall(rawOutput, undefined, 'tokenTotalSupply')).to.throw();
      expect(() => Decoder.decodeCall(rawOutput, ContractMetadata.RunebasePredictionToken.abi, undefined)).to.throw();
    });
  });
});
