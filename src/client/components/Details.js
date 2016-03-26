import _ from 'underscore';
import React from 'react';
import {MetaForm, DefaultComponentFactory} from 'react-metaform';
import Alert from 'react-bootstrap/lib/Alert'

import clientActions from '../flux/actions/clientActions.js';
import clientStores from '../flux/stores/clientStores.js';
import clientApi from '../api/clientApi.js';

var Details = React.createClass({

    getInitialState: function () {
        return {
            applicationDomain: undefined,
            model: {}
        }
    },

    componentDidMount: function () {
        // logged user
        clientStores.applicationDomain.addChangeListener(this.applicationDomainChanged);
        clientActions.applicationDomain.loadApplicationDomain();
        clientApi.currentEntity.load(this.props.params.entity, this.props.params.id, (error, result) => {
            this.setState({
                model: result
            });
        });
    },

    applicationDomainChanged: function () {
        this.setState({
            applicationDomain: clientStores.applicationDomain.getApplicationDomain()
        });
    },

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function () {
        return `Viewing ${this.props.params.entity}`;
    },

    render: function () {

        // if the application domain hasn't been loaded already
        if (!this.state || !this.state.applicationDomain) {
            return (
                <div className="document">
                    <div className="document-header">{this.getDocumentTitle()}</div>
                    <div className="document-body">
                        <div> Loading the application domain...</div>
                    </div>
                </div>
            );
        }

        let entityName = this.props.params.entity;
        let layoutName = this.props.params.layout;
        let applicationDomain = this.state.applicationDomain;

        // try to find the appropriate entity
        let entity = _.find(applicationDomain.entities, e => e.name == entityName);
        if (!entity) {
            return (
                <div className="document">
                    <div className="document-header">{this.getDocumentTitle()}</div>
                    <div className="document-body">
                        <Alert bsStyle='danger'>
                            <h4>Oh snap! Cound not find entity: <b>{entityName}</b></h4>
                        </Alert>
                    </div>
                </div>
            );
        }

        if (!layoutName) {
            layoutName = `${entityName}-details`;
        }
        let layout = _.find(entity.layouts, e => e.name == layoutName);
        if (!layout) {
            layoutName = null;
        }

        // if the application domain has loaded successfully
        return (
            <div className="document">
                <div className="document-header">{this.getDocumentTitle()}</div>
                <div className="document-body">
                    <MetaForm
                        componentFactory={DefaultComponentFactory}
                        showBottomBar={false}
                        schema={applicationDomain}
                        entityName={entityName}
                        layoutName={layoutName}
                        model={this.state.model}/>
                </div>
            </div>
        );
    }
});

export default Details;