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
                assert.throws(() => metadataEvaluator.validate({ name: 'name', required: null}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', required: 'foo'}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', required: 23}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', required: {}}), /should be either a bool or an array/);
            });
            it('should be valid if bool or array', function() {
                metadataEvaluator.validate(({name: 'name', required: true}));
                metadataEvaluator.validate(({name: 'name', required: []}));
            });
        });
        describe('invisible', function() {
            it('should not be valid if not bool or array', function() {
                assert.throws(() => metadataEvaluator.validate({ name: 'name', invisible: null}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', invisible: 'foo'}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', invisible: 23}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', invisible: {}}), /should be either a bool or an array/);
            });
            it('should be valid if bool or array', function() {
                metadataEvaluator.validate(({ name: 'name', invisible: true}));
                metadataEvaluator.validate(({ name: 'name', invisible: []}));
            });
        });
        describe('disabled', function() {
            it('should not be valid if not bool or array', function() {
                assert.throws(() => metadataEvaluator.validate({ name: 'name', disabled: null}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', disabled: 'foo'}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', disabled: 23}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', disabled: {}}), /should be either a bool or an array/);
            });
            it('should be valid if bool or array', function() {
                metadataEvaluator.validate(({ name: 'name', disabled: true}));
                metadataEvaluator.validate(({ name: 'name', disabled: []}));
            });
        });
        describe('invalid', function() {
            it('should not be valid if not bool or array', function() {
                assert.throws(() => metadataEvaluator.validate({ name: 'name', invalid: null}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', invalid: 'foo'}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', invalid: 23}), /should be either a bool or an array/);
                assert.throws(() => metadataEvaluator.validate({ name: 'name', invalid: {}}), /should be either a bool or an array/);
            });
            it('should be valid if bool or array', function() {
                metadataEvaluator.validate(({ name: 'name', invalid: true }));
                metadataEvaluator.validate(({ name: 'name', invalid: [] }));
            });
        });
    });

    describe('evaluate', function() {

        describe('boolean values', function() {
            it('required', function() {
                let metadata = {
                    name: 'name',
                    required: true
                };
                let evaluation = metadataEvaluator.evaluate(metadata, { name: 'André' });
                assert.isTrue(evaluation.required.value);
                assert.isFalse(evaluation.invisible.value);
                assert.isFalse(evaluation.disabled.value);
                assert.isFalse(evaluation.invalid.value);
            });
            it('invisible', function() {
                let metadata = {
                    name: 'name',
                    invisible: true
                };
                let evaluation = metadataEvaluator.evaluate(metadata, { name: 'André' });
                assert.isFalse(evaluation.required.value);
                assert.isTrue(evaluation.invisible.value);
                assert.isFalse(evaluation.disabled.value);
                assert.isFalse(evaluation.invalid.value);
            });
            it('disabled', function() {
                let metadata = {
                    name: 'name',
                    disabled: true
                };
                let evaluation = metadataEvaluator.evaluate(metadata, { name: 'André' });
                assert.isFalse(evaluation.required.value);
                assert.isFalse(evaluation.invisible.value);
                assert.isTrue(evaluation.disabled.value);
                assert.isFalse(evaluation.invalid.value);
            });
            it('invalid', function() {
                let metadata = {
                    name: 'name',
                    invalid: true
                };
                let evaluation = metadataEvaluator.evaluate(metadata, { name: 'André' });
                assert.isFalse(evaluation.required.value);
                assert.isFalse(evaluation.invisible.value);
                assert.isFalse(evaluation.disabled.value);
                assert.isTrue(evaluation.invalid.value);
            });
        });

        describe('function values', function() {
            let metadata = {
                name: 'name',
                required: [{ expression: m => m.name == 'André' }]
            };
            let evaluation = metadataEvaluator.evaluate(metadata, { name: 'André' });
            assert.isTrue(evaluation.required.value);
        });
    });
});