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
        var inputNode = React.findDOMNode(component);
        var elementsByTagName = inputNode.getElementsByTagName('input');

        ReactTestUtils.Simulate.change(elementsByTagName[0], {target: {value: 'John'}} );
        assert.equal('John', changedValue);
    });

});