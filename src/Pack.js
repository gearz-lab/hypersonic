// router
import routerActions from './flux/actions/RouterActions.js';

// styles
import reactSelect from './less/thirdParty/lookup.less';
import datePicker from 'react-widgets/dist/css/react-widgets.css';
import fontAwesome from 'font-awesome/less/font-awesome.less';
import bootstrapSocial from 'bootstrap-social/bootstrap-social.css';

import styles from './less/styles.less';
import login from './less/login.less';

import React from 'react';
import Router from 'react-router';
import routes from './Routes';

// favicon
import favicon from '../assets/favicon.ico';

window.React = React;

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    routerActions.changeRoute(state);
    React.render(<Handler/>, document.getElementById('#app_container'));
});
