import React from 'react';

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
    render: function() {
        return (
            <div>
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