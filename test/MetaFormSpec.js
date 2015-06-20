import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import MetaForm from '../src/components/MetaForm';
import chai from 'Chai';
const assert = chai.assert;

describe('Metaform', function () {
    it('Should something', function () {
        var entityType = {
            name: {
                type: 'string',
                placeholder: ''
            }
        };
        var layout = {
            rows: [
                'name'
            ]
        };
        let instance = ReactTestUtils.renderIntoDocument(<MetaForm entityType={entityType} layout={layout}/>);
    });
});