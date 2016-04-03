import _ from 'underscore';

export const LAYOUT = 2;
export const ENTITY = 1;
export const BASE = 0;


var defaultHandlers = {

    // default functions
    save: function (object, layoutName, context) {
        if (!object) throw Error('\'object\' should be truthy');

        let forgeObject = object.id ? {id: object.id} : {};
        return new Promise((f, r) => {
            context.model.forge(forgeObject)
                .save(object)
                .then(m => f(m.toJSON()))
                .catch(r);
        });
    },

    load: function (object, layoutName, context) {
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

    delete: function (object, layoutName, context) {
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

    search: function (criteria, page, layoutName, context) {
        throw Error('The BASE search handler is still not implemented. Please implement the search handler on the Entity or on the Layout');
    }
};

class Helpers {
    constructor(context) {
        if (!context) throw Error('\'context\' should be truthy');
        this.context = context;
    }

    paginate(whereFunction, page) {
        if (!whereFunction) throw Error('\'whereFunction\' should be truthy');
        if (!page) throw Error('\'page\' should be truthy');

        let modifiers = {where: whereFunction, limit: this.context.appConfig.data.pageSize, offset: (page - 1) * this.context.appConfig.data.pageSize};
        return new Promise((f, r) => {
            let tableName = this.context.entity.tableName ? this.context.entity.tableName : this.context.entity.name;
            Promise.all([this.context.knex.table(tableName).where(modifiers.where).count('*'), this.context.model.query(modifiers).fetchAll()])
                .then(result => {
                    let count = result[0][0].count;
                    let rows = result[1].toJSON();
                    let pages = Math.ceil(count / this.context.appConfig.data.pageSize);
                    f({count, pages, rows});
                })
                .catch(r);
        });
    }
}

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

        this.helpers = new Helpers(this.getContext());
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
        switch (level) {
            case LAYOUT:
                if (layoutName) {
                    let layout = _.find(this.entity.layouts, l => l.name == layoutName);
                    if (layout) {
                        handler = layout[handlerName];
                        if (handler) return handler;
                    }
                }
                if (strict) throw Error('Could not find the given handler');
            case ENTITY:
                // let's try to find the handler on the entity
                handler = this.entity[handlerName];
                if (handler) return handler;
                if (strict) throw Error('Could not find the given handler');
            case BASE:
                handler = defaultHandlers[handlerName];
                if (!handler) throw Error(`Handler could not be found. Handler name: ${handlerName}`);
                return handler;
        }
    }

    /**
     * Gets the context object passed to handlers
     * @returns {{repository: Repository, model: Model, db: *}}
     */
    getContext() {
        return {
            appConfig: this.appConfig,
            repository: this,
            db: this.db,
            model: this.model, // the bookshelf Model type
            knex: this.knex,
            entity: this.entity
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
        return handler(object, layoutName, this.getContext());
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
        return handler(object, layoutName, this.getContext());
    }

    /**
     * Searches by the given criteria
     * @param criteria
     * @param page
     * @param layoutName
     * @param level
     * @returns {Promise}
     */
    search(criteria, page = 1, layoutName = undefined, level = BASE) {
        let handler = this.findHandler('search', layoutName, level);
        return handler(criteria, page, layoutName, this.getContext());
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
        return handler(object, layoutName, this.getContext());
    }
}

export default Repository;