import React from 'react';

import App from './client/views/App.js';
import HomePage from './client/views/Home.js';
import About from './client/views/About.js';
import Login from './client/views/Login.js';

//paradigms
import Edit from './client/views/scrud/Edit.js';
import Details from './client/views/scrud/Details.js';

import {Route, Routes, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
    <Route>
        <Route name='app' path='/' handler={App}>

            <Route name='details-with-layout' path='/e/:entity/:layout/details/:id' handler={Details} />
            <Route name='details' path='/e/:entity/details/:id' handler={Details} />

            <Route name='edit' path='/e/:entity/edit/:id' handler={Edit} />
            <Route name='edit-with-layout' path='/e/:entity/:layout/edit/:id' handler={Edit} />

            <Route name='new' path='/e/:entity/new' handler={Edit} />
            <Route name='new-with-layout' path='/e/:entity/:layout/edit' handler={Edit} />

            <Route name='home' path='index' handler={HomePage} />
            <Route name='about' path='about' handler={About} />
            <DefaultRoute handler={HomePage}/>
        </Route>
        <Route name='login' path='/login' handler={Login} />
    </Route>
)
