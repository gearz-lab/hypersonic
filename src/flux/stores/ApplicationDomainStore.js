var BaseStore = require('./baseStore');
var ApplicationDomainConstants = require('../actions/ApplicationDomainConstants');

class ApplicationDomainStore extends BaseStore {

    constructor() {
        super();
        let handlers = {};
        var _this = this;
        handlers[ApplicationDomainConstants.LOAD_APPLICATION_DOMAIN_SUCCESS] = (action) => {
            _this.applicationDomain = action.data;
            _this.emitChange();
        };
        this.initialize(handlers);
    }

    getApplicationDomain() {
        return this.applicationDomain;
    }
}

export default new ApplicationDomainStore();