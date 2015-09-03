import React from 'react';
import _ from 'underscore';
import componentFactory from '../lib/ComponentFactory';

var MetaFormGroup = React.createClass({
    propTypes: {
        layout: React.PropTypes.object.isRequired,
        componentProps: React.PropTypes.array.isRequired
    },
    render: function() {
        let _this = this;
        if(this.props.layout.fields) {
            return <div>
                {
                    this.props.layout.fields.map(field => componentFactory.buildComponent(_this.props.componentProps[field.name]))
                }
            </div>
        }
        return <div>
            {
                this.props.layout.groups.map(group => <MetaFormGroup layout={group} componentProps={_this.props.componentProps} />)
            }
            </div>
    }
});

export default MetaFormGroup;