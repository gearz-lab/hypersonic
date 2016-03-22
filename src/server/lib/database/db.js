import buildKnex from 'knex';
import buildBookshelf from 'bookshelf';

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

        // create bookshelf models;
        this.models = {};

        // custom models
        if(appConfig.entities) {
            for(let i = 0; i < appConfig.entities.length; i++) {
                let entity = appConfig.entities[i];
                this.models[entity.name] = this.bookshelf.Model.extend({
                    tableName: entity.tableName ? entity.tableName : entity.name
                });
            }
        }

        // system models
        this.models['user'] =  this.bookshelf.Model.extend({
            tableName: 'user'
        });
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
     * Destroys the knex instance and its connection pool
     */
    destroy() {
        this.knex.destroy();
    }
}