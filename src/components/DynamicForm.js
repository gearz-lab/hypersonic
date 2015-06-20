var React = require('react');
var Router = require('react-router');

var DynamicForm = React.createClass({
    propTypes: {
        entityType: React.PropTypes.object,
        layout: React.PropTypes.object
    },
    render: function() {
        return (
            <div>
                Hello, {this.props.name}! you have clicked {this.state.count} times.
                <div>
                    <button onClick={this.handleClick}>Click Me!</button>
                </div>
            </div>
        );
    }
});

export default DynamicForm;