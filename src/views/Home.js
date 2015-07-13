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
                    name: 'tipo',
                    type: 'int',
                    displayName: 'Tipo',
                    component: 'select',
                    options: [
                        { value: 1, text: 'Cliente'},
                        { value: 2, text: 'Honorario'}
                    ],
                    addonBefore: 'Fuck',
                    help: 'fuck',
                    hasFeedback: true,
                    invalid: [
                        { condition: m => true, message: 'fuck this shit' }
                    ]
                }
            ]
        };

        let layout = {
            fields: [
                {
                    name: 'tipo'
                }
            ]
        };

        let model = {
            password: ''
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