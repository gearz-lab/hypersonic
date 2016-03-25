import React from 'react';
import ReactDom from 'react-dom';

// styles
import styles from './client/less/styles.less';

import { Router } from 'react-router'
import routes from './Routes.js';

// favicon
import favicon from '../assets/favicon.ico';

if(window) {
    window.React = React;
}

var Globalize = require('globalize')
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize')

globalizeLocalizer(Globalize);

const createBrowserHistory = require('history/lib/createBrowserHistory');
ReactDom.render ((
    <Router history={createBrowserHistory()}>
        {routes}
    </Router>
),  document.getElementById('#app_container'));
