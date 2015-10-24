import React from 'react';

import _ from 'underscore';
import clientApi from '../client/flux/api/clientApi.js';
import async from 'async';

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route;

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import MainMenu from '../client/components/navigation/mainMenu/MainMenu.js';

import NotificationSystem from 'react-notification-system';
import UserBadge from '../client/components/UserBadge.js';

var DefaultLayout = React.createClass({

    getInitialState: function() {
        return {
            loggedUser: undefined,
            mainMenu: undefined
        }
    },

    componentDidMount: function() {
        let _this = this;
        async.parallel([
            clientApi.users.getLoggedUser,
            clientApi.mainMenu.load
        ], function(errors, results) {
            _this.setState({
                loggedUser: results[0],
                mainMenu: results[1]
            });
        });

        this._notificationSystem = this.refs.notificationSystem;
    },

    /**
     * Handles when there's a new notification
     */
    handleNotification(notification) {
        if(this._notificationSystem) {
            notification = _.extend({ position: 'bl'}, notification);
            this._notificationSystem.addNotification(notification);
        }
    },

    render: function() {

        return (
            <div>
                <Navbar brand={<a href="/"></a>} fluid staticTop>
                    <Nav eventKey={0}>
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
                            <Router.RouteHandler onNotification={this.handleNotification} />
                        </div>
                    </div>
                </div>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
});

export default DefaultLayout;