import React from 'react';
import clone from 'clone';
import {ButtonGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import _ from 'underscore';


export default React.createClass({

    propTypes: {
        selection: React.PropTypes.object,
        rows: React.PropTypes.array,
        handleSelectionChange: React.PropTypes.func,
        handleActionRefresh: React.PropTypes.func.isRequired
    },

    handleActionRefresh: function () {
        let {handleActionRefresh} = this.props;
        handleActionRefresh();
    },

    handleSelectionDropdownChange: function (eventKey, event) {
        let {
            selection,
            rows,
            handleSelectionChange
        } = this.props;

        let newSelection = clone(selection);
        switch (eventKey) {
            case 'check-all-this-page':
                _.each(rows, r => {
                    newSelection[r['id']] = true;
                });
                break;
            case 'uncheck-all-this-page':
                _.each(rows, r => {
                    delete newSelection[r['id']];
                });
                break;
            case 'uncheck-all':
                newSelection = {};
                break;
        }
        handleSelectionChange(newSelection);
    },

    /**
     * Returns whether all the items in this page are selected
     */
    areAllInThisPageSelected: function () {

        let {
            selection,
            rows,
        } = this.props;

        let allInPage = rows.map(r => r.id);
        for (let i = 0; i < allInPage.length; i++) {
            if (!_.has(selection, allInPage[i]))
                return false;
        }
        return true;
    },

    render: function () {
        return <ButtonGroup className="button-bar">
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
    }
})