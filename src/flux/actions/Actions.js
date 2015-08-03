import AppDispatcher from '../dispatchers/AppDispatcher.js';

class Actions {

    load(options) {

        // check options
        let loadAction = options.loadAction;
        if(!loadAction) {
            throw new Error('Load action is required');
        }
        let successAction = option.successAction;
        if(!successAction) {
            throw new Error('Success action is required');
        }
        let failAction = option.failAction;
        if(!failAction) {
            throw new Error('Fail action is required');
        }
        let clientApiFunction = options.clientApiFunction;
        if(!clientApiFunction) {
            throw new Error('Client API function is required');
        }

        // client API callback
        let clientApiCallback = function(error, data) {
            if(error) {
                AppDispatcher.dispatch({
                    actionType: failAction
                });
            }
            else {
                App.dispatch({
                    actionType: successAction,
                    data: data
                });
            }
        };

        // dispatches the load action
        AppDispatcher.dispatch({
            actionType: loadAction
        });
        // calls the client API passing the callback above
        clientApiFunction.call(null, clientApiCallback);
    }
}
export default Action;