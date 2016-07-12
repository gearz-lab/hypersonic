import Promise from 'bluebird';
import _ from 'underscore';
import defaultHandlers from './defaultHandlers';
import RepositoryHelper from './RepositoryHelper';

export const LAYOUT = 2;
export const ENTITY = 1;
export const BASE = 0;

/**
 * The repository class, responsible for during SCRUD operations over entities 
 * @class Repository
 */
class Repository {

    constructor(appConfig, dataContext, entity) {
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        if (!dataContext) throw Error('\'dataContext\' should be truthy');
        if (!entity) throw Error('\'entity\' should be truthy');

        this.appConfig = appConfig;
        this.dataContext = dataContext;
        this.entity = entity;
        this.model = dataContext.getModel(entity.name);

        this.helpers = new RepositoryHelper(this.getContext());
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
            // intentional fall-through. DO NOT BREAK;
            case ENTITY:
                // let's try to find the handler on the entity
                handler = this.entity[handlerName];
                if (handler) return handler;
                if (strict) throw Error('Could not find the given handler');
            // intentional fall-through. DO NOT BREAK;
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
        if (!handler || !_.isFunction(handler)) throw Error(`Could not find the appropriate handler. Entity name: ${this.entity.name}. Handler type: ${'save'}. Layout name: ${layoutName}. Level: ${level} `);
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
        if (!handler || !_.isFunction(handler)) throw Error(`Could not find the appropriate handler. Entity name: ${this.entity.name}. Handler type: ${'load'}. Layout name: ${layoutName}. Level: ${level} `);
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
        if (!handler || !_.isFunction(handler)) throw Error(`Could not find the appropriate handler. Entity name: ${this.entity.name}. Handler type: ${'search'}. Layout name: ${layoutName}. Level: ${level} `);
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
        if (!handler || !_.isFunction(handler)) throw Error(`Could not find the appropriate handler. Entity name: ${this.entity.name}. Handler type: ${'delete'}. Layout name: ${layoutName}. Level: ${level} `);
        return handler(ids, layoutName, this.getContext());
    }
}

export default Repository;