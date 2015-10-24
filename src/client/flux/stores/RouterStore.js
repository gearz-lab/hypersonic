var BaseStore = require('./baseStore');
var RouterConstants = require('../actions/RouterConstants');

class RouterStore extends BaseStore {

    constructor() {
        super();
        let handlers = {};
        var _this = this;
        handlers[RouterConstants.CHANGE_ROUTE] = (action) => {
            _this.state = action.state;
            _this.emitChange();
        };
        this.initialize(handlers);
    }

    getState() {
        return this.state;
    }
}

export default new RouterStore();