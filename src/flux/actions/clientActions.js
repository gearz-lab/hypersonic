import LoggedUserActions from './LoggedUserActions.js';
import MainMenuActions from './MainMenuActions.js';

let clientActions = {
    loggedUser: LoggedUserActions,
    mainMenu: MainMenuActions
};

if(window) {
    window.clientActions = clientActions;
}

export default clientActions;