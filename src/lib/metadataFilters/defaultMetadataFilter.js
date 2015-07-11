import expressionEvaluator from '../expressionEvaluator.js';

class DefaultMetadataFilter {
    filter(metadata, model) {
        if(!metadata) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        if(metadata.required) {
            metadata.invalid = {value: true, message: `The field ${metadata.name} is required`};
        }
        return metadata;
    }
}
export default new DefaultMetadataFilter();