import React from 'react';

const LED = React.createClass({

    render: function () {

        if(typeof window !== 'undefined') {
            console.log('fuuuuuck.. I\'m in the client');
            var LiveSchemaEditor  = require('../../src/components/LiveSchemaEditor.js');
            return <LiveSchemaEditor />;
        }

        return null;
    }
});

export default LED;
