import bootstrap from 'bootstrap/less/bootstrap.less';
import styles from './styles/styles.less';

import React from 'react';
import Router from 'react-router';
import routes from './Routes';

window.React = React;

Router.run(routes, Router.RefreshLocation, Handler => {
    React.render(
        React.createElement(Handler, window.INITIAL_PROPS), document);
});
