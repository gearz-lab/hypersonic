import React from 'react';
import Input from 'react-bootstrap/lib/Input';

const CheckBox = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        displayName: React.PropTypes.string
    },

    handleChange(event){
        let oldValue = this.props.value === true ? true : false;
        let newValue = !oldValue;
        this.props.onChange({name: this.props.name, value: newValue});
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
        // metadata
        let props = {
            type: 'checkbox',
            value: this.props.value,
            label: this.props.displayName,
            readOnly: this.props.readOnly,
            groupClassName: `group-class ${this._getVisibleStyle()}`,
            labelClassName: 'label-class',
            onChange:this.handleChange,
            help: this.props.help
        };
        if (this.props.value === true) {
            props.checked = true;
        }

        return (
            <Input {...props } />
        );
    }
});

export default CheckBox;