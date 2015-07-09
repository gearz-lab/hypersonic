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
                    displayName: 'Valor da causa',
                    addonBefore: m => {
                        try {
                            if (m.valorDaCausa.length > 7) {
                                return 'strong';
                            } else if (m.valorDaCausa.length > 3) {
                                return 'medium';
                            }
                        }catch(ex) {}
                        return 'weak';
                    },
                    hasFeedback: true,
                    type: 'float',
                },
                {
                    name: 'taxaDeRetorno',
                    displayName: 'Taxa de retorno',
                    value: (m, h) => m.valorDaCausa * 0.2,
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