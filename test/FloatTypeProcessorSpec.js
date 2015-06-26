import Chai from 'Chai';
import FloatTypeProcessor from '../src/lib/typeProcessors/FloatTypeProcessor.js';
const assert = Chai.assert;

describe('FloatTypeProcessor', function() {
    describe('process', function() {

        it('Invalid float - undefined', function() {
            var result = FloatTypeProcessor.process('abc');
            assert.isUndefined(result.convertedValue);
            assert.equal('error', result.validationResult);
        });

        it('Invalid float - null', function() {
            var result = FloatTypeProcessor.process('abc');
            assert.isUndefined(result.convertedValue);
            assert.equal('error', result.validationResult);
        });

        it('Invalid float - string', function() {
            var result = FloatTypeProcessor.process('abc');
            assert.isUndefined(result.convertedValue);
            assert.equal('error', result.validationResult);
        });

        it('Invalid float - string space', function() {
            var result = FloatTypeProcessor.process(' ');
            assert.isUndefined(result.convertedValue);
            assert.equal('error', result.validationResult);
        });

        it('Invalid float - float US', function() {
            var result = FloatTypeProcessor.process('2.3');
            assert.equal(result.convertedValue, 2.3);
            assert.equal('success', result.validationResult);
        });

        it('Invalid float - float BR', function() {
            var result = FloatTypeProcessor.process('2,3');
            assert.isUndefined(result.convertedValue);
            assert.equal('error', result.validationResult);
        });

        it('Valid float', function() {
            var result = FloatTypeProcessor.process('2837');
            assert.equal(2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid float zero', function() {
            var result = FloatTypeProcessor.process('0');
            assert.equal(0, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid float padded zero', function() {
            var result = FloatTypeProcessor.process('0000');
            assert.equal(0, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid float positive zero', function() {
            var result = FloatTypeProcessor.process('+0000');
            assert.equal(0, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid float negative zero', function() {
            var result = FloatTypeProcessor.process('-0000');
            assert.equal(0, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid float integer', function() {
            var result = FloatTypeProcessor.process('+2837');
            assert.equal(2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid float padded integer', function() {
            var result = FloatTypeProcessor.process('+0002837');
            assert.equal(2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid float integer', function() {
            var result = FloatTypeProcessor.process('-2837');
            assert.equal(-2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid float padded integer', function() {
            var result = FloatTypeProcessor.process('-0002837');
            assert.equal(-2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });
    });
});