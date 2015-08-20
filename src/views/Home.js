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
                            displayName: 'Name',
                            addonBefore: 'Something 2'
                        },
                        {
                            name: 'date',
                            type: 'date',
                            displayName: 'Date'
                        }
                    ]
                },
                {
                    name: 'phone',
                    fields: [
                        {
                            name: 'number',
                            type: 'string'
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
                },
                {
                    name: 'phone-edit',
                    fields: [
                        {
                            name: 'number'
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
                <div>This is something very cool: {this.props.params.id} </div>
                <MetaForm
                    schema={schema}
                    entityName='contact'
                    layoutName='contact-edit'
                    model={model}
                    title='Editing contact'/>
            </div>
        );
    }
});

export default Home;