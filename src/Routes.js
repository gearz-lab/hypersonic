import React from 'react';

import App from './views/App.js';
import HomePage from './views/Home.js';
import About from './views/About.js';
import LiveSchemaEditor from './views/LiveSchema.js';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
    <Route name='app' path='/' handler={App}>
        <DefaultRoute handler={HomePage}/>
        <Route name='home' path='index' handler={HomePage} />
        <Route name='about' path='about' handler={About} />
        <Route name='liveSchemaEditor' path='liveSchemaEditor' handler={LiveSchemaEditor}  />
    </Route>
)
