var React = require('react');
var Router = require('react-router');
var componentResolver = require('../lib/ComponentResolver');

var DynamicForm = React.createClass({
    propTypes: {
        entityType: React.PropTypes.object,
        layout: React.PropTypes.object
    },
    render: function() {

        return (
            <div>
                { this.props.layout.rows.map(item => componentResolver.getComponent(item)) }
            </div>
        );
    }
});

export default DynamicForm;