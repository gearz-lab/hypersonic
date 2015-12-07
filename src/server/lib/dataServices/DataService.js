import repositories from '../repositories/repositoryProvider';

/**
 * Represents a data layer for a particular enttiy that is going to take the pipeline and middleware into account
 */
class DataService {

    constructor(options) {

        // default pipelines
        //let pipelines = {
        //    "new-get",
        //    "edit-get",
        //    "edit-post",
        //    "view-get",
        //    "pre-search-get",
        //    "search-get",
        //    "search-results-get"
        //};

        // options should include: dbName and tableName
        if (!options) throw Error('\'options\' should be truthy');
        if (!options.tableName) throw Error('\'options.tableName\' should be truthy');
        this.options = options;
        this.repository = this.options.repository ? this.options.repository : repositories.getRepository(this.options.dbName, options.tableName);
    }

    /**
     * Loads the entity for the given id
     * @param connection
     * @param id
     * @param next
     */
    load(connection, id, next) {
        if (!id) throw Error('\'id\' should be truthy');
        this.repository.find(connection, id, (error, entity) => {
            next(error, entity);
        });
    }

    /**
     * Saves the given entity
     * @param connection
     * @param entity
     * @param next
     */
    save(connection, entity, next) {
        if (!entity) throw Error('\'entity\' should be truthy');
        if(!entity.id) {
            this.repository.insert(connection, entity, (error, result) => {
               next(error, result);
            });
        }
        else {
            this.repository.update(connection, entity.id, entity, (error, result) => {
                next(error, result);
            });
        }
    }
}

export default DataService;