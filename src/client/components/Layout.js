import React from 'react';
import _ from 'underscore';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import MainMenu from '../components/navigation/mainMenu/MainMenu.js';
import NotificationSystem from 'react-notification-system';
import UserBadge from '../components/UserBadge.js';

var Layout = React.createClass({

    componentDidMount: function() {
        this.props.loadUser();
        this.props.loadMenu();
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
                        <UserBadge user={this.props.user.data} />
                    </Nav>
                </Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <MainMenu nodes={this.props.menu.data} />
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
                            const DevTools = require('./DevTools');
                            return <DevTools />;
                        }
                    })()
                }
            </div>

        );
    }
});

export default Layout;