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

        // Dump out our current props to a global object via a script tag so
        // when initialising the browser environment we can bootstrap from the
        // same props as what each page was rendered with.
        let browserInitScriptObj = {
            __html: `window.INITIAL_PROPS = ${JSON.stringify(this.props)};`
                };

        let head = {
            __html: `<title>ReactUI - Bootstrap based data components for React</title>
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <link href='assets/bundle.css' rel='stylesheet' />`
            };

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
                        <ol className="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Library</a></li>
                            <li className="active">Data</li>
                        </ol>
                        <Router.RouteHandler />
                    </div>
                </body>
                <script dangerouslySetInnerHTML={browserInitScriptObj} />
                <script src='assets/bundle.js' />
            </html>
        );
    }
});

module.exports = DefaultLayout;