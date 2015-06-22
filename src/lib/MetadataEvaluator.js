class MetadataEvaluator {

    _validate(metadata) {
        if(!metadata) {
            return true;
        }
        if(metadata instanceof Array) {

        }
        throw new Error('metadata should either be a boolean or an array');
    }

    /**
     * Evaluates the given expression agains the model
     * @param expression
     * @param model
     * @private
     */
    evaluateExpression(expression, model){
        if(typeof expression === 'function'){
            try {
                return expression(model);
            } catch(ex) {
                // expression evaluation should not trigger an exception
                return undefined;
            }
        }
        else if (typeof expression == 'string'){
            // not implemented yet
        }
        else {
            throw new Error('expression should be either a function or a string');
        }
    }

    /**
     * Evaluates the fieldMetadata against the model
     * @param metadata
     * @param model
     */
    evaluate(metadata, model) {
        if(!metadata)
            return { value: false };
        if(typeof metadata == 'boolean'){
            return { value: metadata };
        }
        else if(metadata instanceof Array) {
            let resultingValue = { value: undefined, messages: [] };
            let defaultMetadata;
            metadata.forEach(item => {
                if(item.expression == 'default'){
                    // this is the default expression. Let's store it
                    defaultMetadata = item;
                }
                else if(this.evaluateExpression(item.expression, model)){
                    resultingValue.value = item.value;
                }
            });
            if(resultingValue.value === undefined && defaultMetadata != undefined){
                resultingValue.value = defaultMetadata.value;
            }
            return resultingValue;
        }
    }
}

export default MetadataEvaluator;