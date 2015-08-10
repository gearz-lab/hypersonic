var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./StoreConstants');

class BaseStore
{
    /**
     * Constructs a new instance of the BaseStore
     * @param actionHandlers - An object in which the key is the
     * action name and the value the function that should handle it
     */
    constructor(actionHandlers) {
        if(!actionHandlers) {
            throw new Error('actionHandlers is required');
        }

        this.eventEmitter = new EventEmitter();
        let _this = this;
        _this.data = null; // the original value for data. This should be populated by the action handlers

        AppDispatcher.register(function(action) {
            console.log('action triggered. Action:' + action.actionType);
            if(action in actionHandlers) {
                actionHandlers[action].call(_this, action);
            }
        });
    }

    emitChange() {
        this.eventEmitter.emit(Constants.CHANGE_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback) {
        this.eventEmitter.on(Constants.CHANGE_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        this.eventEmitter.removeListener(Constants.CHANGE_EVENT, callback);
    }
}

export default BaseStore;