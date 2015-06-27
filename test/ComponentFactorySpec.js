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
            assert.equal(1, definitions.length);
        });
        it('Should return definitions for the int type', function () {
            const definitions = ComponentFactory.getComponents('int');
            assert.isArray(definitions);
            assert.equal(1, definitions.length);
        });
        it('Should return definitions for the float type', function () {
            const definitions = ComponentFactory.getComponents('int');
            assert.isArray(definitions);
            assert.equal(1, definitions.length);
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

    describe('getDefaultComponent', function() {
        describe('Should get default component for primitive types', function() {

            it('string', function() {
                    let defaultComponent = ComponentFactory.getDefaultComponent('string');
                    ReactTestUtils.isElement(defaultComponent);
                });

            it('float', function() {
                    let defaultComponent = ComponentFactory.getDefaultComponent('float');
                    ReactTestUtils.isElement(defaultComponent);
                });

            it('int', function() {
                    let defaultComponent = ComponentFactory.getDefaultComponent('int');
                    ReactTestUtils.isElement(defaultComponent);
            });
        });
    });

    describe('buildComponent', function() {
        it('Should throw exception when getting a component definition specifying an unknown component', function () {
            const metadata = {
                name: 'name',
                type: 'string',
                component: 'foo'
            };
            assert.throws(() => ComponentFactory.buildComponent(metadata, e => {}), /Could not find the given component/);
        });

        it('Should return the component when specifying the component explicitly', function() {
            const metadata = {
                name: 'name',
                type: 'string',
                component: 'textbox'
            };
            const component = ComponentFactory.buildComponent(metadata, {}, e => {});
            assert.isTrue(ReactTestUtils.isElement(component));
        });

        it('Should return the component when specifying the type only', function() {
            const metadata = {
                name: 'name',
                type: 'string'
            };
            const component = ComponentFactory.buildComponent(metadata, {}, e => {});
            assert.isTrue(ReactTestUtils.isElement(component));
        });

        it('Should throw an exception when the type doesn\'t exist', function() {
            const metadata = {
                name: 'name',
                type: 'foo'
            };
            assert.throws(() => ComponentFactory.buildComponent(metadata, {}, e => {}), /Couldn't find any component for the given type/);
        });

        it('Should work with integers', function() {
            const metadata = {
                name: 'number',
                type: 'int'
            };
            const component = ComponentFactory.buildComponent(metadata, {}, e => {});
            assert.isTrue(ReactTestUtils.isElement(component));
        });
    });
});