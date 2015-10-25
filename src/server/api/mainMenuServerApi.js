/* @flow */

import EntityDal from '../lib/dal/EntityDalFlow';
import db from '../lib/database/dbHelper.js';
import rc from '../lib/database/constants';
import menuDataBuilder from '../lib/menuDataBuilder';

export default {
    setup(router:any):void {

        // routes

        router.route('/mainmenu/load').get(function (req:ExpressRequest, res:ExpressResponse) {

            let entities = new EntityDal(rc.DB_DEFAULT);
            db.connect((error, connection) => {
                // find(connection, tableName, id, next) {
                entities.filter(connection, {system: true, firstClass:true}, (error, entities) => {
                    if (error) {
                        throw error;
                    }
                    let menuData = menuDataBuilder.getMenuData(entities);
                    res.send(menuData);
                });
            });
        });

    }
}