import React from 'react';

import _ from 'underscore';
import clientApi from '../api/clientApi.js';
import async from 'async';

import Navbar from '../../../node_modules/react-bootstrap/lib/Navbar';
import Nav from '../../../node_modules/react-bootstrap/lib/Nav';

import MainMenu from '../components/navigation/mainMenu/MainMenu.js';

import NotificationSystem from 'react-notification-system';
import UserBadge from '../components/UserBadge.js';

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
                <Navbar  fluid staticTop>
                    <Nav className="navbar-brand">
                        <a hfef="/">Gearz app</a>
                    </Nav>
                    <Nav pullRight>
                        <UserBadge user={this.state.loggedUser} />
                    </Nav>
                </Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <MainMenu nodes={this.state.mainMenu} />
                        </div>
                        <div className="col-md-9">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <NotificationSystem ref="notificationSystem" />
                {
                    (() => {
                        if (process.env.NODE_ENV !== 'production') {
                            const DevTools = require('../containers/DevTools');
                            return <DevTools />;
                        }
                    })()
                }
            </div>

        );
    }
});

export default DefaultLayout;