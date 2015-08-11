var React = require("react");
var gearzMixin = require("./mixin.js");
var Link = require('react-router').Link;

var TreeRow = React.createClass({
    mixins: [gearzMixin],
    propTypes: {
        onAnyChange: React.PropTypes.func,
        onCollapsedChange: React.PropTypes.func,
        path: React.PropTypes.array.isRequired
    },
    hasChildren: function(nodes) {
        if (Array.isArray(nodes))
            return nodes.length>0;
        if (typeof nodes == 'object')
            return Object.keys(nodes).length>0;
        return !!nodes;
    },
    cardinality: function(nodes) {
        if (Array.isArray(nodes))
            return nodes.length;
        if (typeof nodes == 'object')
            return Object.keys(nodes).length;
        return null;
    },
    render: function () {

        var nodes = this.props.nodes;
        var collapsed = !!this.props.collapsed;
        var display = this.props.display;
        var path = this.props.path;

        var hasChildren = this.hasChildren(nodes);
        var cardinality = this.cardinality(nodes);

        var indentation = 10 + path.length * 15 + "px";

        var route = this.props.route;
        if(route) {
            console.log(route);
        }

       return  <li className="list-group-item noselect" style={{paddingLeft: indentation}}>
                <span
                    className={
                        !hasChildren ? "rui-treeView-toggle-button" :
                            collapsed ? "rui-treeView-toggle-button glyphicon glyphicon-triangle-right" :
                                "rui-treeView-toggle-button glyphicon glyphicon-triangle-bottom"
                        }
                    onClick={ this.setter("collapsed", !collapsed) } >
                </span>
                <span className="rui-treeView-content">
                        { route ? <Link to={route}>{display}</Link> : display }
                </span>
            </li>;
    }
});

module.exports = TreeRow;