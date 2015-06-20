import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import MetaForm from '../src/components/MetaForm';
import chai from 'Chai';
const assert = chai.assert;

describe('Metaform', function () {
    it('Should something', function () {

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
    });
});