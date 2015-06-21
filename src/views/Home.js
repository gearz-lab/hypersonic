import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'
import TextBox from '../components/editors/TextBox';
import MetaForm from '../components/MetaForm';

var Home = React.createClass({

    render: function() {

        let entityType = {
            fields: [
                {
                    name: 'name',
                    type: 'string',
                    displayName: 'Name',
                    placeholder: 'Name',
                    help: 'Here you should put the name',
                    invalid: [{
                        expression: value => value.length > 3,
                        message: 'The name should not have more than 3 characters'
                    }]
                },
                {
                    name: 'description',
                    type: 'string',
                    displayName: 'Description',
                    placeholder: 'Description',
                    help: 'Here you should put the description'
                }
            ]
        };
        let layout = {
            fields: [
                'name',
                'description'
            ]
        };

        return (
            <div>
                <MetaForm entityType={entityType} layout={layout} />
            </div>
        );
    }
});

export default Home;