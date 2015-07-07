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
                    name: 'valorDaCausa',
                    type: 'float',
                },
                {
                    name: 'taxaDeRetorno',
                    value: [
                        {
                            expression: (m, h) => m.valorDaCausa * 2
                        }
                    ],
                    type: 'string',
                }
            ]
        };

        let layout = {
            fields: [
                {
                    name: 'valorDaCausa'
                },
                { name: 'taxaDeRetorno'}
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