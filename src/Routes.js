import React from 'react';

import Layout from './views/Layout.js';
import HomePage from './views/Home.js';
import About from './views/About.js';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
    <Route name='app' path='/' handler={Layout}>
        <DefaultRoute handler={HomePage}/>
        <Route name='home' path='index.html' handler={HomePage} />
        <Route name='about' path='about.html' handler={About} />
    </Route>
)
