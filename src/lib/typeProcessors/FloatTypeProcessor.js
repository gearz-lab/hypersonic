import Config from '../../../gearz.config.js';
import TypeProcessor from './TypeProcessor.js';

class FloatTypeProcessor extends TypeProcessor {

    constructor(config) {
        this.config = config ? config : Config.numberFormat;
        if(!this.config || !this.config.decimalMark) {
            throw new Error(`Could not get the number configuration. Make sure you have a file called gearz.config.js and that it exports an object like this: { numberFormat: { decimalMark:\'.\' } }`);
        }
    }

    /**
     * Processes a string as an integer
     * @param value
     */
    process(value) {

        let decimalMark = this.config.decimalMark;
        let floatValidationRegex = `^(\\-|\\+)?([0-9]+(\\${decimalMark}[0-9]+)?)$`;

        // if the value is null or undefined
        if(value === undefined || value === null || value === '') {
            return {
                validationResult: 'sucess',
                convertedValue: null
            };
        }
        // if the value is a valid integer
        if(value.match(new RegExp(floatValidationRegex, 'gi'))) {
            return {
                convertedValue: Number(value.replace(',','.')),
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

export default FloatTypeProcessor;