import Actions from './Actions.js';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import MainMenuConstants from './MainMenuConstants.js';
import clientApi from '../api/clientApi.js';

class MainMenuActions extends Actions {

    /**
     * Loads the current logged user
     */
    loadMainMenu() {

        this.load({
            loadAction: MainMenuConstants.LOAD_MAIN_MENU,
            failAction: MainMenuConstants.LOAD_MAIN_MENU_FAILED,
            successAction: MainMenuConstants.LOAD_MAIN_MENU_SUCCESS,
            clientApiFunction: clientApi.mainMenu.load
        });

    }
}

export default new MainMenuActions();