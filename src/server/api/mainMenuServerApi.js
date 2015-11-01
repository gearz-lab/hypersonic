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

                // filter entities that are first class and not _system
                let query = function(d){
                    return d("firstClass").eq(true)
                        .and(d.hasFields("_system").not().or(d("_system").ne(true)))
                }

                entities.filter(connection, query, (error, entities) => {
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