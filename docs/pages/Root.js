import React from 'react';
import Router from 'react-router';

const Root = React.createClass({
    statics: {

        /**
         * Get the doctype the page expects to be rendered with
         *
         * @returns {string}
         */
            getDoctype() {
            return '<!doctype html>';
        },

        renderToString(props) {
            return Root.getDoctype() +
                React.renderToString(<Root {...props} />);
        }
    },

    render() {

        let head = {
            __html: `<title>Gearz - A platform for implementing data-centric business apps. </title>
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />`
        };

        return (
            <html>
                <head dangerouslySetInnerHTML={head}/>
                <body>
                    <Router.RouteHandler />
                    <script src='assets/bundle.js'/>
                </body>
            </html>
        );
    }
});


module.exports = Root;
