import React from 'react';
import Select2 from 'react-select';

const S = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        displayName: React.PropTypes.string,
        options: React.PropTypes.array.isRequired
    },

    handleChange(value){
        this.props.onChange({name: this.props.name, value: value});
    },

    render: function() {

        // metadata
        let props = {
            value: this.props.value,
            name: this.props.name,
            options: this.props.options,
            onChange: this.handleChange,
            disabled: true
        };

        return (
            <div className="form-group">
                <label className="control-label label-class"><span>Name</span></label>
                <Select2 {...props} />
            </div>
        );
    }
});

export default S;