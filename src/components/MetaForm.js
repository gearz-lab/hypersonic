import React from 'react';
import Router from 'react-router';
import componentFactory from '../lib/ComponentFactory';
import _ from 'underscore';

var MetaForm = React.createClass({

    propTypes: {
        entityType: React.PropTypes.object.isRequired,
        layout: React.PropTypes.object.isRequired,
        model: React.PropTypes.object
    },

    getDefaultProps: function() {
        // properties that are not rquired have a default value
        return {
            model: new Object()
        }
    },

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    _validateMetadata: function(metadata) {
        if(!metadata) throw new Error('metadata should not be null or undefined');
        if(!metadata.name) throw new Error('metadata\'s "name" property is required');
    },

    /**
     * Gets the fields
     * @returns {Array}
     * @private
     */
    _getFields: function() {
        var entityType = this.props.entityType;
        var layout = this.props.layout;

        if(!entityType) throw new Error('entityType is required');
        if(!layout.fields) throw new Error('entityType should have a property called "fields"');
        if(!layout) throw new Error('layout is required');
        if(!layout.fields) throw new Error('layout should have a property called "fields"');

        const fields = layout.fields.map(item => {

            let field;

            if(typeof item == 'string') {
                // in this case, the item represents a property in the entityType
                field = _.find(entityType.fields, property => property.name == item);
                if(!field)
                    throw new Error(`Property not found. Property: ${item}`);
                field = _.extend({}, field);
                this._validateMetadata(field);
                return field;
            }

            // in this case, the item doesn't represent a property in the entityType
            let existingEntityProperty = _.find(entityType.fields, property => property.name == item.name);
            if(existingEntityProperty) {
                field = _.extend({}, existingEntityProperty);
            }
            else {
                field = {};
            }
            field = _.extend(field, item);
            this._validateMetadata(field);
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
        return this.props.model;
    },

    _getModelProperty: function(propertyName) {

    },

    render: function() {
        var fields = this._getFields();
        // the model is cloned for security reasons, to make it hard for the components to
        // interfere with the MetaForm model. It could even be cloned once per property,
        // but that would impact performance.
        var model = _.extend({}, this.props.model);
        var onChange = function() {};
        return (
            <div>
                { fields.map(field => componentFactory.buildComponent(field, model, onChange)) }
            </div>
        );
    }
});

export default MetaForm;