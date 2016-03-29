import React from 'react';
import { ButtonGroup, Button} from 'react-bootstrap';
import Grid from './Grid';
import LoadingBox from './LoadingBox';

var Search = React.createClass({

    propTypes: {
        params: React.PropTypes.object.isRequired
    },

    componentDidMount: function() {
        this.props.searchEntities(this.props.params.entity, '');
    },

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function () {
        return `Searching ${this.props.params.entity}`;
    },

    isReady: function() {
        return this.props.applicationDomain.data && this.props.model.data;
    },
    
    render: function () {
        if(!this.isReady()) return <LoadingBox/>;

        let rows = []
        if( Object.prototype.toString.call( this.props.model.data ) === '[object Array]' ) {
            rows = this.props.model.data;
        }

        return (
            <div className="document">
                <div className="document-header">{this.getDocumentTitle()}</div>
                <div className="document-body">
                    <div className="button-bar">
                        <ButtonGroup>
                            <Button>Left</Button>
                            <Button>Middle</Button>
                            <Button>Right</Button>
                        </ButtonGroup>
                    </div>
                    <Grid entity={this.props.params.entity} applicationDomain={this.props.applicationDomain.data} rows={rows} />
                </div>
            </div>
        );
    }
});

export default Search;