import ReduxRouteObserver from '../lib/reduxRouteObserver';

export default function configureObservers(store) {
    const observers = new ReduxRouteObserver(store);
    observers.addObserver(/([a-z0-9]+)\/search/g, (match, currentState, previousState) => {
        console.log(match);
    });
}