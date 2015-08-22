import Actions from './Actions.js';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import LoggedUserConstants from './LoggedUserConstants.js';
import clientApi from '../api/clientApi.js';

class LoggedUserActions extends Actions {

    /**
     * Loads the current logged user
     */
    loadLoggedUser() {

        this.trigger({
            loadAction: LoggedUserConstants.LOAD_LOGGED_USER,
            failAction: LoggedUserConstants.LOAD_LOGGED_FAIL,
            successAction: LoggedUserConstants.LOAD_LOGGED_SUCCESS,
            clientApiFunction: clientApi.users.getLoggedUser
        });

    }
}

export default new LoggedUserActions();