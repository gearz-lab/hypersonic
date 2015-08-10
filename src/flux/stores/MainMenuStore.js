var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('./StoreConstants');
var MainMenuConstants = require('../actions/MainMenuConstants');
var _ = require('underscore');

var MainMenuStore = _.extend({}, EventEmitter.prototype, {

    /**
     * The logged user
     */
    loggedUser: null,

    initialize: function() {
        let _this = this;
        // Register callback to handle all updates
        AppDispatcher.register(function(action) {
            console.log('action triggered. Action:' + action.actionType);

            switch (action.actionType) {
                case MainMenuConstants.LOAD_MAIN_MENU_SUCCESS:
                    _this.mainMenu = action.data;
                    _this.emitChange();
                    break;
            }
        });
    },

    getMainMenu: function() {
        return this.mainMenu;
    },

    emitChange: function() {
        this.emit(Constants.CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(Constants.CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(Constants.CHANGE_EVENT, callback);
    }

});

MainMenuStore.initialize();

export default MainMenuStore;