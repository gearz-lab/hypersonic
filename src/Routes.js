import React from 'react';

import App from './client/containers/App.js';
import HomePage from './client/containers/Home.js';
import Login from './client/containers/Login.js';
import Edit from './client/containers/Edit.js';
import Details from './client/containers/Details.js';
import Search from './client/containers/Search';

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

            <Route path='/e/:entity/search' component={Search}/>
            
            <Route path='index' component={HomePage}/>
        </Route>
        <Route name='login' path='/login' component={Login}/>
    </Route>
)
