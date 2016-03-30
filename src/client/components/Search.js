import React from 'react';
import { ButtonGroup, Button} from 'react-bootstrap';
import Grid from './Grid';
import LoadingBox from './LoadingBox';

var Search = React.createClass({

    propTypes: {
        params: React.PropTypes.object.isRequired
    },

    componentDidMount: function() {
        this.props.searchEntities(this.props.params.entity, '', 0);
    },

    /**
     * Returns the document title
     * @returns {*}
     */
    getDocumentTitle: function () {
        return `Searching ${this.props.params.entity}`;
    },

    isReady: function() {
        return this.props.applicationDomain.data && this.props.model.data && this.props.model.data.rows;
    },
    
    render: function () {
        if(!this.isReady()) return <LoadingBox/>;

        let entityName = this.props.params.entity;
        let applicationDomain = this.props.applicationDomain.data;
        let rows = this.props.model.data.rows;

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
                    <Grid entity={entityName} applicationDomain={applicationDomain} rows={rows} />
                </div>
            </div>
        );
    }
});

export default Search;