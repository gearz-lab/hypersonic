import React from 'react';

var ReactBootstrap = require('react-bootstrap')
    , NavItem = ReactBootstrap.NavItem;

var UserBadge = React.createClass({
    propTypes: {
        user: React.PropTypes.object
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
