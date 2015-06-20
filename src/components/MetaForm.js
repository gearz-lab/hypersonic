import React from 'react';
import Router from 'react-router';
import componentFactory from '../lib/ComponentFactory';
import _ from 'underscore';

var MetaForm = React.createClass({
    propTypes: {
        entityType: React.PropTypes.object,
        layout: React.PropTypes.object
    },

    _validateMetadata: function(metadata) {
        if(!metadata) throw new Error('metadata should not be null or undefined');
        if(!metadata.name) throw new Error('metadata\'s "name" property is required');
    },

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

    render: function() {
        var fields = this._getFields();
        return (
            <div>
                { fields.map(item => componentFactory.buildComponent(item)) }
            </div>
        );
    }
});

export default MetaForm;