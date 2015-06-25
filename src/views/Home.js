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
                        expression: m => m.name.length > 3,
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
                    invisible: [{
                        expression: m => m.name == 'Andre',
                        value: true
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