import LoggedUserActions from './LoggedUserActions.js';
import MainMenuActions from './MainMenuActions.js';
import ApplicationDomainActions from './ApplicationDomainActions.js';
import CurrentEntityActions from './CurrentEntityActions.js';
import RouterActions from './RouterActions.js';

let clientActions = {
    loggedUser: LoggedUserActions,
    mainMenu: MainMenuActions,
    applicationDomain: ApplicationDomainActions,
    currentEntity: CurrentEntityActions,
    router: RouterActions
};

if(window) {
    window.clientActions = clientActions;
}

export default clientActions;