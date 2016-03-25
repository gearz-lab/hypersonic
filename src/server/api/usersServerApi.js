export default {
    setup(router, appConfig, db) {
        if (!router) throw Error('\'router\' should be truthy');
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        if (!db) throw Error('\'db\' should be truthy');

        router.route('/users/loggeduser').get(function(req, res) {
            res.send(req.user);
        });
    }
}