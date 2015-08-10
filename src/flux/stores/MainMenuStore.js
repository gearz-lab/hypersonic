var BaseStore = require('./baseStore');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('./StoreConstants');
var MainMenuConstants = require('../actions/MainMenuConstants');
var _ = require('underscore');

class MainMenuStore extends BaseStore {

    constructor() {
        let handlers = {};
        handlers[MainMenuConstants.LOAD_MAIN_MENU_SUCCESS] = (action) => {
            this.mainMenu = action.data;
            this.emitChange();
        };
        super(handlers);
    }

    getMainMenu() {
        return this.mainMenu;
    }
}

export default new MainMenuStore();