import users from './UserApi.js';

class ClientApi{
    constructor() {
        this.users = users;
    }
}

let clientApi = new ClientApi();

if(window) {
    window.clientApi = clientApi;
}

export default clientApi;
