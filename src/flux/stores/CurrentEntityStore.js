var BaseStore = require('./baseStore');
var CurrentEntityConstants = require('../actions/CurrentEntityConstants');

class CurrentEntityStore extends BaseStore {
    constructor() {
        super();
        let handlers = {};
        var _this = this;
        handlers[CurrentEntityConstants.LOAD_ENTITY_SUCCESS] = (action) => {
            _this.data = {
                entity: action.data,
                validationErrors: []
            }
            _this.emitChange();
        };
        handlers[CurrentEntitiesConstants.SAVE_ENTITY_SUCCESS] = (action) => {
            _this.data = {
                entity: action.data.entity,
                validationErrors: []
            }
            _this.emitChange();
        };
        handlers[CurrentEntitiesConstants.SAVE_ENTITY_SUCCESS] = (action) => {
            _this.data = {
                entity: action.data.entity,
                validationErrors: action.data.validationErrors
            }
            _this.emitChange();
        };
        this.initialize(handlers);
    }

    getEntity() {
        return this.currentEntity;
    }

    getError() {
        return this.error;
    }
}

export default new CurrentEntityStore();