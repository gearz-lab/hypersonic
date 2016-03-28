import React from 'react';
import _ from 'underscore';
import {Table, Alert} from 'react-bootstrap';

var Grid = React.createClass({

    propTypes: {
        entity: React.PropTypes.string.isRequired,
        applicationDomain: React.PropTypes.object.isRequired,
        rows: React.PropTypes.object.isRequired
    },

    renderError: function (message) {
        return <Alert bsStyle="danger">
            <h4>Error</h4>
            <p>{message}</p>
        </Alert>;
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

        return (
            <Table bordered condensed>
                <thead>
                <tr>
                    {
                        layout.fields.map(f => {
                            return <th>{f.displayName ? f.displayName : f.name}</th>
                        })
                    }
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.rows.map(r => {
                            layout.fields.map(f => {
                                return <th>
                                    {r[f.name]}
                                </th>
                            })
                        })   
                    }
                </tbody>
            </Table>
        );
    }
});

export default Grid;