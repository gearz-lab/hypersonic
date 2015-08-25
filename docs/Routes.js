import React from 'react';

import Root from './pages/Root';
import HomePage from './pages/HomePage.js';
import LiveSchemaEditor from '../src/components/LiveSchemaEditor.js';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
    <Route name='app' path='/' handler={Root}>
        <Route name='live-schema-editor' path='liveSchemaEditor.html' handler={LiveSchemaEditor} />
        <Route name='home' path='home.html' handler={HomePage}/>
        <DefaultRoute handler={HomePage}/>
    </Route>
)
