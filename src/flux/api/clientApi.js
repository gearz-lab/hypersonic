import loggedUserClientApi from './LoggedUserClientApi.js';
import mainMenuClientApi from './MainMenuClientApi.js';
import applicationDomainClientApi from './ApplicationDomainClientApi.js';
import entityClientApi from './EntityClientApi.js';

class ClientApi{
    constructor() {
        this.users = loggedUserClientApi;
        this.mainMenu = mainMenuClientApi;
        this.applicationDomain = applicationDomainClientApi;
        this.currentEntity = entityClientApi;
    }
}

let clientApi = new ClientApi();

if(window) {
    window.clientApi = clientApi;
}

export default clientApi;
