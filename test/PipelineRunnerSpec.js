import chai from 'chai';
import pipelineRunner from '../src/server/lib/pipelines/pipelineRunner';
let assert = chai.assert;


describe('PipelineRunner', () => {
    describe('run', function() {
        it('Happy path', () => {
            let pipeline = [];
            pipeline.push((input, next) => { next(null, input); });
            pipeline.push((input, next) => { next(null, input); });

            pipelineRunner.run(pipeline, [], 'happy', (error, result) => {
                assert.strictEqual(result, "happy");
            });
        });

        it('Happy path - with arguments', () => {
            let pipeline = [];
            pipeline.push((input, context, next) => { next(null, input); });
            pipeline.push((input, context, next) => { next(null, input); });

            pipelineRunner.run(pipeline, [{}], 'happy', (error, result) => {
                assert.strictEqual(result, "happy");
            });
        });

        it('When something goes wrong', () => {
            let pipeline = [];
            pipeline.push((input, next) => { next(null, input); });
            pipeline.push((input, next) => { next('something went wrong'); });

            pipelineRunner.run(pipeline, [], 'happy', (error, result) => {
                assert.strictEqual(error, 'something went wrong');
            });
        });
    });
});
