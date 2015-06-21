import Chai from 'Chai';
import MetadataEvaluator from '../src/lib/MetadataEvaluator.js';
const assert = Chai.assert;
const metadataEvaluator = new MetadataEvaluator();

describe('MetadataEvaluator', function() {

    describe('validate', function() {
       it('metadata should be null or empty', function() {
           assert.throws(() => metadataEvaluator.validate(null));
           assert.throws(() => metadataEvaluator.validate(undefined));
       });
        describe('required', function() {
            it('should not be valid if not bool or array', function() {
                assert.throws(() => metadataEvaluator.validate({ required: null}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ required: 'foo'}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ required: 23}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ required: new Object()}), /should be either a bool or an array/);
            });
            it('should be valid if bool or array', function() {
                metadataEvaluator.validate(({required: true}));
                metadataEvaluator.validate(({required: []}));
            });
        });
        describe('invisible', function() {
            it('should not be valid if not bool or array', function() {
                assert.throws(() => metadataEvaluator.validate({ invisible: null}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ invisible: 'foo'}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ invisible: 23}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ invisible: new Object()}), /should be either a bool or an array/);
            });
            it('should be valid if bool or array', function() {
                metadataEvaluator.validate(({invisible: true}));
                metadataEvaluator.validate(({invisible: []}));
            });
        });
        describe('disabled', function() {
            it('should not be valid if not bool or array', function() {
                assert.throws(() => metadataEvaluator.validate({ disabled: null}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ disabled: 'foo'}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ disabled: 23}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ disabled: new Object()}), /should be either a bool or an array/);
            });
            it('should be valid if bool or array', function() {
                metadataEvaluator.validate(({disabled: true}));
                metadataEvaluator.validate(({disabled: []}));
            });
        });
        describe('invalid', function() {
            it('should not be valid if not bool or array', function() {
                assert.throws(() => metadataEvaluator.validate({ invalid: null}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ invalid: 'foo'}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ invalid: 23}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ invalid: new Object()}), /should be either a bool or an array/);
            });
            it('should be valid if bool or array', function() {
                metadataEvaluator.validate(({invalid: true}));
                metadataEvaluator.validate(({invalid: []}));
            });
        });
    });

    describe('required', function() {
        it('Should something', function() {
            let metadata = {
                name: 'name',
                required: ''
            };

        });
    });
});