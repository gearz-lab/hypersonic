import _ from 'underscore';
import React from 'react';
import Router from 'react-router';
import Input from 'react-bootstrap/lib/Input'
import TextBox from '../../components/editors/TextBox';
import MetaForm from '../../components/MetaForm';
import metadataProvider from '../../lib/metadataProvider.js';
import Alert from 'react-bootstrap/lib/Alert'

import clientActions from '../../flux/actions/clientActions.js';
import clientStores from '../../flux/stores/clientStores.js';


var Home = React.createClass({

    componentDidMount: function() {
        // logged user
        clientStores.applicationDomain.addChangeListener(this.applicationDomainChanged);
        clientActions.applicationDomain.loadApplicationDomain();
    },

    applicationDomainChanged: function() {
        this.setState({
            applicationDomain: clientStores.applicationDomain.getApplicationDomain()
        });
    },

    render: function() {

        // if the application domain hasn't been loaded already
        if(!this.state || !this.state.applicationDomain) {
            return (
                <div className="document">
                    <div className="document-header">Editing {this.props.params.entity}</div>
                    <div className="document-body">
                        <div> Editing: {this.props.params.entity}. Id: {this.props.params.id} </div>
                    </div>
                </div>
            );
        }

        let entityName = this.props.params.entity;
        let applicationDomain = this.state.applicationDomain;

        // try to find the appropriate entity
        let entity = _.find(applicationDomain.entities, e => e.name == entityName);
        if(!entity) {
            return (
                <div className="document">
                    <div className="document-header">Editing... Oh wait. Editing what?</div>
                    <div className="document-body">
                        <Alert bsStyle='danger'>
                            <h4>Oh snap! Cound not find entity: <b>{entityName}</b> </h4>
                        </Alert>
                    </div>
                </div>
            );
        }

        // if the application domain has loaded successfully
        return (
            <div className="document">
                <div className="document-header">Editing {this.props.params.entity}</div>
                <div className="document-body">
                    <MetaForm
                        schema={schema}
                        entityName='contact'
                        layoutName='contact-edit'
                        model={model}
                        title='Editing contact'/>
                </div>
            </div>
        );
    }
});

export default Home;