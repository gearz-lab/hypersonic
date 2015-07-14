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
                    displayName: 'Valor',
                    help: m => 'The contact name is ' + m.valor,
                    readOnly: m => !m.temValor,
                    addonBeforeGlyphicon: m => m.valor > 1000 ? 'usd' : 'star',
                    addonAfter: '.00',
                    groupClassName: m => m.valor >= 0 ? 'green' : 'red'
                },
                {
                    name: 'taxaDeRetorno',
                    displayName: 'Taxa de retorno',
                    component: 'label',
                    type: 'string',
                    value: (m,h) => 'R$ ' + h.format(m.valor * 0.2, {precision: 2, decimal: ',', thousand: '.'}),
                    readOnly: true,
                    labelClassName: 'blue',
                    groupClassName: m => m.valor >= 0 ? 'green' : 'red'
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