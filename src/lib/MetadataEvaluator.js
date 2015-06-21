class MetadataEvaluator {
    /**
     * Validates a field metadata object
     * @param fieldMetadata
     */
    validate(fieldMetadata) {
        if(!fieldMetadata) throw new Error('');
        function validateMetadata(propertyName, value) {
            if(value === undefined)
                return;
            // required should be either a bool or a function
            if(value == null || (typeof value != 'boolean' && !(value instanceof Array)))
                throw new Error(`"${propertyName}" should be either a bool or an array containing objects`);
            // additional validation for Arrays
            if(value instanceof Array) {
                value.forEach(item =>{ if(typeof item != 'object') throw new Error(`The items in the "${propertyName}" array should be objects`)});
            }
        };
        validateMetadata("required", fieldMetadata.required);
        validateMetadata("invisible", fieldMetadata.invisible);
        validateMetadata("disabled", fieldMetadata.disabled);
        validateMetadata("invalid", fieldMetadata.invalid);
    }
    
    evaluate(model, fieldMetadata) {

    }
}

export default MetadataEvaluator;