import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'
import {MetaForm, DefaultComponentFactory} from 'react-metaform';

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
            ]
        };

        let model = {
            type: ''
        };

        return (
            <div>
                <MetaForm
                    componentFactory={DefaultComponentFactory}
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