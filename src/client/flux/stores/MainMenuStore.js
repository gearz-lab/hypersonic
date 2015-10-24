var BaseStore = require('./baseStore');
var MainMenuConstants = require('../actions/MainMenuConstants');

class MainMenuStore extends BaseStore {

    constructor() {
        super();
        let handlers = {};
        var _this = this;
        handlers[MainMenuConstants.LOAD_MAIN_MENU_SUCCESS] = (action) => {
            _this.mainMenu = action.data;
            _this.emitChange();
        };
        this.initialize(handlers);
    }

    getMainMenu() {
        return this.mainMenu;
    }
}

export default new MainMenuStore();