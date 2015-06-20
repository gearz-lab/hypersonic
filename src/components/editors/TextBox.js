var React = require('react');
var Router = require('react-router');

var Home = React.createClass({
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

export default Home;