import expressionEvaluator from '../expressionEvaluator.js';

class DefaultMetadataFilter {
    filter(metadataValue, model) {
        if(!metadataValue) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        if (typeof(metadataValue) === "function") {
            // do something
            return expressionEvaluator.evaluate(metadataValue, model);
        }
        return metadataValue;
    }
}
export default new DefaultMetadataFilter();