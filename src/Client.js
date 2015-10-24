import React from 'react';

// router
import routerActions from './client/flux/actions/RouterActions.js';

// styles
import styles from './client/less/styles.less';

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
