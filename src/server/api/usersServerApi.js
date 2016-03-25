import UserDal from '../lib/repositories/UserRepository.js';
let users = new UserDal();

export default {
    setup(router, appConfig, db) {
        if (!router) throw Error('\'router\' should be truthy');
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        if (!db) throw Error('\'db\' should be truthy');

        // routes

        router.route('/users/loggeduser').get(function(req, res) {
            res.send(req.user);
        });

        router.route('/users/:id').get(function(req, res) {
            let userId = req.params.id;
            db.connect((error, connection) => {
                users.find(connection, userId, (error, user) => {
                    connection.close();
                    if(error) {
                        throw error;
                    }
                    res.send(user);
                });
            });
        });

    }
}