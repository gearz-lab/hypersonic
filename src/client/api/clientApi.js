import loggedUserClientApi from './LoggedUserClientApi.js';
import mainMenuClientApi from './MainMenuClientApi.js';
import applicationDomainClientApi from './ApplicationDomainClientApi.js';
import entityClientApi from './EntityClientApi.js';

export default {
    users: loggedUserClientApi,
    mainMenu: mainMenuClientApi,
    applicationDomain: applicationDomainClientApi,
    currentEntity: entityClientApi
}