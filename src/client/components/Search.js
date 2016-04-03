import React from 'react';
import {ButtonGroup, Button, Alert} from 'react-bootstrap';
import _ from 'underscore';
import Grid from './Grid';
import LoadingBox from './LoadingBox';
import Loading from 'react-loading';
import applicationDomainHelper from '../../common/lib/helpers/applicationDomainHelper';
var Search = React.createClass({

    propTypes: {
        params: React.PropTypes.object.isRequired
    },

    componentDidMount: function () {
        this.props.searchEntities(this.props.params.entity, '', 1, {});
    },

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function () {
        return `Searching ${this.props.params.entity}`;
    },

    handlePageChange: function (page) {
        this.props.searchEntities(this.props.params.entity, this.props.model.data.lastCriteria, page, this.props.model.data.selection || {});
    },

    handleSearch: function (criteria) {
        this.props.searchEntities(this.props.params.entity, criteria, 1, {});
    },

    handleCriteriaChange: function (criteria) {
        this.props.changeSearchCriteria(criteria);
    },

    handleSelectionChange: function (selection) {
        this.props.changeSelection(selection);
    },

    handleActionRefresh: function () {
        this.props.searchEntities(this.props.params.entity, this.props.model.data.lastCriteria, Number(this.props.model.data.page) || 1, this.props.model.data.selection || {});
    },

    renderError: function (message) {
        return <Alert bsStyle="danger">
            <h4>Error</h4>
            <p>{message}</p>
        </Alert>;
    },

    render: function () {

        let entityAndLayout = applicationDomainHelper.getEntityAndLayout(this.props.applicationDomain.data, this.props.params.entity, 'search');
        let layout = entityAndLayout.layout || entityAndLayout.entity;
        if (!layout)
            return this.renderError(`Could not find entity. Entity name: ${this.props.params.entity}`);

        let rows = this.props.model.data.rows || [];
        let count = this.props.model.data.count || 0;
        let page = Number(this.props.model.data.page) || 1;
        let pageCount = this.props.model.data.pages || 1;
        let elapsedTime = this.props.model.elapsed || 0;
        let criteria = this.props.model.data.criteria || '';
        let lastCriteria = this.props.model.data.lastCriteria || '';
        let selection = this.props.model.data.selection || {};

        return (
            <div className="document">
                <div className="document-header">{this.getDocumentTitle()}</div>
                <div className="document-body">
                    <Grid layout={layout}
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
                    />
                </div>
            </div>
        );
    }
});

export default Search;