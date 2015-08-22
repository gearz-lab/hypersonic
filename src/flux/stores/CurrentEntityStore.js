var BaseStore = require('./baseStore');
var CurrentEntityConstants = require('../actions/CurrentEntityConstants');

class CurrentEntityStore extends BaseStore {
    constructor() {
        super();
        let handlers = {};
        var _this = this;
        handlers[CurrentEntityConstants.LOAD_ENTITY_SUCCESS] = (action) => {
            _this.entity = action.data;
            _this.error = null;
            _this.emitChange();
        };
        handlers[CurrentEntityConstants.LOAD_ENTITY_FAIL] = (action) => {
            _this.error = action.error;
            _this.emitChange();
        };
        this.initialize(handlers);
    }

    getEntity() {
        return this.entity;
    }

    getError() {
        return this.error;
    }
}

export default new CurrentEntityStore();