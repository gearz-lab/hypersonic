import LoggedUserStore from './LoggedUserStore.js';
import MainMenuStore from './MainMenuStore.js';

let clientStores = {
    loggedUser: LoggedUserStore,
    mainMenu: MainMenuStore
};

if(window) {
    window.clientStores = clientStores;
}

export default clientStores;