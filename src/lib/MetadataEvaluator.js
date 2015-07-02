import ExpressionEvaluator from './expressionEvaluator.js';
import _ from 'underscore';

class MetadataEvaluator {

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

        let evaluateMetadataObject = (metadata, model) => {
            if (metadata.expression && metadata.expressionText) {
                throw new Error('Metadata cannot define both expression and expressionText')
            }
            let expression = metadata.expression ? metadata.expression : metadata.expressionText;
            let evaluation = {value: this.evaluateExpression(expression, model)};
            _.extend(evaluation, metadata);

            delete evaluation.expression;
            delete evaluation.expressionText;

            return evaluation;
        };

        if(metadata instanceof Array) {
            let result = [];
            metadata.forEach(item => {
                result.push(evaluateMetadataObject(item, model));
            });
            return result;
        }
        else if(metadata instanceof Object) {
            let result = [];
            result.push(evaluateMetadataObject(metadata, model));
            return result;
        }
        else {
            return [{ value: metadata }];
        }
    }
}

export default MetadataEvaluator;