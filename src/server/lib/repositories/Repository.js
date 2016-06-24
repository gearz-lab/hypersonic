import Promise from 'bluebird';
import _ from 'underscore';

export const LAYOUT = 2;
export const ENTITY = 1;
export const BASE = 0;


var defaultHandlers = {

    // default functions
    save: function (object, layoutName, context) {
        if (!object) throw Error('\'object\' should be truthy');

        return context.dataContext.db[context.entity.name].saveAsync(object);
    },

    load: function (id, layoutName, context) {
        if (!id) throw Error('\'id\' should be truthy');
        if (isNaN(id)) throw Error('\'id\' should be a number');

        return context.dataContext.db[context.entity.name].findAsync(id);
    },

    delete: function (ids, layoutName, context) {
        if (!ids) throw Error('\'ids\' should be truthy');
        if (!_.isArray(ids) || !ids.length) throw Error('\'ids\' should be a not empty array');

        let promises = ids.map(id => context.dataContext.db[context.entity.name].destroyAsync({id}));
        return Promise.all(promises);
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

    paginate(where, page) {
        if (!where) throw Error('\'whereFunction\' should be truthy');
        if (!page) throw Error('\'page\' should be truthy');

        let queryOptions = {
            limit: this.context.appConfig.data.pageSize,
            offset: (page - 1) * this.context.appConfig.data.pageSize
        };

        let tableName = this.context.entity.tableName || this.context.entity.name;

        return Promise.all([
            this.context.dataContext.db[tableName].countAsync(where),
            this.context.dataContext.db[tableName].findAsync(where, queryOptions)
        ])
            .then(result => {
                let count = result[0][0].count;
                let rows = result[1];
                let pages = Math.ceil(count / this.context.appConfig.data.pageSize);
                return {count, pages, rows};
            });
    }
}

class Repository {

    constructor(appConfig, dataContext, entity) {
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        if (!dataContext) throw Error('\'dataContext\' should be truthy');
        if (!entity) throw Error('\'entity\' should be truthy');

        this.appConfig = appConfig;
        this.dataContext = dataContext;
        this.entity = entity;
        this.model = dataContext.getModel(entity.name);
        this.knex = dataContext.getKnex();

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
                break;
            case ENTITY:
                // let's try to find the handler on the entity
                handler = this.entity[handlerName];
                if (handler) return handler;
                if (strict) throw Error('Could not find the given handler');
                break;
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
            dataContext: this.dataContext,
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
     * @param ids
     * @param layoutName
     * @param level
     * @returns {Promise}
     */
    delete(ids, layoutName = undefined, level = BASE) {
        if (!ids) throw Error('\'ids\' should be truthy');

        let handler = this.findHandler('delete', layoutName, level);
        return handler(ids, layoutName, this.getContext());
    }
}

export default Repository;