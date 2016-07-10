import { assert } from 'chai';
import pipelineRunner from '../src/server/lib/pipelines/pipelineRunner';


describe('PipelineRunner', () => {
    describe('run', function() {
        it('errors should work', function() {
            let pipeline = [];
            pipeline.push((errors, data, next, finish, context) => { next('error 1'); });
            pipeline.push((errors, data, next, finish, context) => { next('error 2'); });

            // pipeline, data, context , callback
            pipelineRunner.run(pipeline, 'happy', {}, (errors, data) => {
                assert.equal(errors.length, 2);
            });
        });

        it('data should be propagated', function() {
            let pipeline = [];
            pipeline.push((errors, data, next, finish, context) => { data.prop1 = 'prop1'; });
            pipeline.push((errors, data, next, finish, context) => { data.prop2 = 'prop2'; });

            // pipeline, data, context , callback
            pipelineRunner.run(pipeline, {}, {}, (errors, data) => {
                assert.equal(data.prop1, 'prop1');
                assert.equal(data.prop2, 'prop2');
            });
        });

        it('finish should work with no arguments', function() {
            let pipeline = [];
            pipeline.push((errors, data, next, finish, context) => { finish(); });
            pipeline.push((errors, data, next, finish, context) => { next('something went wrong'); /* this line should not be called */ });

            // pipeline, data, context , callback
            pipelineRunner.run(pipeline, {}, {}, (errors, data) => {
                assert.equal(0, errors.length);
            });
        });

        it('finish should work with an error argument', function() {
            let pipeline = [];
            pipeline.push((errors, data, next, finish, context) => { finish('stop'); });
            pipeline.push((errors, data, next, finish, context) => { next('something went wrong'); /* this line should not be called */ });

            // pipeline, data, context , callback
            pipelineRunner.run(pipeline, {}, {}, (errors, data) => {
                assert.equal(1, errors.length);
                assert.equal('stop', errors[0]);
            });
        });
    });
});
