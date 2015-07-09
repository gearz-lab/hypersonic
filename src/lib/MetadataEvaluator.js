import expressionEvaluator from './expressionEvaluator.js';
import defaultMetadataFilter from './metadataPropertyFilters/defaultMetadataPropertyFilter.js';
import conditionMessageFilter from './metadataPropertyFilters/conditionMessagePropertyFilter.js';
import _ from 'underscore';

class MetadataEvaluator {

    constructor() {
        this.metadataFilters = {};
    }

    /**
     * Evaluates the given expression against the model
     * @param expression
     * @param model
     * @private
     */
    _evaluateExpression(expression, model){
        return expressionEvaluator.evaluate(expression, model);
    }

    /**
     * Evaluates the given expression against the model
     * @param metadata
     * @param model
     * @returns {{}}
     */
    evaluate(metadata, model) {
        if(!metadata) {
            throw new Error('metadata parameter is required');
        }
        let result = {};
        for (var property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                let filter;
                if (this.metadataFilters.hasOwnProperty(property)) {
                    // if there's a particular filter for the given property
                    filter = this.metadataFilters[property];
                }
                else {
                    // if there's not a particular filter for the given property
                    filter = defaultMetadataFilter;
                }
                result[property] = filter.filter(metadata[property], model);
            }
        }

        return result;
    }

    /**
     * Sets the filter for the given metadata name
     * @param metadataName
     * @param filter
     */
    setFilter(metadataName, filter) {
        if(!metadataName) {
            throw new Error('metadataName is required');
        }
        if(!filter) {
            throw new Error('filter is required');
        }
        this.metadataFilters[metadataName] = filter;
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
     * Returns whether or not the given property exists in the given metadata
     * @param metadata
     * @param property
     * @returns {*|boolean}
     */
    exists(metadata, property) {
        return metadata && metadata.hasOwnProperty(property);
    }

}

let metadataEvaluator = new MetadataEvaluator();
metadataEvaluator.setFilter('invalid', conditionMessageFilter);

export default metadataEvaluator;