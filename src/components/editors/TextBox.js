import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'

var TextBox = React.createClass({
    render: function() {
        return (
            <Input type='text' label='Name' placeholder='Enter text' />
        );
    }
});

export default TextBox;