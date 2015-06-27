import TypeProcessor from '../src/lib/TypeProcessor.js';
import chai from 'Chai';
const assert = chai.assert;

describe('TypeProcessor', function() {
    it('Should work for a valid type', function() {
        var processor = TypeProcessor.getProcessor('int');
        var processingResult = processor.process('2');
        assert.equal(2, processingResult.convertedValue);
    });
    it('Should return undefined for an unknown type', function() {
        var processor = TypeProcessor.getProcessor('int2');
        assert.isUndefined(processor);
    });
    if('Should throw for falsy values', function() {
        assert.throws(() => TypeProcessor.getProcessor(''), /Could not get processor for type/);
        assert.throws(() => TypeProcessor.getProcessor(undefined), /Could not get processor for type/);
        assert.throws(() => TypeProcessor.getProcessor(null), /Could not get processor for type/);
        assert.throws(() => TypeProcessor.getProcessor(0), /Could not get processor for type/);
    });
});