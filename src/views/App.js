import React from 'react';

import clientActions from '../flux/actions/clientActions.js';
import clientStores from '../flux/stores/clientStores.js';

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route;

import Navbar from 'react-bootstrap/lib/Navbar';

import MainMenu from '../components/navigation/TreeView/TreeView.js';

var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav
    , NavItem = ReactBootstrap.NavItem
    , ListGroup = ReactBootstrap.ListGroup;

var ReactRouterBootstrap = require('react-router-bootstrap')
    , NavItemLink = ReactRouterBootstrap.NavItemLink
    , ButtonLink = ReactRouterBootstrap.ButtonLink
    , ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;

import UserBadge from '../components/UserBadge.js';

var DefaultLayout = React.createClass({

    getInitialState: function() {
        return {
            loggedUser: clientStores.loggedUser.getLoggedUser(),
            mainMenu: clientStores.mainMenu.getMainMenu()
        }
    },

    componentDidMount: function() {
        // logged user
        clientStores.loggedUser.addChangeListener(this.loggedUserChanged);
        clientActions.loggedUser.loadLoggedUser();

        // main menu
        clientStores.mainMenu.addChangeListener(this.mainMenuChanged);
        clientActions.mainMenu.loadMainMenu();
    },

    componentWillUnmount: function() {
        clientStores.loggedUser.removeChangeListener(this.loggedUserChanged);
        clientStores.mainMenu.removeChangeListener(this.mainMenuChanged);
    },

    loggedUserChanged: function() {
        this.setState({
            loggedUser: clientStores.loggedUser.getLoggedUser()
        });
    },

    mainMenuChanged: function() {
        this.setState({
            mainMenu: clientStores.mainMenu.getMainMenu()
        });
    },

    render: function() {

        return (
            <div>
                <Navbar brand='Gearz' fluid staticTop>
                    <Nav eventKey={0}>
                        <NavItemLink to='home'>Home</NavItemLink>
                        <NavItemLink to='about'>About</NavItemLink>
                        <NavItemLink to='liveSchemaEditor'>Live Schema Editor</NavItemLink>
                    </Nav>
                    <Nav right>
                        <UserBadge user={this.state.loggedUser} />
                    </Nav>
                </Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <MainMenu nodes={this.state.mainMenu} />
                        </div>
                        <div className="col-md-9">
                            <Router.RouteHandler />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DefaultLayout;