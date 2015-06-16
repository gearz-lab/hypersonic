var React = require('react');
var Router = require('react-router');

var Home = React.createClass({
    getInitialState: function() {
        return {
            count: 0
        };
    },

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        return (
            <div>
                Hello, {this.props.name}! You've clicked the button {this.state.count} times.
                <div>
                    <button onClick={this.handleClick}>Click Me!</button>
                </div>
            </div>
        );
    },

    handleClick(e) {
        this.setState({count: this.state.count + 1});
    }
});

export default Home;