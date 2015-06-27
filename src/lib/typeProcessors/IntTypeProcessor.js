import TypeProcessor from './TypeProcessor.js';

class IntTypeProcessor extends TypeProcessor {

    /**
     * Processes a string as an integer
     * @param value
     */
    process(value) {
        // if the value is null or undefined
        if(value === undefined || value === null || value === '') {
            return {
                validationResult: 'success',
                convertedValue: undefined
            };
        }
        // if the value is a valid integer
        else if(value.match(/^(\-|\+)?([0-9]+)$/)) {
            return {
                convertedValue: Number(value),
                validationResult: 'success'
            };
        }
        // if the value is not a valid integer
        else {
            return {
                validationResult: 'error',
                convertedValue: undefined
            };
        }
    }
}

export default new IntTypeProcessor();