import React from 'react';
import FormControls from 'react-bootstrap/lib/FormControls';

const Label = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        displayName: React.PropTypes.string
    },

    render: function() {
        // metadata
        let props = {
            value: this.props.value,
            label: this.props.displayName
        };

        return (
            <FormControls.Static {...props } />
        );
    }
});

export default Label;