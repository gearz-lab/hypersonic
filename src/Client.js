import React from 'react';
import ReactDom from 'react-dom';
import {browserHistory} from 'react-router'

// styles
import styles from './client/less/styles.less';

import {Router} from 'react-router'
import routes from './Routes.js';

// favicon
import favicon from '../assets/favicon.ico';

if (window) {
    window.React = React;
}

var Globalize = require('globalize')
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize')

globalizeLocalizer(Globalize);

ReactDom.render((
    <Router history={browserHistory}>
        {routes}
    </Router>
), document.getElementById('#app_container'));
