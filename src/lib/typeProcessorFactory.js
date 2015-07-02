import IntTypeProcessor from './typeProcessors/IntTypeProcessor.js';
import FloatTypeProcessor from './typeProcessors/FloatTypeProcessor.js';

class TypeProcessorFactory {

    constructor() {
        this.processorsByType = { };
    }

    registerProcessorType(type, processor) {
        this.processorsByType[type] = processor;
    }

    getProcessorType(type) {
        if(type in this.processorsByType) {
            return this.processorsByType[type];
        }
        return undefined;
    }
}

let typeProcessorFactory = new TypeProcessorFactory();

typeProcessorFactory.registerProcessorType('int', IntTypeProcessor);
typeProcessorFactory.registerProcessorType('float', FloatTypeProcessor);

export default typeProcessorFactory;