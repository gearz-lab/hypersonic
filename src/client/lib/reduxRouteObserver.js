import _ from 'underscore';

/**
 * Observes changes in the Redux store and calls onChange when the state changes
 * @param store The Redux store
 * @param selector A function that should return what you are observing. Example: (state) => state.routing.locationBeforeTransitions;
 * @param onChange A function called when the observable state changed. Params are store, previousValue and currentValue
 */
class RouterObserver {

    constructor(store) {
        if (!store) throw Error('Argument \'store\' should be truthy');
        this.observers = [];
        this.store = store;
        this.currentLocation = {
            pathname: null,
            search: null, // the query string
            query: null // the query object containing one property for each parameter
        };

        store.subscribe(() => {
            let state = this.store.getState();
            let { pathname, search, query } = this.currentLocation;
            let newPathname, newSearch, newQuery;
            try {
                newPathname = state.routing.locationBeforeTransitions.pathname;
                newSearch = state.routing.locationBeforeTransitions.search;
                newQuery = state.routing.locationBeforeTransitions.query;
            }
            catch (ex) {
                // the selector could not get the value. Maybe because of a null reference. Let's assume undefined
            }
            if ((newPathname !== pathname) || (newSearch !== search)) {
                this.processHandlers({ pathname: newPathname, search: newSearch, query: newQuery }, { pathname, search, query });
                
                this.currentLocation.pathname = newPathname;
                this.currentLocation.search = newSearch;
                this.currentLocation.query = newQuery;
            }
        });
    }

    processHandlers(currentLocation, previousLocation) {
        if (!currentLocation) throw Error('Argument \'currentLocation\' should be truthy');
        if (!previousLocation) throw Error('Argument \'previousLocation\' should be truthy');

        let pathAndQuery = currentLocation.pathname + currentLocation.search;

        _.each(this.observers, observer => {
            let { regex, callback } = observer;
            let match = pathAndQuery.match(regex);
            if (match) {
                callback(match, currentLocation, previousLocation);
            }
        });
    }

    addObserver(regex, callback) {
        if (!regex) throw Error('Argument \'regex\' should be truthy');
        if (!callback) throw Error('Argument \'callback\' should be truthy');

        this.observers.push({ regex, callback });
    }
}

export default RouterObserver;