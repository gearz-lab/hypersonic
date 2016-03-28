import _ from 'underscore';
import React from 'react';
import {MetaForm, DefaultComponentFactory} from 'react-metaform';
import Alert from 'react-bootstrap/lib/Alert'

var Details = React.createClass({

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function () {
        return `Viewing ${this.props.params.entity}`;
    },

    componentDidMount: function() {
        this.props.loadEntity(this.props.params.entity, this.props.params.id);
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
                        model={this.props.model.data}/>
                </div>
            </div>
        );
    }
});

export default Details;