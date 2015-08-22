import Actions from './Actions.js';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import EntityConstants from './EntityConstants.js';
import clientApi from '../api/clientApi.js';

class EntityActions extends Actions {

    /**
     * Loads the current logged user
     */
    loadEntity() {

        this.load({
            loadAction: EntityConstants.LOAD_ENTITY,
            failAction: EntityConstants.LOAD_ENTITY_FAILED,
            successAction: EntityConstants.LOAD_ENTITY_SUCCESS,
            clientApiFunction: clientApi.entity.load
        });

    }
}

export default new EntityActions();