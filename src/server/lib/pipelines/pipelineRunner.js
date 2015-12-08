/**
 * Runs asynchronous pipelines
 */
class PipelineRunner {
    /**
     * Runs the given pipeline
     * @param pipeline
     * @param middlewareArgs
     * @param input
     * @param next
     */
    run(pipeline, middlewareArgs, input, next) {
        if (!pipeline) throw Error('\'pipeline\' should be truthy');
        if (!context) throw Error('\'context\' should be truthy');
        if (!input) throw Error('\'input\' should be truthy');
        if (!next) throw Error('\'next\' should be truthy');
        if (!pipeline.length) throw Error('\'pipeline.length\' should be truthy');

        let index = 0;

        let link = (error, result) => {
            if (error) {
                next(error);
                return;
            }
            let nextIndex = index++;
            if (nextIndex < pipeline.length) {

                // middleware arguments should be 1) result 2) all the arguments passed in middlewareArgs 3) link
                let args = [result];
                args = args.concat(middlewareArgs);
                args.push(link);

                pipeline[nextIndex].apply(null, args);
            }
            else {
                next(null, result);
            }
        };

        // middleware arguments should be 1) result 2) all the arguments passed in middlewareArgs 3) link
        let args = [input];
        args = args.concat(middlewareArgs);
        args.push(link);

        pipeline[index++].apply(null, args);
    }
}

export default new PipelineRunner();