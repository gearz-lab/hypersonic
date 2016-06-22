import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router'
import configureStore from './client/store/configureStore';
import './client/less/styles.less';
import { Provider } from 'react-redux';
import {Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from './Routes.js';
import '../assets/favicon.ico';
import applicationDomainLoaded from './client/actions/applicationDomain';

var Globalize = require('globalize');
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize');

export default function setupClient(appConfig) {

    globalizeLocalizer(Globalize);

    const store = configureStore();
    const history = syncHistoryWithStore(browserHistory, store);

    // loads the application domain into the store
    store.dispatch(applicationDomainLoaded({ entities: appConfig.entities }));

    render(
        <Provider store={store}>
            <Router history={history} routes={routes}/>
        </Provider>,
        document.getElementById('#app_container')
    );    
}




