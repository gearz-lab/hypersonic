import React from 'react';

import App from './views/App.js';
import HomePage from './views/Home.js';
import About from './views/About.js';
import LiveSchemaEditor from './views/LiveSchema.js';
import Login from './views/Login.js';

//paradigms
import EditParadigm from './views/paradigms/Edit.js';
import DetailsParadigm from './views/paradigms/Details.js';

import {Route, Routes, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
    <Route>
        <Route name='app' path='/' handler={App}>

            <Route name='details-with-layout' path='/e/:entity/:layout/details/:id' handler={DetailsParadigm} />
            <Route name='details' path='/e/:entity/details/:id' handler={DetailsParadigm} />

            <Route name='edit-with-layout' path='/e/:entity/:layout/edit/:id' handler={EditParadigm} />
            <Route name='edit-with-layout-no-id' path='/e/:entity/:layout/edit' handler={EditParadigm} />
            <Route name='edit' path='/e/:entity/edit/:id' handler={EditParadigm} />
            <Route name='edit-no-id' path='/e/:entity/edit' handler={EditParadigm} />

            <Route name='home' path='index' handler={HomePage} />
            <Route name='about' path='about' handler={About} />
            <Route name='liveSchemaEditor' path='liveSchemaEditor' handler={LiveSchemaEditor}  />
            <DefaultRoute handler={HomePage}/>
        </Route>
        <Route name='login' path='/login' handler={Login} />
    </Route>
)
