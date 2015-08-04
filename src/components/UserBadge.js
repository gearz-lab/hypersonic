import React from 'react';

var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav
    , NavItem = ReactBootstrap.NavItem;

var ReactRouterBootstrap = require('react-router-bootstrap')
    , NavItemLink = ReactRouterBootstrap.NavItemLink;

var UserBadge = React.createClass({
    propTypes: {
        fields: React.PropTypes.object.isRequired
    },
    render: function() {
        let user = this.props.user;
        if(user) {
            return <NavItem  className='user-badge'><img src={this.props.user.photo}/>{this.props.user.displayName}</NavItem>;
        }
        else {
            return <NavItem/>
        }

    }
});

export default UserBadge;
