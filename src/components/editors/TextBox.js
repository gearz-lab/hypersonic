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

        // metadata
        let props = {
            value: value,
            placeholder: this.props.placeholder,
            label: this.props.displayName,
            help: this.props.help,
            readOnly: this.props.readOnly,
            addonBefore: this.props.addonBefore,
            addonAfter: this.props.addonAfter,
            hasFeedback: this.props.hasFeedback,
            groupClassName: `group-class ${this._getVisibleStyle()}`,
            labelClassName: 'label-class',
            onChange:this.handleChange
        };

        if(props.hasFeedback) {
            props.bsStyle = this._getValidStyle()
        }

        return (
            <Input
                type='text'
                ref='input'
                {...props }
                />
        );
    }
});

export default TextBox;