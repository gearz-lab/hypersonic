import LoggedUserStore from './LoggedUserStore.js';
import MainMenuStore from './MainMenuStore.js';
import ApplicationDomainStore from './ApplicationDomainStore.js';

let clientStores = {
    loggedUser: LoggedUserStore,
    mainMenu: MainMenuStore,
    applicationDomain: ApplicationDomainStore
};

if(window) {
    window.clientStores = clientStores;
}

export default clientStores;