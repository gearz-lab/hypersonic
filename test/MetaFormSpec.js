import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import MetaForm from '../src/components/MetaForm';
import chai from 'Chai';
import _ from 'underscore';
const assert = chai.assert;

describe('Metaform', function () {

    describe('EntityType and layout', function() {
        it('It should be possible to reference a field by name from the layout', function () {
            let entityType = {
                fields: [
                    {
                        name: 'name',
                        type: 'string',
                        placeholder: ''
                    }
                ]
            };
            let layout = {
                fields: [
                    'name'
                ]
            };
            let model = {
                name: 'Andre'
            };
            let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout} model={model}/>);
            var fields = instance._getFields();
            var nameField = _.find(fields, f => f.name == 'name');
            assert.ok(nameField);
            assert.equal('name', nameField.name);
            assert.equal('string', nameField.type);
            assert.equal('', nameField.placeholder);
        });

        it('It should be possible to extend an existing field', function () {
            let entityType = {
                fields: [
                    {
                        name: 'name',
                        type: 'string',
                        placeholder: ''
                    }
                ]
            };
            let layout = {
                fields: [
                    {
                        name: 'name',
                        component: 'textbox'
                    }
                ]
            };
            let model = {
                name: 'Andre'
            };
            let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout} model={model}/>);
            var fields = instance._getFields();
            var nameField = _.find(fields, f => f.name == 'name');
            assert.ok(nameField);
            assert.equal('textbox', nameField.component);
        });

        it('Should be possible to change properties of existing fields', function () {
            let entityType = {
                fields: [
                    {
                        name: 'name',
                        type: 'string',
                        placeholder: ''
                    }
                ]
            };
            let layout = {
                fields: [
                    {
                        name: 'name',
                        placeholder: 'it worked'
                    }
                ]
            };
            let model = {
                name: 'Andre'
            };
            let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout} model={model}/>);
            var fields = instance._getFields();
            var nameField = _.find(fields, f => f.name == 'name');
            assert.ok(nameField);
            assert.equal('it worked', nameField.placeholder);
        });
    });

    describe('Model', function() {
        it('Should have a default model', function () {
            let entityType = { };
            let layout = {
                fields: [
                    {
                        name: 'name',
                        type: 'string',
                        placeholder: ''
                    }
                ]
            };
            let model = {
                name: 'Andre'
            };
            let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout} model={model}/>);
            var modelToTest = instance._getModel();
            assert.ok(modelToTest);
        });
    });

    describe('Complex', function() {

       it('Something', function() {
           let entityType = {
               fields: [
                   {
                       name: 'name',
                       type: 'string',
                       displayName: 'Name',
                       placeholder: 'Name',
                       help: 'Here you should put the name',
                       invalid: [{
                           expression: value => value.length > 3,
                           message: 'The name should not have more than 3 characters'
                       }]
                   },
                   {
                       name: 'description',
                       type: 'string',
                       displayName: 'Description',
                       placeholder: 'Description',
                       help: 'Here you should put the description'
                   }
               ]
           };

           let layout = {
               fields: [
                   { name: 'name' },
                   { name: 'description' }
               ]
           };

           let model = {
               name: 'André',
               description: 'The best'
           };

           let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout} model={model}/>);
           var componentNode = React.findDOMNode(instance);
       })

    });

    describe('Working with integers', function() {
        it('Basic usage', function() {
            let entityType = {
                fields: [
                    {
                        name: 'number',
                        type: 'int',
                        displayName: 'Number of something'
                    }
                ]
            };

            let layout = {
                fields: [
                    { name: 'number' }
                ]
            };

            let model = {
                number: '24'
            };

            let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout} model={model}/>);
            var componentNode = React.findDOMNode(instance);
        });
    });
});