import Chai from 'Chai';
import metadataEvaluator from '../src/lib/MetadataEvaluator.js';
const assert = Chai.assert;

describe('MetadataEvaluator', function() {

    describe('evaluate', function() {
        it('DefaultMetadataFilter with literals', function() {
            let metadata = {
                name: 'Andre',
                required: true
            };
            let metadataEvaluation = metadataEvaluator.evaluate(metadata, { name: 'Andre'});
            assert.strictEqual('Andre', metadataEvaluation.name);
            assert.isTrue(metadataEvaluation.required);

        });
        it('DefaultMetadataFilter with a function', function() {
            let metadata = {
                name: 'Andre',
                required: m => m.number > 500
            };
            let metadataEvaluation = metadataEvaluator.evaluate(metadata, { name: 'Andre', number: 3445});
            assert.strictEqual('Andre', metadataEvaluation.name);
            assert.isTrue(metadataEvaluation.required);
        });
        it('DefaultMetadataFilter with a function, passing an array', function() {
            let metadata = [{
                name: 'Andre',
                required: m => m.number > 500
            },{
                name: 'Joseph',
                required: m => m.number > 1000
            }];
            let metadataEvaluation = metadataEvaluator.evaluate(metadata, { name: 'Andre', number: 3445});
            assert.strictEqual('Andre', metadataEvaluation[0].name);
            assert.isTrue(metadataEvaluation[0].required);
            assert.strictEqual('Joseph', metadataEvaluation[1].name);
            assert.isTrue(metadataEvaluation[1].required);
        });
        it('ConditionMessageFilter, when there is one and one truthy', function() {
            let metadata = {
                name: 'Andre',
                required: true,
                invalid: [
                    {
                        condition: m => m.name == 'Andre',
                        message: 'Name should not be andre'
                    }
                ]
            };
            let metadataEvaluation = metadataEvaluator.evaluate(metadata, { name: 'Andre'});
            assert.strictEqual('Andre', metadataEvaluation.name);
            assert.isTrue(metadataEvaluation.invalid.value);
            assert.strictEqual('Name should not be andre', metadataEvaluation.invalid.message);
        });
        it('ConditionMessageFilter, when there is multiple and one truthy', function() {
            let metadata = {
                name: 'Andre',
                required: true,
                invalid: [
                    {
                        condition: m => m.name == 'John',
                        message: 'Name should not be andre'
                    },
                    {
                        condition: m => m.number === 1000,
                        message: 'Number should not be 1000'
                    }
                ]
            };
            let metadataEvaluation = metadataEvaluator.evaluate(metadata, { name: 'Andre', number: 1000});
            assert.strictEqual('Andre', metadataEvaluation.name);
            assert.isTrue(metadataEvaluation.invalid.value);
            assert.strictEqual('Number should not be 1000', metadataEvaluation.invalid.message);
        });
        it('ConditionMessageFilter, when there is multiple and not a truthy', function() {
            let metadata = {
                name: 'Andre',
                required: true,
                invalid: [
                    {
                        condition: m => m.name == 'John',
                        message: 'Name should not be andre'
                    },
                    {
                        condition: m => m.number === 400,
                        message: 'Number should not be 1000'
                    }
                ]
            };
            let metadataEvaluation = metadataEvaluator.evaluate(metadata, { name: 'Andre', number: 1000});
            assert.strictEqual('Andre', metadataEvaluation.name);
            assert.isFalse(metadataEvaluation.invalid.value);
        });
    });

});