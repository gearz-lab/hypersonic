import React from 'react';

import Root from './pages/Root';
import HomePage from './pages/HomePage.js';
import ClientLoader from './pages/ClientLoader.js';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
    <Route name='app' path='/' handler={Root}>
        <Route name='home' path='home.html' handler={HomePage}/>
        <Route name='liveSchemaEditor' path='liveSchemaEditor.html' handler={ClientLoader}/>
        <DefaultRoute handler={HomePage}/>
    </Route>
)
