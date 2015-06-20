import ComponentResolver from '../src/lib/ComponentResolver';
import chai from 'chai';

const assert = chai.assert;

describe('ComponentFactory', function () {


    describe('getBuilders', function() {
        it('Should return all definitions', function () {
            const definitions = ComponentResolver.getBuilders();
            assert.isObject(definitions);
        });
        it('Should return definitions for the string type', function () {
            const definitions = ComponentResolver.getBuilders('string');
            assert.isArray(definitions);
        });
    });

    describe('_validateMetadata', function() {
        it('Should throw an exception when the given metadata is null or undefined', function() {
            assert.throws(() => ComponentResolver._validateMetadata(null), /Metadata should not be null or undefined/);
        });
        it('Should throw an exception when the the type property of the metadata is null or undefined', function() {
            assert.throws(() => ComponentResolver._validateMetadata({type: null}), /Metadata should have a type/);
        });
    });

    describe('buildComponent', function() {
        it('Should throw exception when getting a component definition specifying an unknown component', function () {
            const metadata = {
                type: 'string',
                component: 'foo'
            };
            assert.throws(() => ComponentResolver.buildComponent(metadata), /Coundn't find component/);
        });

        it('Should return the component when specifying the component explicitly', function() {
           const metadata = {
               type: 'string',
               component: 'textbox'
           };
            const component = ComponentResolver.buildComponent(metadata);
            assert.ok(component);
        });

        it('Should return the component when specifying the type only', function() {
            const metadata = {
                type: 'string',
            };
            const component = ComponentResolver.buildComponent(metadata);
            assert.ok(component);
        });

        it('Should throw an exception when the type doesn\'t exist', function() {
            const metadata = {
                type: 'foo',
            };
            assert.throws(() => ComponentResolver.buildComponent(metadata), /Coundn't find any component for the given type/);
        });
    });
});