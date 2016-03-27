import _ from 'underscore';
import React from 'react';
import {MetaForm, DefaultComponentFactory} from 'react-metaform';
import Alert from 'react-bootstrap/lib/Alert';

var Edit = React.createClass({

    propTypes: {
        params: React.PropTypes.object.isRequired
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
        this.props.saveEntity(entityName, model);
    },

    render: function () {

        // if the application domain hasn't been loaded already
        if (!this.props.applicationDomain.data) {
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
        let applicationDomain = this.props.applicationDomain.data;

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