import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import TextBox from '../src/components/editors/TextBox';
import chai from 'Chai';
import _ from 'underscore';
const assert = chai.assert;

describe('TextBox', function () {

    it('Tests', function () {

        let handleChange = function() {
        };

        var metadata =
        {
            name: 'name',
            displayName: 'Name'
        };

        var component = ReactTestUtils.renderIntoDocument(<TextBox metadata={metadata} onChange={handleChange} initialValue='Andre'/>);
        var domNode = React.findDOMNode(component);

        //let inputInDocument = ReactTestUtils.renderIntoDocument(input);
        //let inputNode = React.findDOMNode(inputInDocument);
        //var elementsByTagName = inputNode.getElementsByTagName('input');
        //
        //ReactTestUtils.Simulate.change(elementsByTagName[0], { value: 'Hey, this is the new value' } );

    });

});