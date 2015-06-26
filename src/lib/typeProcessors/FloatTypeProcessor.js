import TypeProcessor from './TypeProcessor.js';

class FloatTypeProcessor extends TypeProcessor {

    /**
     * Processes a string as an integer
     * @param value
     */
    process(value) {
        // if the value is null or undefined
        if(value === undefined || value === null) {
            return {
                validationResult: 'sucess',
                convertedValue: null
            };
        }
        // if the value is a valid integer
        if(value.match(/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/)) {
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

export default new FloatTypeProcessor();