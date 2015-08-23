import Actions from './Actions.js';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import CurrentEntitiesConstants from './CurrentEntityConstants.js';
import clientApi from '../api/clientApi.js';

class CurrentEntityActions extends Actions {

    /**
     * Loads an entity
     */
    load(entityName, entityId) {

        // dispatches the load action
        AppDispatcher.dispatch({
            actionType: CurrentEntitiesConstants.LOAD_ENTITY
        });

        // calls the client API passing the callback above
        clientApi.currentEntity.load(entityName, entityId, (error, data) => {
            if(error) {
                throw error;
            }
            else {
                AppDispatcher.dispatch({
                    actionType: CurrentEntitiesConstants.LOAD_ENTITY_SUCCESS,
                    data: data
                });
            }
        });
    }


    /**
     * Saves an entity
     * @param entityName
     * @param entity
     */
    save(entityName, entity) {

        AppDispatcher.dispatch({
            actionType: CurrentEntitiesConstants.SAVE_ENTITY
        });

        clientApi.currentEntity.save(entityName, entity, (error, data) => {

            if (error) {
                throw error;
            }

            if (data.status == 'success') {
                // in this case
                AppDispatcher.dispatch({
                    actionType: CurrentEntitiesConstants.SAVE_ENTITY_SUCCESS,
                    data: {
                        entity: entity,
                        generatedKey: data.generatedKey,
                        validationErrors: {}
                    }
                });
            } else {
                AppDispatcher.dispatch({
                    actionType: CurrentEntitiesConstants.SAVE_ENTITY_FAIL,
                    data: {
                        entity: entity,
                        generatedKey: undefined,
                        validationErrors: data.validationErrors
                    }
                });
            }

        });

    }
}

export default new CurrentEntityActions();