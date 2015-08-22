import AppDispatcher from '../dispatchers/AppDispatcher.js';
import RouterConstants from './RouterConstants.js';

class RouterActions extends Actions {

    /**
     * Changes the current route
     */
    changeRoute(state) {
        AppDispatcher.dispatch({
            actionType: RouterConstants.CHANGE_ROUTE,
            state: state
        });
    }
}

export default new RouterActions();