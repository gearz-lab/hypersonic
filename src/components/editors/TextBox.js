import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input';
import DataEvaluator from '../../lib/DataEvaluator.js';
import MetadataEvaluator from '../../lib/MetadataEvaluator.js';
import TypeProcessor from '../../lib/TypeProcessor.js';
const metadataEvaluator = new MetadataEvaluator();

const TextBox = React.createClass({

    propTypes: {
        metadata: React.PropTypes.object.isRequired,
        model: React.PropTypes.node.isRequired,
        onChange: React.PropTypes.func.isRequired,
        // custom type processor. If not specified, will fall back to the default one for the type
        typeProcessor: React.PropTypes.object
    },

    /**
     * Returns the style due to the valid state
     */
    _getValidStyle() {
        let metadata = this.props.metadata;
        let model = this.props.model;
        var invalid = metadataEvaluator.evaluate(metadata.invalid, model);
        if(invalid.value) {
            return 'error';
        }
        return 'success';
    },

    /**
     * Returns the style due to the visible state
     */
    _getVisibleStyle() {
        let metadata = this.props.metadata;
        let model = this.props.model;
        var invisible = metadataEvaluator.evaluate(metadata.invisible, model);
        if(invisible.value) {
            return 'hide';
        }
        return '';
    },

    handleChange(event){
        let newValue = event.target.value;
        if(this.typeProcessor) {
            // if there's a type processor, we need to validate the processing
            // if the value is valid, we trigger the onChange considering the converted value
            let processingResult = this.typeProcessor.process(newValue);
            if(processingResult.validationResult == 'success') {
                this.props.onChange({name: this.props.metadata.name, value: processingResult.convertedValue});
            } else {
                // the provided value was not accepted by the processor
            }
        }
        else {
            // if there's no type processor, we just trigger the onChange considering the raw value
            this.props.onChange({name: this.props.metadata.name, value: newValue});
        }
    },

    componentWillMount() {
        let metadata = this.props.metadata;

        // if a custom typeprocessor has been passed as prop, uses it, otherwise, uses the default one for the type
        this.typeProcessor = this.props.typeProcessor ? this.props.typeProcessor : TypeProcessor.getProcessor(metadata.type);
    },

    render() {

        let metadata = this.props.metadata;
        let model = this.props.model;

        let value = DataEvaluator.evaluate(metadata, model);

        if(value === undefined || value === null) {
            // the value can never be null or undefined, because the Input will act as 'uncontrolled' if so, meaning that
            // it will allow whatever the user inputs
            value = '';
        }

        // metadata
        let placeholder = metadataEvaluator.evaluate(metadata.placeholder, model).value;
        let displayName = metadataEvaluator.evaluate(metadata.displayName, model).value;
        let help = metadataEvaluator.evaluate(metadata.help, model).value;
        let readOnly = metadataEvaluator.evaluate(metadata.readOnly, model).value;
        let addonBefore = metadataEvaluator.evaluate(metadata.addonBefore, model).value;
        let addonAfter = metadataEvaluator.evaluate(metadata.addonAfter, model).value;

        // styles
        let validStyle = this._getValidStyle();
        let visibleStyle = this._getVisibleStyle();

        return (
            <Input
                type='text'
                value={value}
                placeholder={placeholder}
                label={displayName}
                help={help}
                bsStyle={validStyle}
                hasFeedback
                ref='input'
                groupClassName={`group-class ${visibleStyle}`}
                labelClassName='label-class'
                onChange={this.handleChange}
                readOnly={readOnly}
                addonBefore={addonBefore}
                addonAfter={addonAfter}/>
        );
    }
});

export default TextBox;