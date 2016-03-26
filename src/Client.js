import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router'
import configureStore from './client/store/configureStore';
import styles from './client/less/styles.less';
import { Provider } from 'react-redux';
import {Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from './Routes.js';
import favicon from '../assets/favicon.ico';

if (window) {
    window.React = React;
}

var Globalize = require('globalize')
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize')

globalizeLocalizer(Globalize);

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('#app_container')
);


