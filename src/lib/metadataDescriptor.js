import _ from 'underscore';
/**
 * Contains description for metadata and also converts a raw metadata object to one respecting the description
 */
class MetadataDescriptor {

    constructor() {
        this.descriptions = {};
    }

    /**
     * Gets the default description for properties that don't have any
     * @returns {{cardinality: string}}
     * @private
     */
    _getDefaultDescription() {
        return { cardinality: 'single'};
    }

    /**
     * Gets the converted metadata according to the current description, set through the 'set' method
     * @param metadata This is expected to be the result of MetadataEvaluator._evaluateRaw. Every property must be an array
     * @param model
     */
    getConvertedMetadata(metadata) {
        if(!metadata) {
            throw new Error('metadata parameter is required');
        }
        let result = {};
        for (var property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                let description = this.descriptions.hasOwnProperty(property) ? this.descriptions[property] : this._getDefaultDescription();
                let metadataValue = metadata[property];

                // metadata is either a literal or an array containing expressions
                if(metadataValue === undefined || metadataValue === null) {
                    result[property] = metadataValue;
                    continue;
                }

                if(!(metadataValue.constructor === Array)) {
                    result[property] = metadataValue;
                    continue;
                }

                // here, it's definitely an array, so let's process it
                if(description.cardinality == 'single') {
                    if (metadataValue.length != 1) {
                        throw new Error(`property metadata should have only one object when it's type is 'single'. property: ${metadata.name}`);
                    }
                    result[property] = metadataValue[0];
                }
                else if(description.cardinality == 'multiple') {
                    if(description.interest === undefined) {
                        throw new Error(`metadata description should have an interest when cardinality is set to multiple. property: ${metadata.name}`);
                    }
                    let interestFound = _.find(metadataValue, i => i.value === description.interest);
                    if(interestFound) {
                        result[property] = interestFound;
                    }
                    else {
                        result[property] = { value: description.default };
                    }
                }
                else {
                    throw new Error(`metadata description contains an invalid cardinality. property: ${metadata.name}. Cardinality: ${description.cardinality}`);
                }
            }
        }
        return result;
    }

    /**
     * Sets the description for a property
     * @param property
     * @param description
     */
    set(property, description) {
        if(!property) {
            throw new Error('property parameter is required');
        }
        if(!description) {
            throw new Error('description parameter is required');
        }
        if(description.cardinality != 'multiple' && description.cardinality != 'single') {
            throw new Error('cardinality must be either \'multiple\' or \'single\'');
        }
        if(description.cardinality == 'multiple' && description.interest === undefined) {
            throw new Error('when defining the cardinality as multiple, there must be an interest');
        }
        this.descriptions[property] = description;
    }
}

let metadataDescriptor = new MetadataDescriptor();

metadataDescriptor.set('placeholder', { cardinality: 'single' });
metadataDescriptor.set('displayName', { cardinality: 'single' });
metadataDescriptor.set('help', { cardinality: 'single' });
metadataDescriptor.set('addonBefore', { cardinality: 'single' });
metadataDescriptor.set('addonAfter', { cardinality: 'single' });
metadataDescriptor.set('readOnly', { cardinality: 'multiple', interest: true, default: false });
metadataDescriptor.set('invalid', { cardinality: 'multiple', interest: true, default: false });
metadataDescriptor.set('required', { cardinality: 'multiple', interest: true, default: false });

export default metadataDescriptor;