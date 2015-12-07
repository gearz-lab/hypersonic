import Repository from './Repository';
import EntityRepository from './EntityRepository';
import UserRepository from './UserRepository';

class RepositoryProvider {
    constructor() {
        this.repositories = {};
    }

    /**
     * Registers a repository type for the given entity name
     * DO NOT REGISTER GENERIC REPOSITORIES here. All registered repositories are expected to have a constructor with
     * a single argument which is the database name
     * @param entityName
     * @param repository
     */
    register(entityName, repository) {
        this.repositories[entityName] = repository;
    }

    /**
     * Gets a repository for the given dbName and entityName
     * If a specific repository for the given entityName cannot be found, a generic one will be created
     * @param dbName
     * @param entityName
     * @returns {*}
     */
    getRepository(dbName, entityName) {
        if(!this.repositories.hasOwnProperty(entityName)) {
            return new Repository({
                dbName: dbName,
                tableName: entityName
            });
        }
        let RepositoryType = this.repositories[entityName];
        return new RepositoryType(dbName);
    }
}

let repositoryProvider = new RepositoryProvider();
repositoryProvider.register('entity', EntityRepository);
repositoryProvider.register('user', UserRepository);

export default repositoryProvider;