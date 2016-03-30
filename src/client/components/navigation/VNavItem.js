var React = require("react");
import Icon from './Icon';
import menuHelper from './menuHelper';
var Link = require('react-router').Link;


var VNavItem = React.createClass({

    PropTypes: {
        node: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            collapsed: false
        }
    },

    handleCollapse: function () {
        if (this.props.node.nodes) {
            this.setState({collapsed: !this.state.collapsed});
        }
    },

    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {

        let childrenWrapper = null;
        if (this.props.node.nodes && this.state.collapsed === false) {
            childrenWrapper = <div className="vnav-children-wrapper">
                {menuHelper.createVNavItemsFromNodes(this.props.node.nodes, this.props.onClick)}
            </div>;
        }

        let vNavIconTextClass = this.props.node.icon ? "vnav-item-text with-icon" : "vnav-item-text";
        let plusWrapper = this.props.node.nodes ? <span className="plus-wrapper" onClick={this.handleCollapse}>
             <Icon icon={this.state.collapsed ? "plus" : "minus"}/>
        </span> : null;

        let text = this.props.node.url ? <Link to={this.props.node.url}>{this.props.node.display}</Link> : <span>{this.props.node.display}</span>


        return <div className="vnav-item-wrapper">
            <div className="vnav-item">
                {this.props.node.icon ? <Icon icon={this.props.node.icon}/> : null }
                <span className={vNavIconTextClass}>
                    {text}
                </span>
                {plusWrapper}
            </div>
            {childrenWrapper}
        </div>
    }
});

export default VNavItem;