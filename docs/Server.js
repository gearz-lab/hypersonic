import React from 'react';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack/webpack.config.docs.js';
import Router from 'react-router';
import routes from './Routes';

const development = process.env.NODE_ENV !== 'production';
let app = express();

if (development) {

    let publicPath = webpackConfig.output.publicPath;

    webpackConfig.output.path = '/';
    webpackConfig.output.publicPath = undefined;

    app = app
        .use(webpackMiddleware(webpack(webpackConfig), {
            noInfo: false,
            publicPath: publicPath,
            stats: {
                colors: true
            }
        }))
        .use(function renderApp(req, res) {
            Router.run(routes, req.url, Handler => {
                let routeHtml = React.renderToString(<Handler />);
                if(routeHtml.indexOf('<noscript') === 0) {
                    routeHtml = '';
                }
                let wrap = `<html>
<head>
    <title>Gearz - A platform for implementing data-centric business apps. </title>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
</head>
<body>
    <div>
        <div id="#app_container">${routeHtml}</div>
    </div>
    <script src='assets/bundle.js'></script>
</body>
</html>`;



                res.send(wrap);
            });
        });
} else {
    app = app
        .use(express.static(path.join(__dirname, '../docs-built')));
}

app
    .listen(4000, function () {
        console.log('Server started at http://localhost:4000');
    });
