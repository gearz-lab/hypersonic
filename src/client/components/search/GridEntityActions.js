import React from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import _ from 'underscore';

export default React.createClass({

    propTypes: {
        selection: React.PropTypes.object,
        rows: React.PropTypes.array,
        handleSelectionChange: React.PropTypes.func,
        handleActionRefresh: React.PropTypes.func.isRequired
    },

    handleAction: function (a) {
        let {handleAction} = this.props;
        return () => handleAction(a, this.props.selection);
    },

    render: function () {

        let {
            actions,
            selection,
        } = this.props;

        let generalActions = [];
        let entitySpecificActions = [];

        _.each(actions, action => {
            if (action.entitySpecific == undefined || action.entitySpecific == true)
                entitySpecificActions.push(action);
            else
                generalActions.push(action);
        });

        let generalActionsButtons = null;
        if (generalActions.length) {
            generalActionsButtons = <ButtonGroup className="button-bar">
                {
                    generalActions.map(a => {
                        let icon = a.icon ? <i className={`fa fa-${a.icon}`}></i> : null;
                        return <Button key={`action-${a.name}`}
                                       onClick={this.handleAction(a)}> {icon} {a.displayName || a.name} </Button>
                    })
                }
            </ButtonGroup>;
        }

        let entitySpecificActionsButtons = null;
        if (entitySpecificActions.length && Object.keys(selection).length) {
            entitySpecificActionsButtons = <ButtonGroup className="button-bar">
                {
                    entitySpecificActions.map(a => {
                        let allowMultiple = a.allowMultiple == undefined || a.allowMultiple == null || a.allowMultiple == true;
                        if (Object.keys(selection).length > 1 && !allowMultiple)
                            return null;
                        let icon = a.icon ? <i className={`fa fa-${a.icon}`}></i> : null;
                        return <Button key={`action-${a.name}`}
                                       onClick={this.handleAction(a)}> {icon} {a.displayName || a.name} </Button>
                    })
                }
            </ButtonGroup>
        }

        return <span>
            { generalActionsButtons }
            { entitySpecificActionsButtons }
            </span>;
    }
})