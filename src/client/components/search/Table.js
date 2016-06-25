import React from 'react';
import clone from 'clone';
import {Table, Alert} from 'react-bootstrap';

export default React.createClass({

    propTypes: {
        selection: React.PropTypes.object,
        rows: React.PropTypes.array,
        handleSelectionChange: React.PropTypes.func
    },

    handleCheck: function (e) {

        let {
            selection,
            handleSelectionChange
        } = this.props;

        let id = e.target.getAttributeNode('data-id').value;
        if (!id) {
            throw Error('Every row should have a non-null data-id attribute');
        }
        let checked = e.target.checked;
        let newSelection = clone(selection);
        if (checked) {
            newSelection[id.toString()] = true;
        }
        else {
            delete newSelection[id.toString()];
        }
        handleSelectionChange(newSelection);
    },

    render: function () {

        let {
            rows,
            layout,
            selection
        } = this.props;

        if (!rows.length) {
            return <Alert bsStyle="warning">
                The search returned no results.
            </Alert>
        }

        return <Table bordered condensed>
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
                rows.map((r, i) => {
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
        </Table>;
    }
})