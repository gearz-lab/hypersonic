import users from './LoggedUserClientApi.js';
import mainMenu from './MainMenuClientApi.js';
import applicationDomain from './ApplicationDomainClientApi.js';

class ClientApi{
    constructor() {
        this.users = users;
        this.mainMenu = mainMenu;
        this.applicationDomain = applicationDomain;
    }
}

let clientApi = new ClientApi();

if(window) {
    window.clientApi = clientApi;
}

export default clientApi;
