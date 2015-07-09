import Chai from 'Chai';
import metadataEvaluator from '../src/lib/MetadataEvaluator.js';
const assert = Chai.assert;

describe('MetadataEvaluator', function() {

    //describe('_evaluateRaw', function() {
    //    it('Basic usage', function() {
    //        let metadata = {
    //            name: 'Andre',
    //            required: true,
    //            invalid: undefined
    //        };
    //        let metadataEvaluation = metadataEvaluator._evaluateRaw(metadata, { name: 'Andre'});
    //        assert.isTrue(metadataEvaluation.required[0].value);
    //        assert.strictEqual('Andre', metadataEvaluation.name[0].value);
    //        assert.isUndefined(metadataEvaluation.invalid[0].value);
    //    });
    //});

    describe('evaluateNew', function() {
        it('DefaultMetadataFilter with literals', function() {
            let metadata = {
                name: 'Andre',
                required: true
            };
            let metadataEvaluation = metadataEvaluator.evaluateNew(metadata, { name: 'Andre'});
            assert.strictEqual('Andre', metadataEvaluation.name);
            assert.isTrue(metadataEvaluation.required);

        });
        it('DefaultMetadataFilter with a function', function() {
            let metadata = {
                name: 'Andre',
                required: m => m.number > 500
            };
            let metadataEvaluation = metadataEvaluator.evaluateNew(metadata, { name: 'Andre', number: 3445});
            assert.strictEqual('Andre', metadataEvaluation.name);
            assert.isTrue(metadataEvaluation.required);
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
            let metadataEvaluation = metadataEvaluator.evaluateNew(metadata, { name: 'Andre'});
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
            let metadataEvaluation = metadataEvaluator.evaluateNew(metadata, { name: 'Andre', number: 1000});
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
            let metadataEvaluation = metadataEvaluator.evaluateNew(metadata, { name: 'Andre', number: 1000});
            assert.strictEqual('Andre', metadataEvaluation.name);
            assert.isFalse(metadataEvaluation.invalid.value);
        });
    });

    describe('evaluate', function() {
        it('Basic usage', function() {
            let metadata = {
                name: 'Andre',
                required: true,
                invalid: undefined
            };
            let metadataEvaluation = metadataEvaluator.evaluate(metadata, { name: 'Andre'});
            assert.strictEqual(metadataEvaluation.name.value, 'Andre');
            assert.isTrue(metadataEvaluation.required.value);
            assert.isFalse(metadataEvaluation.invalid.value); //the invalid metadata has a description that says that if noone is true, than it's false
        });
        it('Required, when one of the expressions return true', function() {
            let metadata = {
                name: 'Andre',
                required: [
                    {
                        expression: m => m.name == 'Marc'
                    },
                    {
                        expression: m => m.name == 'Joseph'
                    }
                ],
                invalid: undefined
            };
            let metadataEvaluation = metadataEvaluator.evaluate(metadata, { name: 'Andre'});
            assert.isFalse(metadataEvaluation.required.value); //the required metadata has a description that says that if noone is true, than it's false
        });
    });

    describe('evaluateProperty', function() {

        it('Literal', function() {
            let metadata = {
                name: 'name',
                required: true
            };
            let evaluation = metadataEvaluator.evaluateProperty(metadata.required, { name: 'Andre' });
            assert.isTrue(evaluation[0].value);
        });

        it('Literal, non-existing property', function() {
            let metadata = {
                name: 'name'
            };
            let evaluation = metadataEvaluator.evaluateProperty(metadata.required, { name: 'Andre' });
            assert.isUndefined(evaluation.value);
        });

        it('Literal, string', function () {
            let metadata = {
                name: 'name',
                required: true
            };
            let evaluation = metadataEvaluator.evaluateProperty(metadata.name, {name: 'Andre'});
            assert.equal('name' ,evaluation[0].value);
        });

        it('Object', function() {
            let metadata = {
                required: { expression: () => true }
            };
            let evaluation = metadataEvaluator.evaluateProperty(metadata.required, {name: 'Andre'});
            assert.isTrue(evaluation[0].value);
        });

        describe('Function values', function() {
            it('True', function() {
                let metadata = {
                    name: 'name',
                    required: [{ expression: m => m.name.length > 2 }]
                };
                let evaluation = metadataEvaluator.evaluateProperty(metadata.required, { name: 'John' });
                assert.isTrue(evaluation[0].value);
            });

            it('False', function() {
                let metadata = {
                    name: 'Andre',
                    required: [{ expression: m => m.name == 'Andre' }]
                };
                let evaluation = metadataEvaluator.evaluateProperty(metadata.required, { name: 'John' });
                assert.isUndefined(evaluation.value);
            });

            it('Multiple expressions', function() {
                let metadata = {
                    name: 'value',
                    required: [{ expression: m => m.name.length > 2 }, { expression: m => m.name == 'Andre' }]
                };
                let evaluation = metadataEvaluator.evaluateProperty(metadata.required, { name: 'Andre' });
                assert.isTrue(evaluation[0].value);
                assert.isTrue(evaluation[1].value);
            });

            it('Should not trigger exception on evaluating expressions - first level', function() {
                let metadata = {
                    name: 'value',
                    required: [{ expression: m => m.nonExistingProperty < 1000 }, { expression: m => m.name == 'Andre' }]
                };
                let evaluation = metadataEvaluator.evaluateProperty(metadata.required, { name: 'Andre' });
                assert.isFalse(evaluation[0].value); // this is not the desired behavior. undefined < 1000 returns false instead of triggering an exception
                assert.isTrue(evaluation[1].value);
            });

            it('Should not trigger exception on evaluating expressions - second level', function() {
                let metadata = {
                    name: 'value',
                    required: [{ expression: m => m.foo.nonExistingProperty < 1000 }, { expression: m => m.name == 'Andre' }]
                };
                let evaluation = metadataEvaluator.evaluateProperty(metadata.required, { name: 'Andre' });
                assert.isUndefined(evaluation[0].value);
                assert.isTrue(evaluation[1].value);
            });
        });

    });

    describe('evaluatePropertyFirst', function() {
        it('Literal, non-existing', function() {
            let metadata = {
                name: 'name',
                required: false
            };
            let evaluation = metadataEvaluator.evaluatePropertyFirst(metadata.required, { name: 'Andre' }, true);
            assert.isUndefined(evaluation.value);
        });
        it('Literal, existing', function() {
            let metadata = {
                name: 'name',
                required: true
            };
            let evaluation = metadataEvaluator.evaluatePropertyFirst(metadata.required, { name: 'Andre' }, true);
            assert.isTrue(evaluation.value);
        });
        it('Object, non-existing', function() {
            let metadata = {
                name: 'name',
                required: {expression: m => m.name == 'John'}
            };
            let evaluation = metadataEvaluator.evaluatePropertyFirst(metadata.required, { name: 'Andre' }, true);
            assert.isUndefined(evaluation.value);
        });
        it('Object, existing', function() {
            let metadata = {
                name: 'name',
                required: {expression: m => m.name == 'John'}
            };
            let evaluation = metadataEvaluator.evaluatePropertyFirst(metadata.required, { name: 'John' }, true);
            assert.isTrue(evaluation.value);
        });
        it('Object list, non-existing', function() {
            let metadata = {
                name: 'name',
                required: [{expression: m => m.name == 'John'}, {expression: m => m.name == 'Josepth'}]
            };
            let evaluation = metadataEvaluator.evaluatePropertyFirst(metadata.required, { name: 'Andre' }, true);
            assert.isUndefined(evaluation.value);
        });
        it('Object list, existing', function() {
            let metadata = {
                name: 'name',
                required: [{expression: m => m.name == 'John'}, {expression: m => m.name == 'Josepth'}]
            };
            let evaluation = metadataEvaluator.evaluatePropertyFirst(metadata.required, { name: 'John' }, true);
            assert.isTrue(evaluation.value);
        });
    });
});