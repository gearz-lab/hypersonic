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

        let head = {
            __html: `<title>ReactUI - Bootstrap based data components for React</title>
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <link href='assets/main.css' rel='stylesheet' />`
            };

        let bundle;
        console.log(process.env.NODE_ENV);
        if(process.env.NODE_ENV == 'production') {
            bundle = 'assets/bundle.js';
        }
        else {
            bundle = 'http://localhost:8080/assets/bundle.js';
        }

        return (
            <html>
                <head dangerouslySetInnerHTML={head} />
                <body>
                    <Navbar brand='Gearz' fluid staticTop>
                        <Nav eventKey={0}>
                            <NavItemLink to='home'>Home</NavItemLink>
                            <NavItemLink to='about'>About</NavItemLink>
                        </Nav>
                    </Navbar>
                    <div className="container-fluid">
                        <Router.RouteHandler />
                    </div>
                </body>
                <script src={bundle} />
            </html>
        );
    }
});

module.exports = DefaultLayout;