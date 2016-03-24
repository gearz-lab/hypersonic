import buildKnex from 'knex';
import buildBookshelf from 'bookshelf';
import Repository from '../repositories/BsRepository';
import UserRepository from '../repositories/BsUserRepository';

export default class Db {
    constructor(appConfig, knex) {
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        this.appConfig = appConfig;

        // building knex and bookshelf
        this.knex = knex ? knex : buildKnex({
            client: 'pg',
            connection: this.appConfig.connectionString
        });
        this.bookshelf = buildBookshelf(this.knex);

        // create bookshelf models and services
        this.models = {};
        this.services = {};
        
        // custom models
        if(appConfig.entities) {
            for(let i = 0; i < appConfig.entities.length; i++) {
                let entity = appConfig.entities[i];
                this.models[entity.name] = this.bookshelf.Model.extend({
                    tableName: entity.tableName ? entity.tableName : entity.name
                });
                this.services[entity.name] = new Repository(this, entity.name);
            }
        }

        // system models and services
        this.models['user'] =  this.bookshelf.Model.extend({
            tableName: 'user'
        });
        this.services['user'] = new UserRepository(this);
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