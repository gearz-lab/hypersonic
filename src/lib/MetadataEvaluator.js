class MetadataEvaluator {

    /**
     * Evaluates the given expression agains the model
     * @param expression
     * @param model
     * @private
     */
    evaluateExpression(expression, model){
        if(typeof expression === 'function'){
            return expression(model);
        }
        else if (typeof expression == 'string'){
            // not implemented yet
        }
        else {
            throw new Error('expression should be either a function or a string');
        }
    }

    /**
     * Validates a field metadata object
     * @param fieldMetadata
     */
    validate(fieldMetadata) {

        if(!fieldMetadata) {
            throw new Error('');
        }

        if(!fieldMetadata.name) {
            throw new Error('"name" property is required');
        }

        function validateMetadata(propertyName, value) {
            if(value === undefined)
                return;
            // required should be either a bool or a function
            if(typeof value != 'boolean' && !(value instanceof Array))
                throw new Error(`"${propertyName}" should be either a bool or an array containing objects`);
            // additional validation for Arrays
            if(value instanceof Array) {
                value.forEach(item =>{ if(typeof item != 'object') throw new Error(`The items in the "${propertyName}" array should be objects`)});
            }
        }

        validateMetadata("required", fieldMetadata.required);
        validateMetadata("invisible", fieldMetadata.invisible);
        validateMetadata("disabled", fieldMetadata.disabled);
        validateMetadata("invalid", fieldMetadata.invalid);
    }

    /**
     * Evaluates the fieldMetadata against the model
     * @param fieldMetadata
     * @param model
     */
    evaluate(fieldMetadata, model) {
        this.validate(fieldMetadata);

        let evaluateMetadata = (value) => {
            if(value === undefined)
                return { value: false };
            if(typeof value == 'boolean'){
                return { value: value };
            }
            else if(value instanceof Array) {
                let resultingValue = { value: false, messages: [] };
                value.forEach(item => {
                    if(this.evaluateExpression(item.expression, model)){
                        resultingValue.value = true;
                    }
                });
                return resultingValue;
            }
        };

        return {
            required: evaluateMetadata(fieldMetadata.required),
            invisible: evaluateMetadata(fieldMetadata.invisible),
            disabled: evaluateMetadata(fieldMetadata.disabled),
            invalid: evaluateMetadata(fieldMetadata.invalid)
        };
    }
}

export default MetadataEvaluator;