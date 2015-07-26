import React from 'react';

import App from './views/App.js';
import HomePage from './views/Home.js';
import About from './views/About.js';
import LiveSchemaEditor from './views/LiveSchema.js';
import Login from './views/Login.js';

import {Route, Routes, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
    <Route>
        <Route name='app' path='/' handler={App}>
            <DefaultRoute handler={HomePage}/>
            <Route name='home' path='index' handler={HomePage} />
            <Route name='about' path='about' handler={About} />
            <Route name='liveSchemaEditor' path='liveSchemaEditor' handler={LiveSchemaEditor}  />
        </Route>
        <Route name='login' path='/login' handler={Login} />
    </Route>
)
