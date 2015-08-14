import LoggedUserActions from './LoggedUserActions.js';
import MainMenuActions from './MainMenuActions.js';
import ApplicationDomainActions from './ApplicationDomainActions.js';

let clientActions = {
    loggedUser: LoggedUserActions,
    mainMenu: MainMenuActions,
    applicationDomain: ApplicationDomainActions
};

if(window) {
    window.clientActions = clientActions;
}

export default clientActions;