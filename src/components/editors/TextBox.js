import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'

const ExampleInput = React.createClass({

    propTypes: {
        metadata: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        initialValue: React.PropTypes.node
    },

    getInitialState() {
        return {
            value: this.props.initialValue ? this.props.initialValue : ''
        };
    },

    validationState() {

        var metadata = this.props.metadata;
        var value = this.state.value;

        if(metadata.invalid){
            for(let i = 0; i < metadata.length; i++) {

            }
        }



        //var metadata = this.props.metadata;
        //if(metadata.invalid)
        //{
        //    if(typeof metadata.invalid == 'bool')
        //    {
        //
        //    }
        //    else if(typeof metadata.invalid == 'object') {
        //
        //    }
        //}
        //
        //
        //let length = this.state.value.length;
        //if (length > 10) { return 'success'; }
        //else if (length > 5) { return 'warning'; }
        //else if (length > 0) { return 'error'; }
    },

    handleChange() {
        var value = this.refs.input.getValue();
        this.setState({ value: value });
        this.props.onChange({name: this.props.metadata.name, value: value});
    },

    render() {
        var metadata = this.props.metadata;
        return (
            <Input
                type='text'
                value={this.state.value}
                placeholder={metadata.placeholder}
                label={metadata.displayName}
                help={metadata.help}
                bsStyle={this.validationState()}
                hasFeedback
                ref='input'
                groupClassName='group-class'
                labelClassName='label-class'
                onChange={this.handleChange} />
        );
    }
});

export default ExampleInput;