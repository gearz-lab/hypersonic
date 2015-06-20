import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'
import TextBox from '../components/editors/TextBox';

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
        }

        var layout = {
            columnCount: 4,
            rows: [
                'name',
                { columns: [ 'name' ] },
                { columns: [] }
            ]
        }


        return (
            <div>
               fuck 20 <TextBox/>
            </div>
        );
    },

    handleClick(e) {
        this.setState({count: this.state.count + 1});
    }
});

export default Home;