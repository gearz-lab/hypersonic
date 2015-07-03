import Chai from 'Chai';
import MetadataEvaluator from '../src/lib/MetadataEvaluator.js';
const assert = Chai.assert;
const metadataEvaluator = new MetadataEvaluator();

describe('MetadataEvaluator', function() {

    describe('evaluate', function() {

        it('Literal', function() {
            let metadata = {
                name: 'name',
                required: true
            };
            let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André' });
            assert.isTrue(evaluation[0].value);
        });

        it('Literal, non-existing property', function() {
            let metadata = {
                name: 'name'
            };
            let evaluation = metadataEvaluator.evaluate(metadata.required, { name: 'André' });
            assert.isUndefined(evaluation.value);
        });

        it('Literal, string', function () {
            let metadata = {
                name: 'name',
                required: true
            };
            let evaluation = metadataEvaluator.evaluate(metadata.name, {name: 'André'});
            assert.equal('name' ,evaluation[0].value);
        });

        it('Object', function() {
            let metadata = {
                required: { expression: () => true }
            };
            let evaluation = metadataEvaluator.evaluate(metadata.required, {name: 'André'});
            assert.isTrue(evaluation[0].value);
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

    describe('evaluateAny', function() {
        it('Literal, non-existing', function() {
            let metadata = {
                name: 'name',
                required: false
            };
            let evaluation = metadataEvaluator.evaluateFirst(metadata.required, true, { name: 'André' });
            assert.isUndefined(evaluation.value);
        });
        it('Literal, existing', function() {
            let metadata = {
                name: 'name',
                required: true
            };
            let evaluation = metadataEvaluator.evaluateFirst(metadata.required, true, { name: 'André' });
            assert.isTrue(evaluation.value);
        });
        it('Object, non-existing', function() {
            let metadata = {
                name: 'name',
                required: {expression: m => m.name == 'John'}
            };
            let evaluation = metadataEvaluator.evaluateFirst(metadata.required, true, { name: 'André' });
            assert.isUndefined(evaluation.value);
        });
        it('Object, existing', function() {
            let metadata = {
                name: 'name',
                required: {expression: m => m.name == 'John'}
            };
            let evaluation = metadataEvaluator.evaluateFirst(metadata.required, true, { name: 'John' });
            assert.isTrue(evaluation.value);
        });
        it('Object list, non-existing', function() {
            let metadata = {
                name: 'name',
                required: [{expression: m => m.name == 'John'}, {expression: m => m.name == 'Josepth'}]
            };
            let evaluation = metadataEvaluator.evaluateFirst(metadata.required, true, { name: 'André' });
            assert.isUndefined(evaluation.value);
        });
        it('Object list, existing', function() {
            let metadata = {
                name: 'name',
                required: [{expression: m => m.name == 'John'}, {expression: m => m.name == 'Josepth'}]
            };
            let evaluation = metadataEvaluator.evaluateFirst(metadata.required, true, { name: 'John' });
            assert.isTrue(evaluation.value);
        });
    });
});