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
                    placeholder: 'You should put something funny here',
                    help: 'Here you should put the name',
                    invalid: [{
                        expression: 'name.length > 5',
                        value: true,
                        message: 'The name should not have more than 3 characters'
                    }]
                },
                {
                    name: 'description',
                    type: 'string',
                    displayName: 'Description',
                    placeholder: 'Description',
                    help: 'Here you should put the description',
                    readOnly: [{
                        expression: 'name == "Andre2"',
                        value: true
                    }],
                    addonBefore: [{
                        expression: 'name == "Andre"',
                        value: 'something weird'
                    }]
                }
            ]
        };

        let layout = {
            fields: [
                { name: 'name' },
                { name: 'description' }
            ]
        };

        let model = {
            name: 'Andre 2',
            description: 'The best'
        };

        return (
            <div>
                <MetaForm entityType={entityType} layout={layout} model={model} />
            </div>
        );
    }
});

export default Home;