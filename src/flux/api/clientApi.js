import users from './LoggedUserClientApi.js';
import mainMenu from './MainMenuClientApi.js';

class ClientApi{
    constructor() {
        this.users = users;
        this.mainMenu = mainMenu;
    }
}

let clientApi = new ClientApi();

if(window) {
    window.clientApi = clientApi;
}

export default clientApi;
