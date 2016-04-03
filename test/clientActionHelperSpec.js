import {assert} from 'chai';
import clientActionHelper from '../src/client/lib/clientActionHelper';

describe('clientActionHelper', function () {
    it('When the layout is undefined', function () {
        let entity = {
            clientActions: [
                {
                    name: 'foo'
                }
            ]
        };
        let layout = undefined;
        let actions = clientActionHelper.getActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
    });
    it('When the layout has no client action', function () {
        let entity = {
            clientActions: [
                {
                    name: 'foo'
                }
            ]
        };
        let layout = {};
        let actions = clientActionHelper.getActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
    });
    it('When the entity has no client action', function () {
        let entity = {};
        let layout = {
            clientActions: [
                {
                    name: 'foo'
                }
            ]
        };
        let actions = clientActionHelper.getActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
    });
    it('When the entity has actions that the layout does not define', function () {
        let entity = {
            clientActions: [
                {
                    name: 'foo'
                },
                {
                    name: 'foo2'
                }
            ]
        };
        let layout = {
            clientActions: [
                {
                    name: 'foo'
                }
            ]
        };
        let actions = clientActionHelper.getActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
    });
    it('When the entity action define properties that the layout does not define', function () {
        let entity = {
            clientActions: [
                {
                    name: 'foo',
                    entityProperty: 1
                }
            ]
        };
        let layout = {
            clientActions: [
                {
                    name: 'foo'
                }
            ]
        };
        let actions = clientActionHelper.getActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
        assert.equal(actions[0].entityProperty, 1);
    });
    it('When the layout action define properties that the layout does not define', function () {
        let entity = {
            clientActions: [
                {
                    name: 'foo',
                }
            ]
        };
        let layout = {
            clientActions: [
                {
                    name: 'foo',
                    layoutProperty: 1
                }
            ]
        };
        let actions = clientActionHelper.getActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
        assert.equal(actions[0].layoutProperty, 1);
    });
    it('When the layout action overrides properties', function () {
        let entity = {
            clientActions: [
                {
                    name: 'foo',
                    property: 1
                }
            ]
        };
        let layout = {
            clientActions: [
                {
                    name: 'foo',
                    property: 2
                }
            ]
        };
        let actions = clientActionHelper.getActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
        assert.equal(actions[0].property, 2);
    });
});