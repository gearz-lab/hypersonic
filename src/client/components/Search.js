import React from 'react';
import { ButtonGroup, Button} from 'react-bootstrap';
import Grid from './Grid';
import LoadingBox from './LoadingBox';

var Search = React.createClass({

    propTypes: {
        params: React.PropTypes.object.isRequired
    },

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function () {
        return `Searching ${this.props.params.entity}`;
    },

    isReady: function() {
        return this.props.applicationDomain.data;
    },
    
    render: function () {
        if(!this.isReady()) return <LoadingBox/>;

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
                    <Grid entity={this.props.params.entity} applicationDomain={this.props.applicationDomain.data} rows={[]} />
                </div>
            </div>
        );
    }
});

export default Search;