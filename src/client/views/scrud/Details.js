import _ from 'underscore';
import React from 'react';
import Router from 'react-router';
import Input from '../../../../node_modules/react-bootstrap/lib/Input'
import {MetaForm, DefaultComponentFactory} from 'react-metaform';
import Alert from '../../../../node_modules/react-bootstrap/lib/Alert'

import clientActions from '../../../client/flux/actions/clientActions.js';
import clientStores from '../../../client/flux/stores/clientStores.js';
import clientApi from '../../../client/flux/api/clientApi.js';

var Details = React.createClass({

    getInitialState: function() {
      return {
          applicationDomain: undefined,
          model: {}
      }
    },

    componentDidMount: function() {
        // logged user
        clientStores.applicationDomain.addChangeListener(this.applicationDomainChanged);
        clientActions.applicationDomain.loadApplicationDomain();
        clientApi.currentEntity.load(this.props.params.entity, this.props.params.id, (error, result) => {
            this.setState({
                model: result
            });
        });
    },

    applicationDomainChanged: function() {
        this.setState({
            applicationDomain: clientStores.applicationDomain.getApplicationDomain()
        });
    },

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function() {
        return `Viewing ${this.props.params.entity}`;
    },

    render: function() {

        // if the application domain hasn't been loaded already
        if(!this.state || !this.state.applicationDomain) {
            return (
                <div className="document">
                    <div className="document-header">{this.getDocumentTitle()}</div>
                    <div className="document-body">
                        <div> Loading the application domain... </div>
                    </div>
                </div>
            );
        }

        let entityName = this.props.params.entity;
        let layoutName = this.props.params.layout;
        let applicationDomain = this.state.applicationDomain;

        // try to find the appropriate entity
        let entity = _.find(applicationDomain.entities, e => e.name == entityName);
        if(!entity) {
            return (
                <div className="document">
                    <div className="document-header">{this.getDocumentTitle()}</div>
                    <div className="document-body">
                        <Alert bsStyle='danger'>
                            <h4>Oh snap! Cound not find entity: <b>{entityName}</b> </h4>
                        </Alert>
                    </div>
                </div>
            );
        }

        if(!layoutName) {
            if (entity.defaultLayouts && entity.defaultLayouts.edit) {
                layoutName = entity.defaultLayouts.edit;
            }
            else {
                layoutName = `${entityName}-details`;
            }
        }
        let layout = _.find(entity.layouts, e => e.name == layoutName);
        if(!layout) {
            return (
                <div className="document">
                    <div className="document-header">{this.getDocumentTitle()}</div>
                    <div className="document-body">
                        <Alert bsStyle='danger'>
                            <h4>Oh snap! The entity is fine, but couldn't find the layout: <b>{layoutName}</b> </h4>
                        </Alert>
                    </div>
                </div>
            );
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