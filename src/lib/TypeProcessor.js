import IntTypeProcessor from './typeProcessors/IntTypeProcessor.js';
import FloatTypeProcessor from './typeProcessors/FloatTypeProcessor.js';

class TypeProcessor {

    constructor() {
        this.processorsByType = { };
    }

    registerProcessor(type, processor) {
        this.processorsByType[type] = processor;
    }

    getProcessor(type) {
        if(this.processorsByType[type]) {
            return this.processorsByType[type];
        }
        return undefined;
    }
}

let typeProcessor = new TypeProcessor();

typeProcessor.registerProcessor('int', IntTypeProcessor);
typeProcessor.registerProcessor('float', FloatTypeProcessor);

export default typeProcessor;