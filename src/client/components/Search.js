import React from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import Grid from './Grid';
import LoadingBox from './LoadingBox';
import Loading from 'react-loading';
var Search = React.createClass({

    propTypes: {
        params: React.PropTypes.object.isRequired
    },

    componentDidMount: function () {
        this.props.searchEntities(this.props.params.entity, '', 1);
    },

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function () {
        return `Searching ${this.props.params.entity}`;
    },

    handlePageChange: function (page) {
        this.props.searchEntities(this.props.params.entity, this.props.model.data.lastCriteria, page);
    },

    handleSearch: function (criteria) {
        this.props.searchEntities(this.props.params.entity, criteria, 1);
    },

    handleCriteriaChange: function (criteria) {
        this.props.changeSearchCriteria(criteria);
    },

    handleSelectionChange: function (selection) {
        this.props.changeSelection(selection);
    },

    render: function () {

        let entityName = this.props.params.entity;
        let applicationDomain = this.props.applicationDomain.data;
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
                    <Grid entity={entityName}
                          applicationDomain={applicationDomain}
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
                    />
                </div>
            </div>
        );
    }
});

export default Search;