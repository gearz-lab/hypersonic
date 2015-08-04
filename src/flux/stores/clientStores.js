import LoggedUserStore from './LoggedUserStore.js';

let clientStores = {
    loggedUser: LoggedUserStore
};

if(window) {
    window.clientStores = clientStores;
}

export default clientStores;