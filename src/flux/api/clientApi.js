import users from './UserApi.js';
import mainMenu from './MainMenuApi.js';

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
