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
     * @param object
     */
    find(object) {
        if (!object) throw Error('\'id\' should be truthy');

        // if the given object is a number, it's assumed to be an id. Otherwise, it's assumed to be an "example" object
        let objectToFind = isNaN(object) ? object : { id: object };

        return new Promise((f, r) => {
            this.Model.forge(objectToFind)
                .fetch()
                .then(m => {
                    f( m ? m.toJSON() : null);
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