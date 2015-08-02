import AppDispatcher from '../dispatchers/AppDispatcher.js';
import LoggedUserConstants from './LoggedUserConstants.js';
import clientApi from '../api/clientApi.js';

class LoggedUserAction {

    /**
     * Loads the current logged user
     */
    loadLoggedUser() {
        AppDispatcher.dispatch({
           actionType: LoggedUserConstants.LOAD_LOGGED_USER
        });
    }
}

export default new LoggedUserAction();