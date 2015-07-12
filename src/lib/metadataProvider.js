import _ from 'underscore';

class MetadataProvider {

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    validateFieldMetadata(metadata) {
        if(!metadata) throw new Error('metadata should not be null or undefined');
        if(!metadata.name) throw new Error('metadata\'s "name" property is required');
    }

    /**
     * Merges the given field collection
     * @param entityFields
     * @param layoutFields
     * @returns {Array}
     */
    mergeFields(entityFields, layoutFields) {

        const fields = layoutFields.map(item => {
            let existingEntityProperty = _.find(entityFields, property => property.name == item.name);
            let field = existingEntityProperty ? existingEntityProperty : {};
            field = _.extend({}, field, item);
            this.validateFieldMetadata(field);
            return field;
        });

        return fields;
    }
}

export default new MetadataProvider();