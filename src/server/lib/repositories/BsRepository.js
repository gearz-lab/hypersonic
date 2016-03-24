class BsRepository {

    constructor(db, entityName) {
        this.Model = db.getModel(entityName);
    }

    /**
     * Creates an object
     * @param object
     */
    insert(object) {
        if (!object) throw Error('\'object\' should be truthy');
        return new Promise((f, r) => {
            return this.Model.forge(object)
                .save()
                .then((m) => {
                    f(m.toJSON());
                })
                .catch((ex) => {
                    r(ex);
                });
        });
    }

    /**
     * Updates a given object
     * @param object
     */
    update(object) {
        if (!object) throw Error('\'object\' should be truthy');
        return new Promise((f, r) => {
            return this.Model.forge({id: object.id})
                .save(object)
                .then(m => {
                    f(m.toJSON());
                })
                .catch(ex => {
                    r(ex);
                });
        });
    }

    /**
     * Finds a user by id
     * @param id
     */
    find(id) {
        if (!id) throw Error('\'id\' should be truthy');
        return new Promise((f, r) => {
            this.Model.forge({id: id})
                .fetch()
                .then(m => {
                    f(m.toJSON());
                })
                .catch(ex => {
                    r(ex);
                })
        });
    }

    /**
     * Finds a user by the google id
     * @param connection
     * @param filter
     * @param next
     */
    filter(filter) {
        return this.Model.forge(filter).fetchAll();
    }

    /**
     * Returns all entities
     * @param connection
     * @param next
     */
    list(connection, next):void {
        return this.Model.fetchAll();
    }
}

export default BsRepository;