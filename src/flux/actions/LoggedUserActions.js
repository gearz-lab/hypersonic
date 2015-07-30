import AppDispatcher from '../dispatchers/AppDispatcher.js';
import constants from '../constants.js';

class LoggedUserActions {

    /**
     * Loads the logged user
     */
    load() {
        AppDispatcher.dispatch({
            actionType: constants.LOGGED_USER_LOAD
        });
    }
}

export default new LoggedUserActions();