import _ from 'underscore';

export const LAYOUT = 2;
export const ENTITY = 1;
export const BASE = 0;


var defaultHandlers = {

    // default functions
    save: function(object, layoutName, context) {
        if (!object) throw Error('\'object\' should be truthy');

        let forgeObject = object.id ? {id: object.id} : {};
        return new Promise((f, r) => {
            context.model.forge(forgeObject)
                .save(object)
                .then(m => f(m.toJSON()))
                .catch(r);
        });
    },

    load: function(object, layoutName, context) {
        if (!object) throw Error('\'id\' should be truthy');

        // if the given object is a number, it's assumed to be an id. Otherwise, it's assumed to be an "example" object
        let objectToFind = isNaN(object) ? object : {id: object};

        return new Promise((f, r) => {
            context.model.forge(objectToFind)
                .fetch()
                .then(m => f(m ? m.toJSON() : null))
                .catch(r);
        });
    },

    delete: function(object, layoutName, context) {
        if (!object) throw Error('\'id\' should be truthy');

        // if the given object is a number, it's assumed to be an id. Otherwise, it's assumed to be an "example" object
        let objectToFind = isNaN(object) ? object : {id: object};

        return new Promise((f, r) => {
            context.model.forge(objectToFind)
                .destroy()
                .then(() => f())
                .catch(r);
        });
    },

    search: function(criteria, layoutName, context) {
        throw Error('The BASE search handler is still not implemented. Please implement the search handler on the Entity or on the Layout');
    }
};

class Repository {

    constructor(appConfig, db, entity) {
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        if (!db) throw Error('\'db\' should be truthy');
        if (!entity) throw Error('\'entity\' should be truthy');

        this.appConfig = appConfig;
        this.db = db;
        this.entity = entity;
        this.model = db.getModel(entity.name);
        this.knex = db.getKnex();
    }

    /**
     * Tries to find the given handler (save, validateSave, delete, validateDelete...) at the given level.
     * If the level is LAYOUT and the handler is not found, the handler at the ENTITY level is returned.
     * If no handler is found, undefined is returned and the caller should use the BASE level
     * @param handlerName
     * @param layoutName
     * @param level
     * @param strict
     * @returns {function}
     */
    findHandler(handlerName, layoutName = undefined, level = BASE, strict = false) {
        if (!handlerName) throw Error('\'handlerName\' should be truthy');
        if (isNaN(level)) throw Error('level must be a number');

        let handler = undefined;
        switch(level) {
            case LAYOUT:
                if(layoutName) {
                    let layout = _.find(this.entity.layouts, l => l.name == layoutName);
                    if(layout) {
                        handler = layout[handlerName];
                        if(handler) return handler;
                    }
                }
                if(strict) throw Error('Could not find the given handler');
            case ENTITY:
                // let's try to find the handler on the entity
                handler = this.entity[handlerName];
                if(handler) return handler;
                if(strict) throw Error('Could not find the given handler');
            case BASE:
                handler = defaultHandlers[handlerName];
                if(!handler) throw Error(`Handler could not be found. Handler name: ${handlerName}`);
                return handler;
        }
    }

    /**
     * Gets the context object passed to handlers
     * @returns {{repository: Repository, model: Model, db: *}}
     */
    getHandlerContext() {
        return {
            repository: this,
            db: this.db,
            model: this.model, // the bookshelf Model type
            knex: this.knex
        }
    }

    /**
     * Creates an object
     * @param object
     * @param layoutName
     * @param level
     * @returns {Promise}
     */
    save(object, layoutName = undefined, level = BASE) {
        if (!object) throw Error('\'object\' should be truthy');

        let handler = this.findHandler('save', layoutName, level);
        return handler(object, layoutName, this.getHandlerContext());
    }

    /**
     * Finds a user by id
     * @param object
     * @param layoutName
     * @param level
     * @returns {Promise}
     */
    load(object, layoutName = undefined, level = BASE) {
        if (!object) throw Error('\'object\' should be truthy');

        let handler = this.findHandler('load', layoutName, level);
        return handler(object, layoutName, this.getHandlerContext());
    }

    /**
     * Searches by the given criteria
     * @param object
     * @param layoutName
     * @param level
     * @returns {Promise}
     */
    search(criteria, layoutName = undefined, level = BASE) {
        let handler = this.findHandler('search', layoutName, level);
        return handler(criteria, layoutName, this.getHandlerContext());
    }

    /**
     * Deletes the given object
     * @param object
     * @param layoutName
     * @param level
     * @returns {Promise}
     */
    delete(object, layoutName = undefined, level = BASE) {
        if (!object) throw Error('\'object\' should be truthy');

        let handler = this.findHandler('delete', layoutName, level);
        return handler(object, layoutName, this.getHandlerContext());
    }
}

export default Repository;