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

        this.props.onChange({name: this.props.metadata.name, value: event.target.value});
    },

    render() {

        let metadata = this.props.metadata;
        let model = this.props.model;

        let value = DataEvaluator.evaluate(metadata, model);

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