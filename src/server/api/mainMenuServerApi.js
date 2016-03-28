import menuDataBuilder from '../lib/menuDataBuilder';

export default {
    setup(router:any, appConfig, db):void {
        if (!router) throw Error('\'router\' should be truthy');
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        if (!db) throw Error('\'db\' should be truthy');

        // routes
        router.route('/mainmenu/load').get(function (req, res) {
            try {
                let menuData = menuDataBuilder.getMenuData(appConfig.entities);
                res.send(menuData);
            }
            catch(ex) {
                res.status(500).send(ex.toString());
            }
        });

    }
}