var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('./StoreConstants');
var LoggedUserConstants = require('../actions/LoggedUserConstants');
var _ = require('underscore');

var LoggedUserStore = _.extend({}, EventEmitter.prototype, {

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
                case LoggedUserConstants.LOAD_LOGGED_SUCCESS:
                    _this.loggedUser = action.data;
                    _this.emitChange();
                    break;
            }
        });
    },

    getLoggedUser: function() {
        return this.loggedUser;
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

LoggedUserStore.initialize();

export default LoggedUserStore;