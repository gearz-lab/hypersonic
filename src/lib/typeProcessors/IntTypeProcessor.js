import TypeProcessor from './TypeProcessor.js';

class IntTypeProcessor extends TypeProcessor {

    /**
     * Processes a string as an integer
     * @param value
     */
    process(value) {
        if(value === undefined || value === null) {
            return {
                validationResult: 'sucess',
                convertedValue: null
            };
        }
        if(value.match(/^(\-|\+)?([0-9]+)$/)) {
            return {
                convertedValue: parseInt(value),
                validationResult: 'success'
            };
        }
        else {
            return {
                validationResult: 'error',
                convertedValue: undefined
            };
        }
    }
}

export default new IntTypeProcessor();