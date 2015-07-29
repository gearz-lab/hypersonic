import React from 'react';
import CheckBox from '../components/editors/CheckBox.js';

var Login = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <CheckBox name="rememberMe" displayName="Remember me" />
                    <a className="btn btn-block btn-social btn-google" href="/auth/google">
                        <i className="fa fa-google"></i> Sign in with Google
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = Login;