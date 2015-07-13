import React from 'react';
import Input from 'react-bootstrap/lib/Input';

const Select = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        displayName: React.PropTypes.string,
        options: React.PropTypes.array.isRequired
    },

    handleChange(event){
        let newValue = event.target.value;
        console.log(newValue);
        this.props.onChange({name: this.props.name, value: newValue});
    },

    /**
     * Returns the style due to the valid state
     */
        _getValidStyle() {
        if(this.props.invalid) {
            if(this.props.invalid.value === undefined || this.props.invalid.value === null) {
                throw new Error('invalid prop should have a value property');
            }
            var invalid = this.props.invalid.value;
            if(invalid) {
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


    render: function() {
        let value = this.props.rawValue ? this.props.rawValue : this.props.value;
        if(value === undefined || value === null) {
            // the value can never be null or undefined, because the Input will act as 'uncontrolled' if so, meaning that
            // it will allow whatever the user inputs
            value = '';
        }

        // metadata
        let props = {
            value: value,
            ref: 'input',
            type: 'select',
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

        if(props.hasFeedback) {
            props.bsStyle = this._getValidStyle()
        }

        return (
                <Input {...props }>
                    {
                        this.props.options.map(i => <option value={i.value}>{i.text}</option>)
                    }
                </Input>
        );
    }
});

export default Select;