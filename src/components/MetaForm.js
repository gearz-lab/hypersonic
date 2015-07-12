import React from 'react';
import Router from 'react-router';
import componentFactory from '../lib/componentFactory';
import metadataEvaluator from '../lib/metadataEvaluator.js';
import dataEvaluator from '../lib/dataEvaluator.js';
import collectionHelper from '../lib/helpers/collectionHelper.js';
import typeProcessorFactory from '../lib/typeProcessorFactory.js';
import Button from 'react-bootstrap/lib/Button.js';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar.js';
import _ from 'underscore';

var MetaForm = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        fields: React.PropTypes.object.isRequired,
        model: React.PropTypes.object
    },

    getInitialState: function() {
        let model = _.extend({},this.props.model ? this.props.model : {});
        let componentProps = this.getComponentProps(this.props.fields, model);

        return {
            validationSummary: {
                open: false,
                messages: []
            },
            model: model,
            // object with a key for each property
            componentProps: componentProps
        }
    },

    /**
     *
     * @param metadata
     * @param model
     */
    postProcessComponentProps: function(componentProps, property, rawValue) {

    },

    /**
     * Returns a validation summary for the given componentProps
     * @param componentProps
     * @returns {Array}
     */
    getValidationSummary: function(componentProps) {
        let result = [];
        for(let key in componentProps) {
            if(componentProps.hasOwnProperty(key)) {
                if(componentProps[key].invalid && componentProps[key].invalid.value == true) {
                    result.push(componentProps[key].invalid.message);
                }
            }
        }
        return result;
    },

    /**
     * Returns an object with a property for each given field metadata. The value is the metadata already
     * processed for the given model
     * @param fields
     * @param model
     * @returns {Object}
     * @private
     */
    getComponentProps: function(fields, model) {
        // will evaluate all the fields and return an array
        let processedFields = metadataEvaluator.evaluate(fields, model);

        let _this = this;
        processedFields = processedFields.map(field => {
            field.key = field.name;
            field.onChange = e => _this.updateState(field, e.value);
            if(!field.hasOwnProperty('value')) {
                field.value = dataEvaluator.evaluate(field, model);
            }
            return field;
        });

        // will convert the array into an object
        return collectionHelper.toObject(processedFields, 'name');
    },

    updateState(fieldMetadata, newValue) {
        let newState = _.extend({}, this.state);
        console.log(newState);

        let typeProcessorType = typeProcessorFactory.getProcessorType(fieldMetadata.type);
        let typeProcessor = new typeProcessorType();
        let typeProcessed = typeProcessor.process(newValue);

        if(typeProcessed.valid) {
            // the user input is valid for it's type
            newState.model[fieldMetadata.name] = typeProcessed.convertedValue;
            newState.componentProps = this.getComponentProps(this.props.fields, newState.model);
            newState.componentProps[fieldMetadata.name].rawValue = newValue;
            newState.validationSummary = this.getValidationSummary(newState.componentProps);
        }
        else {
            // the user input is not valid for it's type.
            // in this case, there's no need to update the model neither to reprocess all
            // the componentProps
            newState.componentProps[fieldMetadata.name].rawValue = newValue;
            newState.componentProps[fieldMetadata.name].invalid = {
                value: true,
                message: `This field should be a valid ${fieldMetadata.type}`
            }
            newState.validationSummary = this.getValidationSummary(newState.componentProps);
        }

        this.setState(newState);
    },

    render: function() {
        // the model is cloned for security reasons, to make it hard for the components to
        // interfere with the MetaForm model. It could even be cloned once per property,
        // but that would impact performance.
        let _this = this;
        return (
            <div>
                <h3>{_this.props.title}</h3>
                <div>
                    {
                        Object.keys(_this.state.componentProps).map(fieldName => componentFactory.buildComponent(_this.state.componentProps[fieldName]))
                    }
                </div>
                <div className='pull-right'>
                    <ButtonToolbar>
                        <Button bsStyle='primary'>Save</Button>
                        <Button>Cancel</Button>
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
});

export default MetaForm;