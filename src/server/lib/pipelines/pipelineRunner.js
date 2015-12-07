class PipelineRunner {
    /**
     * Runs the given pipeline
     * @param pipeline
     * @param input
     */
    run(pipeline, input) {
        if (!pipeline) throw Error('\'pipeline\' should be truthy');
        if (!input) throw Error('\'input\' should be truthy');
    }
}

export default new PipelineRunner();