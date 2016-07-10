import {assert} from 'chai';
import clientActionHelper from '../src/client/lib/clientActionHelper';

describe('clientActionHelper', function () {
    it('when the layout is undefined', function () {
        let entity = {
            clientActions: [
                {
                    name: 'foo'
                }
            ]
        };
        let layout = undefined;
        let actions = clientActionHelper.getEntitySpecificActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
    });
    it('when the layout does not define client actions', function () {
        let entity = {
            clientActions: [
                {
                    name: 'foo'
                }
            ]
        };
        let layout = {};
        let actions = clientActionHelper.getEntitySpecificActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
    });
    it('when the entity does not define client actions', function () {
        let entity = {};
        let layout = {
            clientActions: [
                {
                    name: 'foo'
                }
            ]
        };
        let actions = clientActionHelper.getEntitySpecificActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
    });
    it('when the layout has defines the client actions but it\'s empty', function () {
        let entity = {
            clientActions: [
                {
                    name: 'foo'
                }
            ]
        };
        let layout = {
            clientActions: []
        };
        let actions = clientActionHelper.getEntitySpecificActions(entity, layout);
        assert.equal(actions.length, 0);
    });
    it('when the entity has actions that the layout does not define', function () {
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
        let actions = clientActionHelper.getEntitySpecificActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
    });
    it('when the entity action define properties that the layout does not define', function () {
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
        let actions = clientActionHelper.getEntitySpecificActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
        assert.equal(actions[0].entityProperty, 1);
    });
    it('when the layout action define properties that the layout does not define', function () {
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
        let actions = clientActionHelper.getEntitySpecificActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
        assert.equal(actions[0].layoutProperty, 1);
    });
    it('when the layout action overrides properties', function () {
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
        let actions = clientActionHelper.getEntitySpecificActions(entity, layout);
        assert.equal(actions.length, 1);
        assert.equal(actions[0].name, 'foo');
        assert.equal(actions[0].property, 2);
    });
});