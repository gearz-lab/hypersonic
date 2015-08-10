var BaseStore = require('./baseStore');
var LoggedUserConstants = require('../actions/LoggedUserConstants');

class LoggedUserStore extends BaseStore {
    constructor() {
        let handlers = {};
        handlers[LoggedUserConstants.LOAD_LOGGED_SUCCESS] = (action) => {
            this.loggedUser = action.data;
            this.emitChange();
        };
        super(handlers);
    }

    getLoggedUser() {
        return this.loggedUser;
    }
}

export default new LoggedUserStore();