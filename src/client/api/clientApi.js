import loggedUserClientApi from './LoggedUserClientApi.js';
import mainMenuClientApi from './MainMenuClientApi.js';
import entityClientApi from './EntityClientApi.js';

export default {
    users: loggedUserClientApi,
    mainMenu: mainMenuClientApi,
    currentEntity: entityClientApi
}