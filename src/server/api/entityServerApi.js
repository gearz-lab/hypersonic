class EntityServerApi {

    setup(router, appConfig, db) {
        if (!router) throw Error('\'router\' should be truthy');
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        if (!db) throw Error('\'db\' should be truthy');

        // get
        router.route('/entity/:entity/get/:id').get(function (req, res) {
            try {
                var entityName = req.params.entity;
                var entityId = req.params.id;

                let repo = db.getRepository(entityName);
                if (!repo) throw Error(`Could not find entity. Entity name: ${entityName}`);

                repo.find({id: entityId})
                    .then(e => res.send({status: 'success', entity: e}))
                    .catch(ex => {
                        res.status(500).send(ex.toString());
                    });
            }
            catch (ex) {
                res.status(500).send(ex.toString());
            }
        });

        // post
        router.route('/entity/:entity/new/').post(function (req, res) {
            try {
                var entityName = req.params.entity;
                var entity = req.body;

                let repo = db.getRepository(entityName);
                if (!repo) throw Error(`Could not find entity. Entity name: ${entityName}`);

                repo.insert(entity)
                    .then(e => res.send({status: 'success', entity: e}))
                    .catch(ex => {
                        res.status(500).send(ex.toString());
                    });
            }
            catch (ex) {
                res.status(500).send(ex.toString());
            }
        });

        // search
        router.route('/entity/:entity/search').get((req, res) => {
            res.send([{}]);
        });

    }
}

export default new EntityServerApi();