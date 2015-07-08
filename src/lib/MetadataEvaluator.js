import ExpressionEvaluator from './expressionEvaluator.js';
import metadataDescriptor from './metadataDescriptor.js';
import _ from 'underscore';

class MetadataEvaluator {

    /**
     * Evaluates the given expression against the model
     * @param expression
     * @param model
     * @private
     */
    _evaluateExpression(expression, model){
        return ExpressionEvaluator.evaluate(expression, model);
    }

    /**
     * Evaluates all metadata in the given metadata object and return their values in raw
     * mode, meaning each of them will be represented by an array instead of an actuall value
     * @param metadata
     * @param model
     */
    _evaluateRaw(metadata, model) {
        if(!metadata) {
            throw new Error('metadata parameter is required');
        }
        let result = {};
        for (var property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                result[property] = this.evaluateProperty(metadata[property], model);
            }
        }
        return result;
    }

    /**
     * Evaluates all metadata in the given metadata object and return their values
     * @param metadata
     * @param model
     * @returns {*}
     */
    evaluate(metadata, model) {
        let rawEvaluation = this._evaluateRaw(metadata, model);
        return metadataDescriptor.getConvertedMetadata(rawEvaluation);
    }

    /**
     * Evaluates the field metadata against the model
     * @param metadata
     * @param model
     */
    evaluateProperty(metadata, model) {

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
            let evaluation = {value: this._evaluateExpression(expression, model)};
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
    evaluatePropertyFirst(metadata, model, value) {
        let evaluation = this.evaluateProperty(metadata, model);
        let foundElement = _.find(evaluation, m => m.value == value);
        if(foundElement) {
            return foundElement;
        }
        return { value: undefined };
    }

    /**
     * Evaluates metadata when metadata cannot contain more than one element
     * @param metadata
     * @param model
     * @returns {*}
     */
    evaluatePropertySingle(metadata, model) {
        if (metadata instanceof Array) {
            if(metadata.lenth > 1) {
                throw new Error('Metadata should not contain more than one element');
            }
        }
        let evaluation = this.evaluateProperty(metadata, model);
        return evaluation[0];
    }

    /**
     * Returns whether or not the given property exists in the given metadata
     * @param metadata
     * @param property
     * @returns {*|boolean}
     */
    exists(metadata, property) {
        return metadata && metadata.hasOwnProperty(property);
    }

}

export default MetadataEvaluator;