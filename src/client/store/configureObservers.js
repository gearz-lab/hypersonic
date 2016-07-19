import ReduxRouteObserver from '../lib/reduxRouteObserver';
import {searchEntities } from '../actions/modelActions';

export default function configureObservers(store) {
    const observers = new ReduxRouteObserver(store);


    let lastCriteria = undefined;
    observers.addObserver(/([a-z0-9]+)\/search/g, (match, currentState, previousState) => {
        let entityName = match[1];
        let criteria = currentState.query.q;
        let page = currentState.query.p || 1;
        let selection = lastCriteria != criteria ? {} : undefined; // when the criteria changes, we need to clear the selection. Otherwise, the selection should not be changed (undefined)
        lastCriteria = criteria;

        store.dispatch(searchEntities(entityName, criteria, criteria, page, selection));
    });
}