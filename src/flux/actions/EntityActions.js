import Actions from './Actions.js';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import EntityConstants from './EntityConstants.js';
import clientApi from '../api/clientApi.js';

class EntityActions extends Actions {

    /**
     * Saves the given entity
     * @param entityName
     * @param entity
     */
    saveEntity(entityName, entity) {
        this.trigger({
            loadAction: EntityConstants.LOAD_ENTITY,
            failAction: EntityConstants.LOAD_ENTITY_FAILED,
            successAction: EntityConstants.LOAD_ENTITY_SUCCESS,
            clientApiFunction: (next) => clientApi.entity.save(entityName, entity, next)
        });
    }

    /**
     * Loads the given entity
     */
    loadEntity(entityName, entityId) {

        this.trigger({
            loadAction: EntityConstants.LOAD_ENTITY,
            failAction: EntityConstants.LOAD_ENTITY_FAILED,
            successAction: EntityConstants.LOAD_ENTITY_SUCCESS,
            clientApiFunction: (next) => clientApi.entity.load(entityName, entityId, next)
        });

    }
}

export default new EntityActions();