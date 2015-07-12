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
                    name: 'enableSomething',
                    displayName: 'Notificar envolvidos',
                    hasFeedback: true,
                    type: 'bool'
                },
                {
                    name: 'valorDaCausa',
                    displayName: 'Valor da causa',
                    hasFeedback: true,
                    invisible: m => !m.enableSomething,
                    invalid: [
                        {condition: m => m.valorDaCausa > 100,
                        message: 'Valor da causa nao deveria ser maior que 100'}
                    ],
                    type: 'string',
                    subType: 'password'
                },
                {
                    name: 'taxaDeRetorno',
                    displayName: 'Taxa de retorno',
                    component: 'label',
                    value: (m, h) => 'R$ ' + h.format(m.valorDaCausa * 0.2, {precision: 2, decimal:',', thousand:'.'}),
                    readOnly: true,
                    type: 'string',
                },
                {
                    name: 'valorCobrado',
                    displayName: 'Valor cobrado',
                    readOnly: false,
                    type: 'float',
                    invalid: [
                        {
                            condition: m => m.valorCobrado < m.valorDaCausa,
                            message: 'O valor cobrado nao pode ser menor do que o valor da causa'
                        }
                    ]
                }
            ]
        };

        let layout = {
            fields: [
                {
                    name: 'enableSomething'
                },
                {
                    name: 'valorDaCausa'
                },
                {
                    name: 'taxaDeRetorno'
                },
                {
                    name: 'valorCobrado'
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