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
                    addonBefore:  [
                        {
                            expression: m => {
                                if(m.password.length > 5)

                                    return 'strong';
                                return 'weak';
                            }
                        }
                    ],
                    placeholder: 'Type in a secure password'
                },
                {
                    name: 'confirmPassword',
                    type: 'string',
                    displayName: 'Confirm password',
                    placeholder: 'This must be equal to the password',
                    invalid: [
                        {
                            expression: m => m.password != m.confirmPassword
                        }
                    ],
                    readOnly: [
                        {
                            expressionText: 'password == "bolinha2"'
                        }
                    ],
                    help: [
                        {
                            expressionText: '"voce digitou " + password'
                        }
                    ]
                }
            ]
        };

        let layout = {
            fields: [
                {
                    name: 'password'
                },
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