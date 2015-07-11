import expressionEvaluator from '../expressionEvaluator.js';
import dataEvaluator from '../dataEvaluator.js';

class DefaultMetadataFilter {
    filter(metadata, model) {
        if(!metadata) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        let value = dataEvaluator.evaluate(metadata, model);
        if(metadata.required && (value === null || value === undefined || value === '')) {
            metadata.invalid = {value: true, message: `The field '${metadata.name}' is required`};
        }
        return metadata;
    }
}
export default new DefaultMetadataFilter();