import buildKnex from 'knex';
import Repository from '../repositories/Repository';
import UserRepository from '../repositories/UserRepository';
import {buildMassive} from '../helpers/massiveHelper';
import _ from 'underscore';

export default class DataContext {

    /**
     *
     * @param appConfig
     * @param knex
     * @param massiveInstance
     */
    constructor(appConfig, massiveInstance) {
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        this.appConfig = appConfig;

        this.db = massiveInstance || buildMassive(this.appConfig.connectionString, _.map(appConfig.entities, e => e.name).concat('user'));

        // create bookshelf models and services
        this.models = {};
        this.services = {};

        // custom models
        if (appConfig.entities) {
            for (let i = 0; i < appConfig.entities.length; i++) {
                let entity = appConfig.entities[i];
                this.models[entity.name] = this.db[entity.name];
                this.services[entity.name] = new Repository(this.appConfig, this, entity);
            }
        }

        // system models and services
        this.models['user'] = this.db.user;
        this.services['user'] = new UserRepository(this.appConfig, this);
    }

    /**
     * Returns the given bookshelf model
     * @param modelName
     * @returns {*}
     */
    getModel(modelName) {
        if (!modelName) throw Error('\'modelName\' should be truthy');
        if (!this.models.hasOwnProperty(modelName))
            throw Error('model name is invalid');
        return this.models[modelName];
    }

    /**
     * Returns the given repository
     * @param modelName
     * @returns {*}
     */
    getRepository(modelName) {
        if (!modelName) throw Error('\'modelName\' should be truthy');
        if (!this.services.hasOwnProperty(modelName))
            throw Error('model name is invalid');
        return this.services[modelName];
    }

}