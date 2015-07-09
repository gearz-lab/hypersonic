import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input';

const TextBox = React.createClass({

    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired
    },

    /**
     * Returns the style due to the valid state
     */
    _getValidStyle() {
        if(this.props.invalid) {
            if(!this.props.invalid.value) {
                throw new Error('invalid prop should have a value property');
            }
            var invalid = this.props.invalid.value;
            if(invalid.value) {
                return 'error';
            }
        }
        return 'success';
    },

    /**
     * Returns the style due to the visible state
     */
    _getVisibleStyle() {
        var invisible = this.props.invisible;
        if(invisible) {
            return 'hide';
        }
        return '';
    },

    handleChange(event){
        let newValue = event.target.value;
        this.props.onChange({name: this.props.name, value: newValue});
    },

    render() {
        let value = this.props.value;
        if(value === undefined || value === null) {
            // the value can never be null or undefined, because the Input will act as 'uncontrolled' if so, meaning that
            // it will allow whatever the user inputs
            value = '';
        }

        console.log(value);

        // metadata
        let placeholder = this.props.placeholder;
        let displayName = this.props.displayName;
        let help = this.props.help;
        let readOnly = this.props.readOnly;
        let addonBefore = this.props.addonBefore;
        let addonAfter = this.props.addonAfter;

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