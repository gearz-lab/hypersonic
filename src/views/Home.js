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
                    name: 'password',
                    type: 'string',
                    displayName: 'Password',
                    placeholder: 'Type in a secure password'
                }, {
                    name: 'confirmPassword',
                    type: 'string',
                    displayName: 'Confirm password',
                    placeholder: 'Confirm password',
                    readOnly: [
                        { expressionText: 'password.length > 3' }
                    ],
                    help: [
                        {
                            expression: m => 'this value must be equal to ' + m.password
                        }
                    ],
                    addonBefore: [
                        {
                            expression: m => 'this value must be equal to ' + m.password
                        }
                    ],
                    value: 'fuccccck',
                    addonAfter: 'something not that cool'
                }
            ]
        };

        let layout = {
            fields: [
                { name: 'password' },
                { name: 'confirmPassword'}
            ]
        };

        let model = {
            password: ''
        };

        return (
            <div>
                <MetaForm entityType={entityType} layout={layout} model={model} />
            </div>
        );
    }
});

export default Home;