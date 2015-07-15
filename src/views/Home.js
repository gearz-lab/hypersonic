import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'
import TextBox from '../components/editors/TextBox';
import MetaForm from '../components/MetaForm';
import metadataProvider from '../lib/metadataProvider.js';

var Home = React.createClass({

    render: function() {

        let entityType = {
            fields: [
                {
                    name: 'type',
                    type: 'string',
                    component: 'select2',
                    displayName: 'Type',
                    options: [
                        { value: "1", label: 'Person'},
                        { value: "2", label: 'Company'}
                    ]
                },
                {
                    name: 'name',
                    type: 'string',
                    displayName: 'Name',
                    readOnly: true
                }
            ]
        };

        let layout = {
            fields: [
                {
                    name: 'type'
                },
                {
                    name: 'name'
                }
            ]
        };

        let model = {
            type: ''
        };

        return (
            <div>
                <MetaForm
                    fields={metadataProvider.mergeFields(entityType.fields, layout.fields)}
                    model={model}
                    title='Editing contact'/>
            </div>
        );
    }
});

export default Home;