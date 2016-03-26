import _ from 'underscore';
import React from 'react';
import {MetaForm, DefaultComponentFactory} from 'react-metaform';
import Alert from 'react-bootstrap/lib/Alert'
import clientApi from '../api/clientApi';
import async from 'async';
import {browserHistory} from 'react-router'

var Edit = React.createClass({

    propTypes: {
        params: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            applicationDomain: undefined,
            model: {}
        }
    },

    componentDidMount: function () {
        let _this = this;
        async.parallel([
            clientApi.applicationDomain.load
        ], function (errors, results) {
            _this.setState({
                applicationDomain: results[0]
            });
        });
    },

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function () {
        if (this.props.params.id) {
            return `Editing ${this.props.params.entity}`;
        }
        return `New ${this.props.params.entity}`;
    },

    /**
     * Handles when the user saves the entity
     * @param model
     */
    handleSave: function (model) {
        let entityName = this.props.params.entity;
        let entityId = this.props.params.id;

        clientApi.currentEntity.save(entityName, model, (error, result) => {

            if (result.status == 'success') {
                if (this.props.onNotification) {
                    this.props.onNotification({
                        message: `${entityName} saved`,
                        level: 'success'
                    });
                }

                if (!result.generatedKey) {
                    throw Error('Saving an entity should return a key on success');
                }

                browserHistory.push(`/e/${entityName}/details/${result.generatedKey}`);
            }
        });
    },

    render: function () {

        console.log(this.props.counter);

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
            layoutName = `${entityName}-edit`;
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
                        schema={applicationDomain}
                        entityName={entityName}
                        layoutName={layoutName}
                        model={{}}
                        onSave={this.handleSave}
                    />
                </div>
            </div>
        );
    }
});

export default Edit;