import React from 'react';

import Root from './pages/Root';
import HomePage from './pages/HomePage.js';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
    <Route name='app' path='/' handler={Root}>
        <Route name='home' path='home.html' handler={HomePage}/>
        <DefaultRoute handler={HomePage}/>
    </Route>
)
