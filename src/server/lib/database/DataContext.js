import buildKnex from 'knex';
import Repository from '../repositories/Repository';
import UserRepository from '../repositories/UserRepository';
import massive from 'massive';
import Promise from 'bluebird';

export default class DataContext {

    /**
     *
     * @param appConfig
     * @param knex
     * @param massiveInstance
     */
    constructor(appConfig, knex, massiveInstance) {
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        this.appConfig = appConfig;

        // building knex and bookshelf
        this.knex = knex || buildKnex({
            client: 'pg',
            connection: this.appConfig.connectionString
        });

        this.db = massiveInstance || massive.connectSync({connectionString : this.appConfig.connectionString});
        this.db = Promise.promisifyAll(db);

        // create bookshelf models and services
        this.models = {};
        this.services = {};

        // custom models
        if(appConfig.entities) {
            for(let i = 0; i < appConfig.entities.length; i++) {
                let entity = appConfig.entities[i];
                this.models[entity.name] = this.db[entity.name];
                this.services[entity.name] = new Repository(this.appConfig, this, entity);
            }
        }

        // system models and services
        this.models['user'] =  this.db.user;
        this.services['user'] = new UserRepository(this.appConfig, this);
    }

    /**
     * Returns the given bookshelf model
     * @param modelName
     * @returns {*}
     */
    getModel(modelName) {
        if (!modelName) throw Error('\'modelName\' should be truthy');
        if(!this.models.hasOwnProperty(modelName))
            throw Error('model name is invalid');
        return this.models[modelName];
    }

    /**
     * Gets the knex instance
     * @returns {*}
     */
    getKnex() {
        return this.knex;
    }

    /**
     * Returns the given repository
     * @param modelName
     * @returns {*}
     */
    getRepository(modelName) {
        if (!modelName) throw Error('\'modelName\' should be truthy');
        if(!this.services.hasOwnProperty(modelName))
            throw Error('model name is invalid');
        return this.services[modelName];
    }

    /**
     * Destroys the knex instance and its connection pool
     */
    destroy() {
        this.knex.destroy();
    }
}