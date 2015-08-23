import Actions from './Actions.js';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import CurrentEntitiesConstants from './CurrentEntityConstants.js';
import clientApi from '../api/clientApi.js';

class CurrentEntityActions extends Actions {

    /**
     * Loads an entity
     */
    load(entityType, entityId) {

        this.trigger({
            loadAction: CurrentEntitiesConstants.LOAD_ENTITY,
            failAction: CurrentEntitiesConstants.LOAD_ENTITY_FAIL,
            successAction: CurrentEntitiesConstants.LOAD_ENTITY_SUCCESS,
            clientApiFunction: (next) => clientApi.currentEntity.loadEntity(entityType, entityId, next)
        });

    }

    /**
     * Saves an entity
     * @param entityType
     * @param entityId
     * @param entity
     */
    save(entityType, entityId, entity, next) {

        clientApi.currentEntity.save(entityType, entityId, entity, (error, data) => {
            if(error) {
                next(error);
            }
            else {
                AppDispatcher.dispatch({
                    actionType: CurrentEntitiesConstants.SAVE_ENTITY_SUCCESS,
                    data: data
                });
            }
        });

    }
}

export default new CurrentEntityActions();