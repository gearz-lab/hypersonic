import ReactTestUtils from 'react/lib/ReactTestUtils';
import ComponentFactory from '../src/lib/ComponentFactory';
import Chai from 'Chai';
const assert = Chai.assert;

describe('ComponentFactory', function () {


    describe('getComponents', function() {
        it('Should return all definitions', function () {
            const definitions = ComponentFactory.getComponents();
            assert.isObject(definitions);
        });
        it('Should return definitions for the string type', function () {
            const definitions = ComponentFactory.getComponents('string');
            assert.isArray(definitions);
        });
    });

    describe('_validateMetadata', function() {
        it('Should throw an exception when the given metadata is null or undefined', function() {
            assert.throws(() => ComponentFactory._validateMetadata(null), /Metadata should not be null or undefined/);
        });
        it('Should throw an exception when the the type property of the metadata is null or undefined', function() {
            assert.throws(() => ComponentFactory._validateMetadata({type: null}), /Metadata should have a type/);
        });
    });

    describe('buildComponent', function() {
        it('Should throw exception when getting a component definition specifying an unknown component', function () {
            const metadata = {
                type: 'string',
                component: 'foo'
            };
            assert.throws(() => ComponentFactory.buildComponent(metadata, e => {}), /Could not find the given component/);
        });

        it('Should return the component when specifying the component explicitly', function() {
            const metadata = {
                type: 'string',
                component: 'textbox'
            };
            const component = ComponentFactory.buildComponent(metadata, {}, e => {});
            assert.isTrue(ReactTestUtils.isElement(component));
        });

        it('Should return the component when specifying the type only', function() {
            const metadata = {
                type: 'string'
            };
            const component = ComponentFactory.buildComponent(metadata, {}, e => {});
            assert.isTrue(ReactTestUtils.isElement(component));
        });

        it('Should throw an exception when the type doesn\'t exist', function() {
            const metadata = {
                type: 'foo'
            };
            assert.throws(() => ComponentFactory.buildComponent(metadata, {}, e => {}), /Coundn't find any component for the given type/);
        });
    });
});