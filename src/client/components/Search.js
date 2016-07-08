import React from 'react';
import { Alert } from 'react-bootstrap';
import Grid from './search/Grid';
import applicationDomainHelper from '../../common/lib/helpers/applicationDomainHelper';
import clientActionHelper from '../lib/clientActionHelper';
import { redirectToSearch } from '../lib/routingHelper';

var Search = React.createClass({

    propTypes: {
        params: React.PropTypes.object.isRequired
    },

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function () {
        return `Searching ${this.props.params.entity}`;
    },


    handlePageChange: function (page) {
        this.props.modelActions.searchEntities(this.props.params.entity, this.props.model.data.lastCriteria, page, this.props.model.data.selection || {});
    },

    handleSearch: function (criteria) {
        redirectToSearch(this.props.params.entity, criteria);
    },

    handleCriteriaChange: function (criteria) {
        this.props.modelActions.changeSearchCriteria(criteria);
    },

    handleSelectionChange: function (selection) {
        this.props.modelActions.changeSelection(selection);
    },

    handleActionRefresh: function () {
        this.props.modelActions.searchEntities(this.props.params.entity, this.props.model.data.lastCriteria, Number(this.props.model.data.page) || 1, this.props.model.data.selection || {});
    },

    handleAction: function (a, s) {
        clientActionHelper.invoke(a, s, {
            model: this.props.model,
            modal: this.props.modal,
            applicationDomain: this.props.applicationDomain,
            modelActions: this.props.modelActions,
            modalActions: this.props.modalActions,
            notificationActions: this.props.notificationActions,
            entityName: this.props.params.entity
        });
    },

    renderError: function (message) {
        return <Alert bsStyle="danger">
            <h4>Error</h4>
            <p>{message}</p>
        </Alert>;
    },

    render: function () {

        let { entity: entityName } = this.props.params;

        let {
            entity,
            layout
        } = applicationDomainHelper.getEntityAndLayout(this.props.applicationDomain.data, entityName, 'search');

        layout = layout || entity;
        if (!layout)
            return this.renderError(`Could not find entity. Entity name: ${this.props.params.entity}`);

        let actions = clientActionHelper.getEntitySpecificActions(entity, layout);
        let rows = this.props.model.data.rows || [];
        let count = this.props.model.data.count || 0;
        let page = Number(this.props.model.data.page) || 1;
        let pageCount = this.props.model.data.pages || 1;
        let elapsedTime = this.props.model.elapsed || 0;
        let criteria = this.props.model.data.criteria || '';
        let lastCriteria = this.props.model.data.lastCriteria || '';
        let selection = this.props.model.data.selection || {};
        let loading = this.props.model.status == 'LOADING';

        return (
            <div className="document">
                <div className="document-header">{this.getDocumentTitle() }</div>
                <div className="document-body">
                    <Grid
                        entityName={entityName} 
                        layout={layout}
                        actions={actions}
                        page={page}
                        rows={rows}
                        count={count}
                        pageCount={pageCount}
                        elapsedTime={elapsedTime}
                        criteria={criteria}
                        lastCriteria={lastCriteria}
                        selection={selection}
                        handlePaginate={this.handlePageChange}
                        handleSearch={this.handleSearch}
                        handleCriteriaChange={this.handleCriteriaChange}
                        handleSelectionChange={this.handleSelectionChange}
                        handleActionRefresh={this.handleActionRefresh}
                        handleAction={this.handleAction}
                        loading={loading}
                        />
                </div>
            </div>
        );
    }
});

export default Search;