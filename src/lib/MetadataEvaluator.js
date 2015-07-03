import ExpressionEvaluator from './expressionEvaluator.js';
import _ from 'underscore';

class MetadataEvaluator {

    /**
     * Evaluates the given expression against the model
     * @param expression
     * @param model
     * @private
     */
    evaluateExpression(expression, model){
        return ExpressionEvaluator.evaluate(expression, model);
    }

    /**
     * Evaluates the field metadata against the model
     * @param metadata
     * @param model
     */
    evaluate(metadata, model) {

        let evaluateMetadataObject = (metadata, model) => {

            if (metadata.expression && metadata.expressionText) {
                throw new Error('Metadata cannot define both expression and expressionText')
            }

            if (metadata.expression) {
                if(!(typeof(metadata.expression) === 'function')) {
                    throw new Error(`Error evaluating expression. Expression should be a function. Expression is of type: ${typeof metadata.expression}`);
                }
            }

            if (metadata.expressionText) {
                if(!(typeof(metadata.expressionText) === 'string')) {
                    throw new Error(`Error evaluating ExpressionText. ExpressionText should be a string representing a function. ExpressionText is of type: ${typeof metadata.expressionText}`);
                }
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

    /**
     * Tries to find a metadata definition that equals the value that equals value
     * @param metadata
     * @param value
     * @param model
     */
    evaluateFirst(metadata, model, value) {
        let evaluation = this.evaluate(metadata, model);
        let foundElement = _.find(evaluation, m => m.value == value);
        if(foundElement) {
            return foundElement;
        }
        return { value: undefined };
    }
}

export default MetadataEvaluator;