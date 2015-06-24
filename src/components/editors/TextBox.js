import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input';
import DataEvaluator from '../../lib/DataEvaluator.js';
import MetadataEvaluator from '../../lib/MetadataEvaluator.js';
const metadataEvaluator = new MetadataEvaluator();

const TextBox = React.createClass({

    propTypes: {
        metadata: React.PropTypes.object.isRequired,
        model: React.PropTypes.node.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    validationState() {
        let metadata = this.props.metadata;
        let model = this.props.model;
        var invalid = metadataEvaluator.evaluate(metadata.invalid, model);
        if(invalid) {
            return 'error';
        }
        return 'success';
    },

    handleChange(event){
        this.props.onChange({name: this.props.metadata.name, value: event.target.value});
    },

    render() {

        let metadata = this.props.metadata;
        let model = this.props.model;

        let value = DataEvaluator.evaluate(metadata, model);
        let placeholder = metadataEvaluator.evaluate(metadata.placeholder, model).value;
        let displayName = metadataEvaluator.evaluate(metadata.displayName, model).value;

        let help = metadataEvaluator.evaluate(metadata.help, model).value;

        return (
            <Input
                type='text'
                value={value}
                placeholder={placeholder}
                label={displayName}
                help={help}
                bsStyle={this.validationState()}
                hasFeedback
                ref='input'
                groupClassName='group-class'
                labelClassName='label-class'
                onChange={this.handleChange} />
        );
    }
});

export default TextBox;