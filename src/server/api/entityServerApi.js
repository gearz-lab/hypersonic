import {LAYOUT} from '../lib/repositories/Repository';

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

                repo.load({id: entityId})
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

                repo.save(entity, null, LAYOUT)
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
            try {
                let entityName = req.params.entity;
                let criteria = req.query.q;
                let page = req.query.p;

                let repo = db.getRepository(entityName);
                if (!repo) throw Error(`Could not find entity. Entity name: ${entityName}`);

                repo.search(criteria, page, null, LAYOUT)
                    .then(r => res.send({status: 'success', result: r}))
                    .catch(ex => {
                        res.status(500).send(ex.toString());
                    });
            }
            catch (ex) {
                res.status(500).send(ex.toString());
            }
        });

        router.route('/entity/:entity/delete').delete((req, res) => {
            try {
                let entityName = req.params.entity;
                let idsString = req.query.ids;
                let ids = idsString.split(',').map(x => Number(x));

                let repo = db.getRepository(entityName);
                if (!repo) throw Error(`Could not find entity. Entity name: ${entityName}`);

                repo.delete(ids)
                    .then(r => res.send({status: 'success', result: r}))
                    .catch(ex => {
                        res.status(500).send(ex.toString());
                    });
            }
            catch (ex) {
                res.status(500).send(ex.toString());
            }
        });

    }
}

export default new EntityServerApi();