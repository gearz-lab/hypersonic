var React = require('react');

var DefaultLayout = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>
                        express-react-views
                    </title>
                </head>
                <body>
                    It's working
                </body>
            </html>
        );
    }
});

module.exports = DefaultLayout;