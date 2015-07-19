import bootstrap from 'bootstrap/less/bootstrap.less';
import reactSelect from './less/thirdParty/lookup.less';
import datePicker from 'react-widgets/dist/css/react-widgets.css';
import styles from './less/styles.less';

import React from 'react';
import Router from 'react-router';
import routes from './Routes';

window.React = React;

Router.run(routes, Router.HistoryLocation, Handler => {
    React.render(<Handler/>, document.getElementById('#app_container'));
});
