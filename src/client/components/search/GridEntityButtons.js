import React from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';

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

        if (!(actions.length && Object.keys(selection).length))
            return null;

        return <ButtonGroup>
            {
                actions.map(a => {
                    let allowMultiple = a.allowMultiple == undefined || a.allowMultiple == null || a.allowMultiple == true;
                    if (Object.keys(selection).length > 1 && !allowMultiple)
                        return null;
                    let icon = a.icon ? <i className={`fa fa-${a.icon}`}></i> : null;
                    return <Button key={`action-${a.name}`}
                                   onClick={this.handleAction(a)}> {icon} {a.displayName || a.name} </Button>
                })
            }
        </ButtonGroup>;
    }
})