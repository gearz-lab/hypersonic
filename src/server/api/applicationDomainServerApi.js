export default {
    setup(router, appConfig, db) {
        if (!router) throw Error('\'router\' should be truthy');
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        if (!db) throw Error('\'db\' should be truthy');

        // routes
        router.route('/applicationdomain/load').get(function (req, res) {
            try {
                let result = {
                    entities: appConfig.entities
                };
                res.send(result);
            }
            catch(ex) {
                res.status(500).send(ex.toString());
            }
        });
    }
}