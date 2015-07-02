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
                assert.isTrue(evaluation[0].value);
            });

            it('False', function() {
                let metadata = {
                    name: 'name',
                    required: false
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André' });
                assert.isFalse(evaluation[0].value);
            });
        });

        describe('Nonexisting property', function() {
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
                assert.equal('name' ,evaluation[0].value);
            });
        });

        describe('Single object', function() {
            it('Should work', function() {
                let metadata = {
                    name: 'name',
                    required: { expression: m => m.name.length > 2 }
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'John' });
                assert.isTrue(evaluation[0].value);
            })
        });

        describe('Function values', function() {
            it('True', function() {
                let metadata = {
                    name: 'name',
                    required: [{ expression: m => m.name.length > 2 }]
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'John' });
                assert.isTrue(evaluation[0].value);
            });

            it('False', function() {
                let metadata = {
                    name: 'name',
                    required: [{ expression: m => m.name == 'André' }]
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'John' });
                assert.isUndefined(evaluation.value);
            });


            it('Multiple expressions', function() {
                let metadata = {
                    name: 'value',
                    required: [{ expression: m => m.name.length > 2 }, { expression: m => m.name == 'André' }]
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André' });
                assert.isTrue(evaluation[0].value);
                assert.isTrue(evaluation[1].value);
            });

            it('Should not trigger exception on evaluating expressions - first level', function() {
                let metadata = {
                    name: 'value',
                    required: [{ expression: m => m.nonExistingProperty < 1000 }, { expression: m => m.name == 'Andre' }]
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'Andre' });
                assert.isFalse(evaluation[0].value); // this is not the desired behavior. undefined < 1000 returns false instead of triggering an exception
                assert.isTrue(evaluation[1].value);
            });

            it('Should not trigger exception on evaluating expressions - second level', function() {
                let metadata = {
                    name: 'value',
                    required: [{ expression: m => m.foo.nonExistingProperty < 1000 }, { expression: m => m.name == 'Andre' }]
                };
                let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'Andre' });
                assert.isUndefined(evaluation[0].value);
                assert.isTrue(evaluation[1].value);
            });
        });

    });
});