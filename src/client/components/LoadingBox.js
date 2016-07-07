import React from 'react';
import Loading from 'react-loading';

var LoadingBox = React.createClass({
    render: function () {
        return (
            <div className="loading-box">
                <Loading type='spin' color='#e3e3e3' />
            </div>
        );
    }
});

export default LoadingBox;