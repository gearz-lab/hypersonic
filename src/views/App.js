import React from 'react';

import clientActions from '../flux/actions/clientActions.js';
import clientStores from '../flux/stores/clientStores.js';

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route;

import Navbar from 'react-bootstrap/lib/Navbar';

var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav
    , NavItem = ReactBootstrap.NavItem
    , ListGroup = ReactBootstrap.ListGroup;

var ReactRouterBootstrap = require('react-router-bootstrap')
    , NavItemLink = ReactRouterBootstrap.NavItemLink
    , ButtonLink = ReactRouterBootstrap.ButtonLink
    , ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;



var DefaultLayout = React.createClass({

    getInitialState: function() {
        return {
            loggedUser: clientStores.loggedUser.getLoggedUser()
        }
    },

    componentDidMount: function() {
        clientStores.loggedUser.addChangeListener(this.loggedUserChanged);
        clientActions.loggedUser.loadLoggedUser();
    },

    componentWillUnmount: function() {
        clientStores.loggedUser.removeChangeListener(this.loggedUserChanged);
    },

    loggedUserChanged: function() {
        this.setState({
            loggedUser: clientStores.loggedUser.getLoggedUser()
        })
    },

    render: function() {

        let loggedUser = this.state.loggedUser;
        let loggedUserBadge = <div></div>;
        if(loggedUser) {
            loggedUserBadge = <div>{loggedUser.displayName}</div>;
        }

        return (
            <div>
                <loggedUserBadge/>
                <Navbar brand='Gearz' fluid staticTop>
                    <Nav eventKey={0}>
                        <NavItemLink to='home'>Home</NavItemLink>
                        <NavItemLink to='about'>About</NavItemLink>
                        <NavItemLink to='liveSchemaEditor'>Live Schema Editor</NavItemLink>
                    </Nav>
                </Navbar>
                <div className="container-fluid">
                    <Router.RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = DefaultLayout;