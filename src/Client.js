// router
import routerActions from './flux/actions/RouterActions.js';

// styles

import datePicker from 'react-widgets/dist/css/react-widgets.css';
import bootstrapSocial from 'bootstrap-social/bootstrap-social.css';

import styles from './less/styles.less';

import React from 'react';
import Router from './Router.js';

// favicon
import favicon from '../assets/favicon.ico';

if(window) {
    window.React = React;
}

Router.run((Handler, state) => {
    routerActions.changeRoute(state);
    React.render(<Handler/>, document.getElementById('#app_container'));
});
