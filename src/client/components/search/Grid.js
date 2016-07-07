import React from 'react';
import GridSelectionActions from './GridSelectionActions';
import GridEntityActions from './GridEntityActions';
import Table from './Table';
import GridSummaryBar from './GridSummaryBar';
import {
    Pagination,
    FormGroup,
    FormControl,
    Button,
    ButtonToolbar,
    Glyphicon
} from 'react-bootstrap';

var Grid = React.createClass({

    propTypes: {
        layout: React.PropTypes.object.isRequired,
        actions: React.PropTypes.array,
        rows: React.PropTypes.array.isRequired,
        page: React.PropTypes.number.isRequired,
        handlePaginate: React.PropTypes.func.isRequired,
        handleSearch: React.PropTypes.func.isRequired,
        handleCriteriaChange: React.PropTypes.func.isRequired,
        handleSelectionChange: React.PropTypes.func.isRequired,
        handleActionRefresh: React.PropTypes.func.isRequired,
        handleAction: React.PropTypes.func.isRequired,
        criteria: React.PropTypes.string,
        lastCriteria: React.PropTypes.string,
        selection: React.PropTypes.object,
        loading: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            selection: {}
        }
    },

    handlePaginate(page) {
        this.props.handlePaginate(page);
    },

    handleCriteriaChange(event) {
        this.props.handleCriteriaChange(event.target.value);
    },

    handleSearch(value) {
        this.props.handleSearch(value);
    },

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSearch(event.target.value);
        }
    },

    render: function () {

        let {
            pageCount,
            layout,
            page,
            actions,
            selection,
            rows,
            count,
            handleSelectionChange,
            handleActionRefresh,
            elapsedTime,
            lastCriteria,
            handleAction,
            loading
        } = this.props;

        let pagination = pageCount > 1 ? <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            bsSize="medium"
            items={pageCount}
            activePage={page}
            maxButtons={5}
            onSelect={this.handlePaginate}/> : null;

        let formGroupProps = {
            autoFocus: true,
            type: "text",
            value: this.props.criteria,
            onChange: this.handleCriteriaChange,
            onKeyPress: this.handleKeyPress,
            placeholder: "Search",
            buttonAfter: <Button className="search-button" onClick={this.handleSearch}><Glyphicon glyph="search"/>Search</Button>
        };

        let gridSelectionActionsProps = {
            selection,
            rows,
            handleSelectionChange,
            handleActionRefresh
        };

        let gridEntityActionsProps = {
            handleAction,
            actions,
            selection
        };

        let tableProps = {
            layout,
            selection,
            rows,
            handleSelectionChange,
            loading
        };

        let gridSummaryBarProps = {
            count,
            elapsedTime,
            lastCriteria,
            selection,
            loading
        };

        return (
            <div>
                <div>
                    <div className="search-input-wrapper">
                        <FormGroup>
                            <FormControl {...formGroupProps} />
                        </FormGroup>
                    </div>
                    <div className="search-actions-wrapper">
                        <ButtonToolbar>
                            <GridSelectionActions {...gridSelectionActionsProps} />
                            <GridEntityActions {...gridEntityActionsProps}/>
                        </ButtonToolbar>
                    </div>
                </div>
                <GridSummaryBar {...gridSummaryBarProps}/>
                <Table {...tableProps} />
                { pagination }
            </div>
        );
    }
});

export default Grid;