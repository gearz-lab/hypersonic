import React from 'react';

export default React.createClass({

    propTypes: {
        selection: React.PropTypes.object,
        rows: React.PropTypes.array,
        handleSelectionChange: React.PropTypes.func
    },

    getElapsedTime: function (elapsedTime) {
        return (elapsedTime / 1000).toFixed(2) + ' seconds';
    },

    render: function () {

        let {
            count,
            elapsedTime,
            lastCriteria,
            selection,
            loading
        } = this.props;

        return <p>{count} results ({this.getElapsedTime(elapsedTime) }).Search
            criteria: { lastCriteria || 'Empty' }.
            Selected: { Object.keys(selection).length }/{count}.
        </p>;
    }
})