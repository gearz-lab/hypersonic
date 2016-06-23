import React from 'react';
import clone from 'clone';
import _ from 'underscore';
import {
    Table,
    Alert,
    Pagination,
    FormGroup,
    FormControl,
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
        selection: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            selection: {}
        }
    },
    
    handleSelect(event, selectedEvent) {
        this.props.handlePaginate(selectedEvent.eventKey);
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

    handleCheck: function (e) {

        let id = e.target.getAttributeNode('data-id').value;
        if (!id) {
            throw Error('Every row should have a non-null data-id attribute');
        }
        let checked = e.target.checked;
        let newSelection = clone(this.props.selection);
        if (checked) {
            newSelection[id.toString()] = true;
        }
        else {
            delete newSelection[id.toString()];
        }
        this.props.handleSelectionChange(newSelection);
    },

    handleSelectionDropdownChange: function (event, eventKey) {
        let newSelection = clone(this.props.selection);
        switch (eventKey) {
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
    areAllInThisPageSelected: function () {
        let allInPage = this.props.rows.map(r => r.id);
        for (let i = 0; i < allInPage.length; i++) {
            if (!_.has(this.props.selection, allInPage[i]))
                return false;
        }
        return true;
    },

    handleActionRefresh: function () {
        this.props.handleActionRefresh();
    },

    handleAction: function (a) {
        return () => this.props.handleAction(a, this.props.selection);
    },

    render: function () {

        let pageCount = this.props.pageCount;
        let layout = this.props.layout;
        let page = this.props.page;
        let actions = this.props.actions;
        let selection = this.props.selection;

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
                            <input type="checkbox" onChange={this.handleCheck} data-id={r['id']}
                                   checked={Boolean(selection[r['id']])}/>
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

        let actionButtons = actions.length && Object.keys(selection).length ?
            <ButtonGroup>
                {
                    actions.map(a => {
                        let allowMultiple = a.allowMultiple == undefined || a.allowMultiple == null || a.allowMultiple == true;
                        if (Object.keys(this.props.selection).length > 1 && !allowMultiple)
                            return null;
                        let icon = a.icon ? <i className={`fa fa-${a.icon}`}></i> : null;
                        return <Button key={`action-${a.name}`}
                                       onClick={this.handleAction(a)}> {icon} {a.displayName || a.name} </Button>
                    })
                }
            </ButtonGroup> : null;

        let formGroupProps = {
            autoFocus: true,
            type: "text",
            value: this.props.criteria,
            onChange: this.handleCriteriaChange,
            onKeyPress: this.handleKeyPress,
            placeholder: "Search",
            buttonAfter: <Button className="search-button" onClick={this.handleSearch}><Glyphicon glyph="search"/>Search</Button>
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
                            <ButtonGroup>
                                <DropdownButton
                                    title={<i className={ this.areAllInThisPageSelected() ? "fa fa-check-square-o" : "fa fa-square-o" }></i>}
                                    id="input-dropdown-addon">
                                    <MenuItem eventKey="check-all-this-page"
                                              onSelect={this.handleSelectionDropdownChange}>
                                        <i className="fa fa-check-square-o"></i>Check all on this page
                                    </MenuItem>
                                    <MenuItem eventKey="uncheck-all-this-page"
                                              onSelect={this.handleSelectionDropdownChange}>
                                        <i className="fa fa-square-o"></i>Uncheck all on this page
                                    </MenuItem>
                                    <MenuItem eventKey="uncheck-all" onSelect={this.handleSelectionDropdownChange}>
                                        <i className="fa fa-square-o"></i>Uncheck all
                                    </MenuItem>
                                </DropdownButton>
                                <Button onClick={this.handleActionRefresh}><i
                                    className="fa fa-refresh"></i>&nbsp;</Button>
                            </ButtonGroup>
                            {actionButtons}
                        </ButtonToolbar>
                    </div>
                </div>
                <p>{this.props.count} results ({this.getElapsedTime(this.props.elapsedTime)}). Search
                    criteria: { this.props.lastCriteria || 'Empty' }.
                    Selected: { Object.keys(selection).length }/{this.props.count}.</p>
                {table }
                { pagination }
            </div>
        );
    }
});

export default Grid;