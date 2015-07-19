import React from 'react';
import LiveSchemaEditor from '../components/LiveSchemaEditor.js';

const LiveSchema = React.createClass({
    render: function() {
        return <div>
                <LiveSchemaEditor />
            </div>;
    }
});

export default LiveSchema;