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
        //if(!metadata) throw new Error('metadata should not be null or undefined');
        //if(!metadata.name) throw new Error('metadata\'s "name" property is required');
    },

    _getFields: function() {
        var entityType = this.props.entityType;
        var layout = this.props.layout;

        if(!entityType) throw new Error('entityType is required');
        if(!layout.fields) throw new Error('entityType should have a property called "fields"');
        if(!layout) throw new Error('layout is required');
        if(!layout.fields) throw new Error('layout should have a property called "fields"');

        const fields = layout.fields.map(item => {
            if(typeof item == 'string') {
                // in this case, the item represents a property in the entityType
                let entityProperty = _.find(entityType.fields, property => property.name == item);
                if(!entityProperty)
                    throw new Error(`Property not found. Property: ${item}`);
                this._validateMetadata(entityProperty);
                return _.extend({}, entityProperty);
            }
            // in this case, the item doesn't represent a property in the entityType
            let field;
            let entityProperty = _.find(entityType.fields, property => property.name == item);
            if(entityProperty)
                field = _.extend({}, entityProperty);
            else
                field = {};
            field = _.extend(field, item);

            this._validateMetadata(field);
            return field;
        });

        // Because componentDidMount is not called on updates, it is safe to override the state
        // with a new object containing the fields

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