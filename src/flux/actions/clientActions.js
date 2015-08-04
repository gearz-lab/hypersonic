import LoggedUserActions from './LoggedUserActions.js';

let clientActions = {
    loggedUser: LoggedUserActions
};

if(window) {
    window.clientActions = clientActions;
}

export default clientActions;