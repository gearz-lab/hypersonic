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
                    name: 'number',
                    type: 'int',
                    displayName: 'Number of something'
                }
            ]
        };

        let layout = {
            fields: [
                { name: 'number' }
            ]
        };

        let model = {
            number: null
        };

        return (
            <div>
                <MetaForm entityType={entityType} layout={layout} model={model} />
            </div>
        );
    }
});

export default Home;