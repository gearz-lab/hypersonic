import DataService from './DataService';

class DataServiceProvider {
    constructor() {
        this.dataServices = {};
    }

    /**
     * Registers a data service type for the given entity name
     * DO NOT REGISTER GENERIC DATA SERVICES here. All registered repositories are expected to have a constructor with
     * a single argument which is the database name
     * @param entityName
     * @param dataService
     */
    register(entityName, dataService) {
        this.dataServices[entityName] = dataService;
    }

    /**
     * Gets a data service for the given dbName and entityName
     * If a specific repository for the given entityName cannot be found, a generic one will be created
     * @param dbName
     * @param entityName
     * @returns {*}
     */
    getDataService(dbName, entityName) {
        if(!this.dataServices.hasOwnProperty(entityName)) {
            return new DataService({
                dbName: dbName,
                tableName: entityName
            });
        }
        let DataServiceType = this.dataServices[entityName];
        return new DataServiceType(dbName);
    }
}

let dataServiceProvider = new DataServiceProvider();

export default dataServiceProvider;