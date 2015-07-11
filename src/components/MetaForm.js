import React from 'react';
import Router from 'react-router';
import componentFactory from '../lib/componentFactory';
import metadataEvaluator from '../lib/metadataEvaluator.js';
import dataEvaluator from '../lib/dataEvaluator.js';
import collectionHelper from '../lib/helpers/collectionHelper.js';
import _ from 'underscore';

var MetaForm = React.createClass({

    propTypes: {
        entityType: React.PropTypes.object.isRequired,
        layout: React.PropTypes.object.isRequired,
        model: React.PropTypes.object
    },

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    _validateFieldMetadata: function(metadata) {
        if(!metadata) throw new Error('metadata should not be null or undefined');
        if(!metadata.name) throw new Error('metadata\'s "name" property is required');
    },

    getInitialState: function() {
        let model = _.extend({},this.props.model ? this.props.model : {});
        let mergedFields = this._getMergedFields();
        let processedFields = this._getProcessedFields(mergedFields, model);

        return {
            validationSummary: {
                open: false
            },
            model: model,
            // array
            originalFields: mergedFields,
            // object with a key for each property
            processedFields: processedFields,
            // object with a key for each property
            rawValues: { }
        }
    },

    /**
     * Returns an object with a property for each given field metadata. The value is the metadata already
     * processed for the given model
     * @param fields
     * @param model
     * @returns {Object}
     * @private
     */
    _getProcessedFields: function(fields, model) {
        // will evaluate all the fields and return an array
        let processedFields = metadataEvaluator.evaluate(fields, model);
        // will convert the array into an object
        return collectionHelper.toObject(processedFields, 'name');
    },

    /**
     * Gets the merged fields from the entityType and layout
     * @returns {Array}
     * @private
     */
    _getMergedFields: function() {
        var entityType = this.props.entityType;
        var layout = this.props.layout;

        if(!entityType) throw new Error('entityType is required');
        if(!layout.fields) throw new Error('entityType should have a property called "fields"');
        if(!layout) throw new Error('layout is required');
        if(!layout.fields) throw new Error('layout should have a property called "fields"');

        const fields = layout.fields.map(item => {

            let field;

            let existingEntityProperty = _.find(entityType.fields, property => property.name == item.name);
            if(existingEntityProperty) {
                field = _.extend({}, existingEntityProperty);
            }
            else {
                field = {};
            }
            field = _.extend(field, item);
            this._validateFieldMetadata(field);
            return field;
        });

        return fields;
    },

    /**
     * Gets the current model
     * @returns {*|Model|model}
     * @private
     */
    _getModel: function() {
        return this.state.model;
    },

    render: function() {
        var fields = this._getMergedFields();
        // the model is cloned for security reasons, to make it hard for the components to
        // interfere with the MetaForm model. It could even be cloned once per property,
        // but that would impact performance.
        let _this = this;
        return (
            <div>
                <div>
                    {
                        fields.map(field => {
                            var onChange = function(e) {
                                let newState = _.extend({}, _this.state);
                                newState.model[field.name] = e.value;
                                _this.setState(newState);
                            };
                            let model = _.extend({}, _this.state.model);
                            let fieldMetadataProcessed = metadataEvaluator.evaluate(field, model);
                            let component = componentFactory.buildComponent(fieldMetadataProcessed, model, onChange);
                            return component;
                        })
                    }
                </div>
                <p>Holy crap</p>
            </div>
        );
    }
});

export default MetaForm;