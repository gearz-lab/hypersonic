import dbHelper from './dbHelper';
import BaseDal from '../dal/BaseDal';

class DalHelper {
    /**
     * Returns a DAL for the given entityName
     * @param user
     * @param entityName
     * @returns {BaseDal}
     */
    getDalForEntity(user, entityName ) {
        let dbName = dbHelper.getCustomerDbName(user);
        return new BaseDal({
            dbName: dbName,
            tableName: entityName
        });
    }
}

export default new DalHelper();