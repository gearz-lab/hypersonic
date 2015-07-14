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
                    name: 'temValor',
                    type: 'bool',
                    displayName: 'Tem valor'
                },
                {
                    name: 'valor',
                    type: 'float',
                    component: 'select',
                    options: [
                        { value: 1000, text: 'R$ 1000,000'},
                        { value: 2000, text: 'R$ 2000,000'}
                    ],
                    displayName: 'Valor',
                    help: m => 'The contact name is ' + m.valor,
                    readOnly: m => !m.temValor,
                    addonBeforeGlyphicon: 'usd',
                    addonAfter: '.00'
                },
                {
                    name: 'taxaDeRetorno',
                    displayName: 'Taxa de retorno',
                    component: 'label',
                    type: 'string',
                    value: (m,h) => 'R$ ' + h.format(m.valor * 0.2, {precision: 2, decimal: ',', thousand: '.'}),
                    readOnly: true
                }
            ]
        };

        let layout = {
            fields: [
                {
                    name: 'temValor'
                },
                {
                    name: 'valor'
                },
                {
                    name: 'taxaDeRetorno'
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