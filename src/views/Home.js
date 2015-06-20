import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'
import TextBox from '../components/editors/TextBox';
import DynamicForm from '../components/MetaForm';

var Home = React.createClass({
    getInitialState: function() {
        return {
            count: 0
        };
    },

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {

        var entityType = {
            name: {
                type: 'string',
                placeholder: ''
            }
        };

        var layout = {
            rows: [
                'name'
            ]
        };


        return (
            <div>
                <DynamicForm entityType={entityType} layout={layout}/>
            </div>
        );
    },

    handleClick(e) {
        this.setState({count: this.state.count + 1});
    }
});

export default Home;