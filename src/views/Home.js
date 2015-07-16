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
                    name: 'name',
                    type: 'string',
                    displayName: 'Name'
                },
                {
                    name: 'date',
                    type: 'date',
                    displayName: 'Date'
                }
            ]
        };

        let layout = {
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'date'
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