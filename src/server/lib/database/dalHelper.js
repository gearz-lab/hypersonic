import dbHelper from './dbHelper';
import Repository from '../repositories/Repository';

class DalHelper {

    /**
     * Returns a DAL for the given entityName
     * @param dbName
     * @param entityName
     * @returns {Repository}
     */
    getDalForEntity(dbName, entityName) {
        return new Repository({
            dbName: dbName,
            tableName: entityName
        });
    }
}

export default new DalHelper();