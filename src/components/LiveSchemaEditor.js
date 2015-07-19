import React from 'react/addons.js';
import brace  from 'brace';
import AceEditor from 'react-ace-wrapper';
import braceJavaScriptMode from 'brace/mode/jsx';
import gitHubTheme from 'brace/theme/github';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import Input from 'react-bootstrap/lib/Input.js';
import Metaform from './MetaForm.js';
import metadataProvider from '../lib/metadataProvider.js';
import Alert from 'react-bootstrap/lib/Alert.js';
import CheckBox from './editors/CheckBox.js';

const LiveSchemaEditor = React.createClass({

    getInitialState: function() {
      return {
       text: 'something really cool',
          schema: {},
          entityName: '',
          layoutName: '',
          model: {},
          title: '',
          autoUpdateMetaform: false
      };
    },

    onTextChange: function(event) {
        let updatedState = React.addons.update(this.state, { text: {$set: event} });
        this.setState(updatedState);
        if(this.state.autoUpdateMetaform) {
            this.resetMetaform();
        }
    },

    onAutoupdateChanged: function(event) {
        let updatedState = React.addons.update(this.state, { autoUpdateMetaform: {$set: event} });
        this.setState(updatedState);
    },

    onMainEntityNameChanged: function(event) {
        let updatedState = React.addons.update(this.state, { entityName: {$set: event.target.value} });
        this.setState(updatedState);
    },

    onMainLayoutNameChanged: function(event) {
        let updatedState = React.addons.update(this.state, { layoutName: {$set: event.target.value} });
        this.setState(updatedState);
    },

    onFormTitleChanged: function(event) {
        let updatedState = React.addons.update(this.state, { title: {$set: event.target.value} });
        this.setState(updatedState);
    },

    resetMetaform: function() {
        if(this.refs.mf) {
            this.refs.mf.resetState();
        }
    },

    /**
     * Returns the schema object based on the text
     */
    buildMetaform: function() {
        try {
            let schema = eval('(' + this.state.text + ')');
            let fields = metadataProvider.getFields(schema, this.state.entityName, this.state.layoutName);
            return <Metaform
                schema={schema}
                ref="mf"
                entityName={this.state.entityName}
                layoutName= {this.state.layoutName}
                model={this.state.model}
                title={this.state.title}/>;
        }
        catch(ex) {
            console.log(ex.message);
            return <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                <h4>Oh snap! The schema is not valid.</h4>
                <p>Detailed information: <b>{ex.message}</b></p>
                <p>
                    <span>Change the schema</span>
                    <span> or </span>
                    <Button onClick={() => this.forceUpdate()}>try again</Button>
                </p>
            </Alert>
        }
    },

    render: function() {
        let _this = this;
        return <div>
            <div className='row'>
                <div className="col-md-12">
                    <h2>Gearz schema live editor</h2>
                    </div>
                <div className="col-md-6">

                    <div className='row'>
                        <div className="col-md-6">
                            <Input type='select' placeholder='select'>
                                <option value='select'>Select preset</option>
                            </Input>
                        </div>
                        <div className="col-md-3">
                            <Button bsStyle="primary" onClick={()=> _this.resetMetaform()} block><Glyphicon glyph="refresh"/> Update </Button>
                        </div>
                        <div className="col-md-3">
                            <CheckBox value={this.state.autoUpdateMetaform} displayName="Auto update" onChange={this.onAutoupdateChanged} />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <Input label="Main entity name" type="text" onChange={this.onMainEntityNameChanged} />
                        </div>
                        <div className="col-md-6">
                            <Input label="Main layout name" type="text" onChange={this.onMainLayoutNameChanged}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <Input label="Form title" type="text" onChange={this.onFormTitleChanged}/>
                        </div>
                    </div>

                    <AceEditor
                        mode="jsx"
                        width="100%"
                        theme="github"
                        onChange={this.onTextChange}
                        name="liveSchemaEditor"
                        value={this.state.text}
                        />
                    </div>
                <div className="col-md-6" style={{backgroundColor: '#eeeeee'}}>
                    <div id="#mountNode" >
                        {this.buildMetaform()}
                    </div>
                </div>
                </div>:
            </div>;
    }
});

export default LiveSchemaEditor;