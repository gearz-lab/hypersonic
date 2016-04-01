import React from 'react';
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
        entity: React.PropTypes.string.isRequired,
        applicationDomain: React.PropTypes.object.isRequired,
        rows: React.PropTypes.array.isRequired,
        page: React.PropTypes.number.isRequired,
        handlePaginate: React.PropTypes.func.isRequired,
        handleSearch: React.PropTypes.func.isRequired,
        handleCriteriaChange: React.PropTypes.func.isRequired,
        criteria: React.PropTypes.string,
        lastCriteria: React.PropTypes.string
    },

    componentDidMount: function () {
        //React.findDOMNode(this.refs.input).focus();
    },

    renderError: function (message) {
        return <Alert bsStyle="danger">
            <h4>Error</h4>
            <p>{message}</p>
        </Alert>;
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

    getElapsedTime: function (elapsedTime) {
        return (elapsedTime / 1000).toFixed(2) + ' seconds';
    },

    render: function () {

        let entity = _.find(this.props.applicationDomain.entities, e => {
            return e.name == this.props.entity
        });
        if (!entity)
            return this.renderError(`Could not find entity. Entity name: ${this.props.entity}`);
        let layout;
        if (entity.layouts && entity.layouts.length)
            layout = _.find(entity.layouts, l => l.type == 'search');
        if (!layout)
            layout = entity;

        let pagination = this.props.pageCount > 1 ? <Pagination
            bsSize="medium"
            items={this.props.pageCount}
            activePage={this.props.page}
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
                            <input type="checkbox"/>
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
                                <DropdownButton title={<i className="fa fa-square-o"></i>} id="input-dropdown-addon">
                                    <MenuItem key="1"><i className="fa fa-square-o"></i>Uncheck all</MenuItem>
                                    <MenuItem key="2"><i className="fa fa-check-square-o"></i>Check all</MenuItem>
                                </DropdownButton>
                                <Button><i className="fa fa-refresh"></i>&nbsp;</Button>
                            </ButtonGroup>

                            <ButtonGroup>
                                <Button>5</Button>
                                <Button>6</Button>
                                <Button>7</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
                <p>{this.props.count} results ({this.getElapsedTime(this.props.elapsedTime)}). Search criteria: { this.props.lastCriteria || 'Empty' }.</p>
                {table }
                { pagination }
            </div>
        );
    }
});

export default Grid;