import Chai from 'Chai';
import MetadataEvaluator from '../src/lib/MetadataEvaluator.js';
const assert = Chai.assert;
const metadataEvaluator = new MetadataEvaluator();

describe('MetadataEvaluator', function() {

    describe('Evaluate', function() {

        describe('Boolean values', function() {
            it('True', function() {
                let metadata = {
                    name: 'name',
                    required: true
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André' });
                assert.isTrue(evaluation.value);
            });

            it('False', function() {
                let metadata = {
                    name: 'name',
                    required: false
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André' });
                assert.isFalse(evaluation.value);
            });

            it('Undefined', function() {
                let metadata = {
                    name: 'name'
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André' });
                assert.isUndefined(evaluation.value);
            });
        });

        describe('String values', function() {
            it('Name', function () {
                let metadata = {
                    name: 'name',
                    required: true
                };
                let evaluation = metadataEvaluator.evaluate(metadata.name, {name: 'André'});
                assert.equal('name', evaluation.value);
            });
        });

        describe('Function values', function() {
            it('Single expression true', function() {
                let metadata = {
                    name: 'name',
                    required: [{ expression: m => m.name == 'André', value: true }]
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André' });
                assert.isTrue(evaluation.value);
            });
            if('Single expression undefined', function() {
                let metadata = {
                    name: 'name',
                    required: [{ expression: m => m.name == 'André', value: true }]
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'John' });
                assert.isUndefined(evaluation.value);
            });
            it('Multiple expressions', function() {
                    let metadata = {
                        name: 'value',
                        required: [{ expression: m => m.value < 1000, value: true }, { expression: m => m.name == 'john', value: true }]
                    };
                    let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André', value: 1500 });
                    assert.isUndefined(evaluation.value);
                });
            it('Multiple expressions default value', function() {
                let metadata = {
                    name: 'value',
                    required: [{ expression: m => m.value < 1000, value: true }, { expression: m => m.name == 'john', value: true }, { expression: 'default', value: false }]
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André', value: 1500 });
                assert.isFalse(evaluation.value);
            });
            it('Should not trigger exception on evaluating expressions', function() {
                let metadata = {
                    name: 'value',
                    required: [{ expression: m => m.nonExitingProperty < 1000, value: true }, { expression: m => m.foo.name == 'john', value: true }, { expression: 'default', value: false }]
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André', value: 1500 });
                assert.isFalse(evaluation.value);
            });
        });

    });
});