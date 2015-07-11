import expressionEvaluator from '../expressionEvaluator.js';

class DefaultMetadataFilter {
    filter(metadata, model) {
        if(!model) {
            throw new Error('model is required');
        }
        return metadata;
    }
}
export default new DefaultMetadataFilter();