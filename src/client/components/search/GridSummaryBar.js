import React from 'react';
import { getNumberLocalizer } from '../../../common/lib/localization/numberLocalizer';

export default React.createClass({

    propTypes: {
        selection: React.PropTypes.object,
        rows: React.PropTypes.array,
        handleSelectionChange: React.PropTypes.func
    },

    render: function () {

        let numberLocalizer = getNumberLocalizer();

        let {
            count,
            elapsedTime,
            lastCriteria,
            selection,
            loading
        } = this.props;

        let formattedCount = numberLocalizer.format(count);
        let formattedElapsedTime = numberLocalizer.format(elapsedTime / 1000, '0.00') + ' seconds';
        let searchCriteria = lastCriteria || 'Empty';
        let selected = `${Object.keys(selection).length}/${formattedCount}`;

        return <p>{formattedCount} results ({formattedElapsedTime}). Search criteria: {searchCriteria}. Selected: {selected}. </p>;
    }
});