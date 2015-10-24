var React = require('react');

var DefaultLayout = React.createClass({

    render: function() {

        let headHtml;
        let distUrl;
        distUrl = process.env.NODE_ENV == 'production' ? '' : 'http://localhost:8081/';

        headHtml = `<title>Gearz</title>
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <link rel="shortcut icon" href="${distUrl}assets/favicon.ico" type="image/x-icon">
            <link rel="icon" href="${distUrl}assets/favicon.ico" type="image/x-icon">`;

        if(process.env.NODE_ENV == 'production') {
            headHtml += `
            <link href='assets/main.css' rel='stylesheet' />`;
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
                <script src={`${distUrl}assets/bundle.js`} />
            </html>
        );
    }
});

export default DefaultLayout;
