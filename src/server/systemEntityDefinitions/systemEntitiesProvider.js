import entity from './entity';
import field from './field';

class SystemEntitiesProvider {

    constructor() {
        this.entities = [];
    }

    /**
     * Entity to be added
     * @param entity
     */
    add(entity) {
        this.entities.push(entity);
    }

    getEntities() {
        return this.entities;
    }
}

let systemEntitiesProvider = new SystemEntitiesProvider();
systemEntitiesProvider.add(entity);
systemEntitiesProvider.add(field);

export default systemEntitiesProvider;