import Actions from './Actions.js';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import CurrentEntitiesConstants from './CurrentEntityConstants.js';
import clientApi from '../api/clientApi.js';

class CurrentEntityActions extends Actions {

    /**
     * Loads the current logged user
     */
    loadEntity(entityType, entityId) {

        this.trigger({
            loadAction: CurrentEntitiesConstants.LOAD_LOGGED_USER,
            failAction: CurrentEntitiesConstants.LOAD_LOGGED_FAIL,
            successAction: CurrentEntitiesConstants.LOAD_LOGGED_SUCCESS,
            clientApiFunction: (next) => clientApi.entity.load(entityType, entityId, next)
        });

    }
}

export default new CurrentEntityActions();