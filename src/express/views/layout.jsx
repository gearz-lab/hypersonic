var React = require('react');

var DefaultLayout = React.createClass({

    render: function() {

        let bundle;
        let headHtml;

        if(process.env.NODE_ENV == 'production') {
            headHtml = `<title>ReactUI - Bootstrap based data components for React</title>
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <link href='assets/main.css' rel='stylesheet' />`;

            bundle = 'assets/bundle.js';
        }
        else {
            headHtml = `<title>ReactUI - Bootstrap based data components for React</title>
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />`;

            bundle = 'http://localhost:8080/assets/bundle.js';
        }

        let head = {
            __html: headHtml
        };

        return (
            <html>
                <head dangerouslySetInnerHTML={head} />
                <body>
                    <div id="#app_container">
                    </div>
                </body>
                <script src={bundle} />
            </html>
        );
    }
});

export default DefaultLayout;