import React from 'react';
import _ from 'underscore';
import { Navbar, Modal, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import VNav from '../components/navigation/VNav';
import NotificationSystem from 'react-notification-system';
import UserBadge from '../components/UserBadge.js';
import modalHelper from '../lib/modalHelper';

var Layout = React.createClass({

    componentDidMount: function() {
        this.props.menuActions.loadMenu();
        this.props.userActions.loadUser();
        
        this._notificationSystem = this.refs.notificationSystem;
        this.checkNotifications();
    },

    componentDidUpdate: function() {
        this.checkNotifications();
    },

    checkNotifications: function()    {
        if(this.props.notification.length && this._notificationSystem) {
            this.props.notification.map(n => {
                let notification = _.extend({ position: 'bl'}, n);
                this._notificationSystem.addNotification(notification);
            });
            this.props.notificationActions.clear();
        }
    },

    render: function() {

        // load modals
        let modals = modalHelper.buildModals(this.props.modal, this.props.modalActions);

        return (
            <div>
                <Navbar  fluid staticTop>
                    <Nav className="navbar-brand">
                        <a hfef="/">Hypersonic app</a>
                    </Nav>
                    <Nav pullRight>
                        <UserBadge user={this.props.user.data} />
                    </Nav>
                </Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <VNav nodes={this.props.menu.data} />
                        </div>
                        <div className="col-md-10">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <NotificationSystem ref="notificationSystem" />
                {modals}
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