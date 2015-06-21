import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import MetaForm from '../src/components/MetaForm';
import chai from 'Chai';
import _ from 'underscore';
const assert = chai.assert;

describe('Metaform', function () {

    describe('entityType and layout', function() {
        it('Should be possible to reference a field by name from the layout', function () {
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
            let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout}/>);
            var fields = instance._getFields();
            var nameField = _.find(fields, f => f.name == 'name');
            assert.ok(nameField);
            assert.equal('name', nameField.name);
            assert.equal('string', nameField.type);
            assert.equal('', nameField.placeholder);
        });

        it('Should be possible to extend an existing field', function () {
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
            let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout}/>);
            var fields = instance._getFields();
            var nameField = _.find(fields, f => f.name == 'name');
            assert.ok(nameField);
            assert.equal('textbox', nameField.component);
        });

        it('Should be possible change properties of existing fields', function () {
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
            let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout}/>);
            var fields = instance._getFields();
            var nameField = _.find(fields, f => f.name == 'name');
            assert.ok(nameField);
            assert.equal('it worked', nameField.placeholder);
        });
    });

    describe('model', function() {
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
            let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout}/>);
            var model = instance._getModel();
            assert.ok(model);
        });
    });
});