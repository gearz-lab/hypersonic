import ExpressionEvaluator from './ExpressionEvaluator.js';

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
        return ExpressionEvaluator.evaluate(expression, model);
    }

    /**
     * Evaluates the fieldMetadata against the model
     * @param metadata
     * @param model
     */
    evaluate(metadata, model) {
        if(metadata instanceof Array) {
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
        else {
            return { value: metadata };
        }
    }
}

export default MetadataEvaluator;