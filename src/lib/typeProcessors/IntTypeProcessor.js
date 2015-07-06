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
                valid: true,
                convertedValue: undefined
            };
        }
        // if the value is a valid integer
        else if(value.match(/^(\-|\+)?([0-9]+)$/)) {
            return {
                valid: true,
                convertedValue: Number(value)
            };
        }
        // if the value is not a valid integer
        else {
            return {
                valid: false,
                convertedValue: undefined
            };
        }
    }
}

export default IntTypeProcessor;