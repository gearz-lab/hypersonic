import AppDispatcher from '../dispatchers/AppDispatcher.js';

class Actions {

    /**
     * Triggers a load action
     * @param options
     */
    trigger(options) {

        // check options
        let loadAction = options.loadAction;
        if(!loadAction) {
            throw new Error('Load action is required');
        }
        let successAction = options.successAction;
        if(!successAction) {
            throw new Error('Success action is required');
        }
        let failAction = options.failAction;
        if(!failAction) {
            throw new Error('Fail action is required');
        }
        let clientApiFunction = options.clientApiFunction;
        if(!clientApiFunction) {
            throw new Error('Client API function is required');
        }

        // dispatches the load action
        AppDispatcher.dispatch({
            actionType: loadAction
        });

        // calls the client API passing the callback above
        clientApiFunction((error, data) => {
            if(error) {
                AppDispatcher.dispatch({
                    actionType: failAction
                });
            }
            else {
                AppDispatcher.dispatch({
                    actionType: successAction,
                    data: data
                });
            }
        });
    }

}
export default Actions;