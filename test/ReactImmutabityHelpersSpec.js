import React from 'react/addons.js';

describe('Immutability helpers', function() {
    it('Basic usage', function() {
        let originalObject = {
            somethingElse: 1,
            model: {
                value: 1
            }
        };
        let updatedObject = React.addons.update(originalObject, { model: { value: { $set: 2} }} );
        assert.equal(updatedObject.somethingElse, 1);
        assert.equal(updatedObject.model.value, 2);
        //assert.equal(originalObject, updatedObject);
        console.log(updatedObject.model == originalObject.model);
    });
});