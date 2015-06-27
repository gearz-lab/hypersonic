import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import TextBox from '../src/components/editors/TextBox';
import chai from 'Chai';
import _ from 'underscore';
const assert = chai.assert;

describe('TextBox', function () {

    it('onChange', function () {
        var metadata =
        {
            name: 'name',
            displayName: 'Name'
        };

        var model = {
            name: 'Andre'
        };

        var changedValue = undefined;
        var component = ReactTestUtils.renderIntoDocument(<TextBox metadata={metadata} onChange={e => changedValue = e.value} model={model}/>);
        var componentNode = React.findDOMNode(component);
        var elementsByTagName = componentNode.getElementsByTagName('input');

        ReactTestUtils.Simulate.change(elementsByTagName[0], {target: {value: 'John'}} );
        assert.equal('John', changedValue);
    });

    describe('Working with integers', function() {
        it('Basic usage', function () {
            var metadata =
            {
                name: 'number',
                type: 'int',
                displayName: 'Name'
            };

            var model = {
                number: 0
            };

            var changedValue = undefined;
            var component = ReactTestUtils.renderIntoDocument(<TextBox metadata={metadata} onChange={e => changedValue = e.value} model={model}/>);
            var componentNode = React.findDOMNode(component);
            var elementsByTagName = componentNode.getElementsByTagName('input');

            ReactTestUtils.Simulate.change(elementsByTagName[0], {target: {value: '56'}} );
            assert.strictEqual(56, changedValue);
        });

        it('Empty string', function () {
            var metadata =
            {
                name: 'number',
                type: 'int',
                displayName: 'Name'
            };

            var model = {
                number: 234
            };


            let eventWasCalled = false;
            let onChange = (e) => {
                changedValue = e.value;
                eventWasCalled = true;
            };

            var changedValue = undefined;
            var component = ReactTestUtils.renderIntoDocument(<TextBox metadata={metadata} onChange={onChange} model={model}/>);
            var componentNode = React.findDOMNode(component);
            var elementsByTagName = componentNode.getElementsByTagName('input');

            ReactTestUtils.Simulate.change(elementsByTagName[0], {target: {value: ''}} );
            assert.strictEqual(undefined, changedValue);
            assert.isTrue(eventWasCalled);
        });

        it('Not defined value in the model', function () {
            var metadata =
            {
                name: 'number',
                type: 'int',
                displayName: 'Name'
            };

            var model = {
            };

            var changedValue = undefined;
            var component = ReactTestUtils.renderIntoDocument(<TextBox metadata={metadata} onChange={e => changedValue = e.value} model={model}/>);
            var componentNode = React.findDOMNode(component);
            var elementsByTagName = componentNode.getElementsByTagName('input');

            ReactTestUtils.Simulate.change(elementsByTagName[0], {target: {value: '56'}} );
            assert.strictEqual(56, changedValue);
        });

        it('Invalid int', function () {
            var metadata =
            {
                name: 'number',
                type: 'int',
                displayName: 'Name'
            };

            var model = {
                number: undefined
            };

            var changedValue = undefined;
            var component = ReactTestUtils.renderIntoDocument(<TextBox metadata={metadata} onChange={e => changedValue = e.value} model={model}/>);
            var componentNode = React.findDOMNode(component);
            var elementsByTagName = componentNode.getElementsByTagName('input');

            ReactTestUtils.Simulate.change(elementsByTagName[0], {target: {value: 'a'}} );
            assert.notEqual('a', changedValue);
        });
    });

});