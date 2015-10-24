var BaseStore = require('./baseStore');
var LoggedUserConstants = require('../actions/LoggedUserConstants');

class LoggedUserStore extends BaseStore {
    constructor() {
        super();
        let handlers = {};
        var _this = this;
        handlers[LoggedUserConstants.LOAD_LOGGED_SUCCESS] = (action) => {
            _this.loggedUser = action.data;
            _this.emitChange();
        };
        this.initialize(handlers);
    }

    getLoggedUser() {
        return this.loggedUser;
    }
}

export default new LoggedUserStore();