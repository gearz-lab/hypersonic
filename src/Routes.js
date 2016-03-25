import React from 'react';

import App from './client/views/App.js';
import HomePage from './client/views/Home.js';
import About from './client/views/About.js';
import Login from './client/views/Login.js';

//paradigms
import Edit from './client/views/scrud/Edit.js';
import Details from './client/views/scrud/Details.js';

import {Route, IndexRoute} from 'react-router';

export default (
    <Route>
        <Route name='app' path='/' component={App}>
            <IndexRoute component={HomePage}/>

            <Route path='/e/:entity/:layout/details/:id' component={Details}/>
            <Route path='/e/:entity/details/:id' component={Details}/>

            <Route path='/e/:entity/edit/:id' component={Edit}/>
            <Route path='/e/:entity/:layout/edit/:id' component={Edit}/>

            <Route path='/e/:entity/new' component={Edit}/>
            <Route path='/e/:entity/:layout/edit' component={Edit}/>

            <Route path='index' component={HomePage}/>
            <Route path='about' component={About}/>
        </Route>
        <Route name='login' path='/login' component={Login}/>
    </Route>
)
