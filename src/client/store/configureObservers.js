import ReduxRouteObserver from '../lib/reduxRouteObserver';
import {searchEntities } from '../actions/modelActions';

export default function configureObservers(store) {
    const observers = new ReduxRouteObserver(store);
    observers.addObserver(/([a-z0-9]+)\/search/g, (match, currentState, previousState) => {
        let entityName = match[1];
        let criteria = currentState.query.q;
        store.dispatch(searchEntities(entityName, criteria, 1, {}));
    });
}