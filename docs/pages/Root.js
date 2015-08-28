import React from 'react';
import Router from 'react-router';

const Root = React.createClass({
    render() {
        return <div className="container-fluid">
                <Router.RouteHandler onNotification={this.handleNotification} />
            </div>;
    }
});


module.exports = Root;
