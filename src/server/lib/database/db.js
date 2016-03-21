import buildKnex from 'knex';
import buildBookshelf from 'bookshelf';

export default class Db {
    constructor(appConfig) {
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        this.appConfig = appConfig;

        // building knex and bookshelf
        this.knex = this.appConfig.knex ? this.appConfig.knex : buildKnex({
            client: 'pg',
            connection: this.appConfig.connectionString
        });
        this.bookshelf = buildBookshelf(this.knex);

        // create bookshelf models;
        this.models = {};
        for(let i = 0; i < appConfig.entities.length; i++) {
            let entity = appConfig.entities[i];
            this.models[entity.name] = this.bookshelf.Model.extend({
                tableName: entity.tableName ? entity.tableName : entity.name
            });
        }
    }
}