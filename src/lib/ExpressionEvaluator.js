import textExpressionEvaluator from './TextExpressionEvaluator.js';

/**
 * Evaluates expressions
 */
export default {
        /**
         * Evaluates the given expression
         * @param expression - the expression to be evaluated. This can be either a constant, a function or a text expression
         * @param data - the data scope in which the expression will be executed
         * @returns {Object}
         */
        evaluate: function (expression, data) {
            switch (typeof expression) {
                case 'function':
                    try {
                        return expression(data);
                    }catch(ex) {
                        // expressions shouldn't trigger an error
                        return undefined;
                    }
                case 'string':
                    return textExpressionEvaluator.evaluate(expression, data);
                default:
                    throw new Error('Expression should be either a function or a string');
            }
        }
    };
