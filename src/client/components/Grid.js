import React from 'react';
import clone from 'clone';
import _ from 'underscore';
import {
    Table,
    Alert,
    Pagination,
    Input,
    Button,
    ButtonToolbar,
    ButtonGroup,
    DropdownButton,
    MenuItem,
    Glyphicon
} from 'react-bootstrap';

var Grid = React.createClass({

    propTypes: {
        layout: React.PropTypes.object.isRequired,
        actions: React.PropTypes.object,
        rows: React.PropTypes.array.isRequired,
        page: React.PropTypes.number.isRequired,
        handlePaginate: React.PropTypes.func.isRequired,
        handleSearch: React.PropTypes.func.isRequired,
        handleCriteriaChange: React.PropTypes.func.isRequired,
        handleSelectionChange: React.PropTypes.func.isRequired,
        handleActionRefresh: React.PropTypes.func.isRequired,
        criteria: React.PropTypes.string,
        lastCriteria: React.PropTypes.string,
        selection: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            selection: {}
        }
    },

    componentDidMount: function () {
        //React.findDOMNode(this.refs.input).focus();
    },

    handleSelect(event, selectedEvent) {
        this.props.handlePaginate(selectedEvent.eventKey);
    },

    handleCriteriaChange() {
        this.props.handleCriteriaChange(this.refs.input.getValue());
    },

    handleSearch() {
        this.props.handleSearch(this.refs.input.getValue());
    },

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    },

    handleCheck: function(e) {

        let id = e.target.getAttributeNode('data-id').value;
        if(!id) {
            throw Error('Every row should have a non-null data-id attribute');
        }
        let checked = e.target.checked;
        let newSelection = clone(this.props.selection);
        if(checked) {
            newSelection[id.toString()] = true;
        }
        else {
            delete newSelection[id.toString()];
        }
        this.props.handleSelectionChange(newSelection);
    },

    handleSelectionDropdownChange: function(event, eventKey) {
        let newSelection = clone(this.props.selection);
        switch(eventKey) {
            case 'check-all-this-page':
                _.each(this.props.rows, r => {
                    newSelection[r['id']] = true;
                });
                break;
            case 'uncheck-all-this-page':
                _.each(this.props.rows, r => {
                    delete newSelection[r['id']];
                });
                break;
            case 'uncheck-all':
                newSelection = {};
                break;
        }
        this.props.handleSelectionChange(newSelection);
    },

    getElapsedTime: function (elapsedTime) {
        return (elapsedTime / 1000).toFixed(2) + ' seconds';
    },

    /**
     * Returns whether all the items in this page are selected
     */
    areAllInThisPageSelected: function() {
        let allInPage = this.props.rows.map(r => r.id);
        for(let i = 0; i < allInPage.length; i++) {
            if(!_.has(this.props.selection, allInPage[i]))
                return false;
        }
        return true;
    },

    handleActionRefresh: function() {
        this.props.handleActionRefresh();
    },

    render: function () {
        
        let pageCount = this.props.pageCount;
        let layout = this.props.layout;
        let page = this.props.page;

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
            onSelect={this.handleSelect}/> : null;

        let table = this.props.rows.length ? <Table bordered condensed>
            <colgroup>
                <col span="1" style={{width: 30}}/>
            </colgroup>
            <thead>
            <tr>
                <th></th>
                {
                    layout.fields.map((f, i) => {
                        return <th key={`th-${i}`}>{f.displayName ? f.displayName : f.name}</th>
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                this.props.rows.map((r, i) => {
                    return <tr key={`tr-${i}`}>
                        <td className="check-column">
                            <input type="checkbox" onChange={this.handleCheck} data-id={r['id']} checked={Boolean(this.props.selection[r['id']])} />
                        </td>
                        {
                            layout.fields.map((f, j) => {
                                return <td key={`td-${i}${j}`}>
                                    {r[f.name]}
                                </td>
                            })
                        }
                    </tr>
                })
            }
            </tbody>
        </Table> : <Alert bsStyle="warning">
            The search returned no results.
        </Alert>;

        return (
            <div>
                <div>
                    <div className="search-input-wrapper">
                        <Input
                            autoFocus
                            type="text"
                            value={this.props.criteria}
                            onChange={this.handleCriteriaChange}
                            onKeyPress={this.handleKeyPress}
                            placeholder="Search"
                            ref="input"
                            buttonAfter={<Button className="search-button" onClick={this.handleSearch}><Glyphicon glyph="search" />Search</Button>}/>
                    </div>
                    <div className="search-actions-wrapper">
                        <ButtonToolbar>
                            <ButtonGroup>
                                <DropdownButton title={<i className={ this.areAllInThisPageSelected() ? "fa fa-check-square-o" : "fa fa-square-o" }></i>} id="input-dropdown-addon">
                                    <MenuItem eventKey="check-all-this-page" onSelect={this.handleSelectionDropdownChange}>
                                        <i className="fa fa-check-square-o"></i>Check all on this page
                                    </MenuItem>
                                    <MenuItem eventKey="uncheck-all-this-page" onSelect={this.handleSelectionDropdownChange}>
                                        <i className="fa fa-square-o"></i>Uncheck all on this page
                                    </MenuItem>
                                    <MenuItem eventKey="uncheck-all" onSelect={this.handleSelectionDropdownChange}>
                                        <i className="fa fa-square-o"></i>Uncheck all
                                    </MenuItem>
                                </DropdownButton>
                                <Button onClick={this.handleActionRefresh}><i className="fa fa-refresh"></i>&nbsp;</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
                <p>{this.props.count} results ({this.getElapsedTime(this.props.elapsedTime)}). Search criteria: { this.props.lastCriteria || 'Empty' }. Selected: { Object.keys(this.props.selection).length }/{this.props.count}.</p>
                {table }
                { pagination }
            </div>
        );
    }
});

export default Grid;