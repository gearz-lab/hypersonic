import React from 'react';
import Router from 'react-router';

var DefaultLayout = React.createClass({
    render: function() {

        // Dump out our current props to a global object via a script tag so
        // when initialising the browser environment we can bootstrap from the
        // same props as what each page was rendered with.
        let browserInitScriptObj = {
            __html: `window.INITIAL_PROPS = ${JSON.stringify(this.props)};`
                };

        let head = {
            __html: `<title>ReactUI - Bootstrap based data components for React</title>
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <link href='assets/bundle.css' rel='stylesheet' />`
            };

        return (
            <html>
            <head dangerouslySetInnerHTML={head} />
            <body>
                <p>Welcome to Gearz</p>
                <Router.RouteHandler />
            </body>
            <script dangerouslySetInnerHTML={browserInitScriptObj} />
            <script src='assets/bundle.js' />
            </html>
        );
    }
});

module.exports = DefaultLayout;