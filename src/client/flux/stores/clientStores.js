import LoggedUserStore from './LoggedUserStore.js';
import MainMenuStore from './MainMenuStore.js';
import ApplicationDomainStore from './ApplicationDomainStore.js';
import RouterStore from './RouterStore.js';

let clientStores = {
    loggedUser: LoggedUserStore,
    mainMenu: MainMenuStore,
    applicationDomain: ApplicationDomainStore,
    router: RouterStore
};

if(window) {
    window.clientStores = clientStores;
}

export default clientStores;