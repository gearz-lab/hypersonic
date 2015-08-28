import React from 'react';
import Router from './Router.js';

// TODO: Move this to Webpack
// For React devtools
window.React = React;

console.log('something');
Router.run((Handler, state) => {
    console.log(state);
    React.render(<Handler/>, document.getElementById('#app_container'));
});
