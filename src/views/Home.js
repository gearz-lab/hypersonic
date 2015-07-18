import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'
import TextBox from '../components/editors/TextBox';
import MetaForm from '../components/MetaForm';
import metadataProvider from '../lib/metadataProvider.js';

var Home = React.createClass({

    render: function() {

        let schema = {
            entities: [
                {
                    name: 'contact',
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
                }
            ],
            layouts: [
                {
                    name: 'contact-edit',
                    fields: [
                        {
                            name: 'name'
                        },
                        {
                            name: 'date'
                        }
                    ]
                }
            ]
        };

        let model = {
            type: ''
        };

        return (
            <div>
                <MetaForm
                    fields={metadataProvider.getFields(schema, 'contact', 'contact-edit')}
                    model={model}
                    title='Editing contact'/>
            </div>
        );
    }
});

export default Home;