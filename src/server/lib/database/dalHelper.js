import dbHelper from './dbHelper';
import BaseDal from '../dal/BaseDal';

class DalHelper {

    /**
     * Returns a DAL for the given entityName
     * @param dbName
     * @param entityName
     * @returns {BaseDal}
     */
    getDalForEntity(dbName, entityName) {
        return new BaseDal({
            dbName: dbName,
            tableName: entityName
        });
    }
}

export default new DalHelper();