import React from 'react';
import Router from 'react-router';
import routes from './Routes.js';

// TODO: Move this to Webpack
// For React devtools
window.React = React;

Router.run(routes, Router.RefreshLocation, Handler => {
    React.render(
        React.createElement(Handler), document);
});