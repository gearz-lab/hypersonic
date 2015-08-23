var React = require("react");
var gearzMixin = require("./mixin.js");
var Link = require('react-router').Link;

var MainMenuItem = React.createClass({
    mixins: [gearzMixin],
    propTypes: {
        onAnyChange: React.PropTypes.func,
        onCollapsedChange: React.PropTypes.func,
        path: React.PropTypes.array.isRequired
    },
    hasChildren: function (nodes) {
        if (Array.isArray(nodes))
            return nodes.length > 0;
        if (typeof nodes == 'object')
            return Object.keys(nodes).length > 0;
        return !!nodes;
    },
    cardinality: function (nodes) {
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
        var link;
        if (route) {
            link = <Link to={route.name} params={route.params}>{display}</Link>
        }
        else {
            link = <span>{display}</span>
        }

        return <li className="list-group-item" style={{paddingLeft: indentation}}>
                    <span
                        className={
                            !hasChildren ? "rui-treeView-toggle-button" :
                                collapsed ? "rui-treeView-toggle-button glyphicon glyphicon-triangle-right" :
                                    "rui-treeView-toggle-button glyphicon glyphicon-triangle-bottom"
                            }
                        onClick={ this.setter("collapsed", !collapsed) }>
                    </span>
                    <span className="rui-treeView-content">
                        { link }
                    </span>
        </li>;
    }
});

module.exports = MainMenuItem;