import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'
import TextBox from '../../components/editors/TextBox';
import MetaForm from '../../components/MetaForm';
import metadataProvider from '../../lib/metadataProvider.js';

var Home = React.createClass({

    render: function() {

        return (
            <div>
                <div> Editing: {this.props.params.entity}. Id: {this.props.params.id} </div>
            </div>
        );
    }
});

export default Home;