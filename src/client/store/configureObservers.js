import ReduxRouteObserver from '../lib/reduxRouteObserver';

export default function configureObservers(store) {
    const observers = new ReduxRouteObserver(store);
    observers.addObserver(/contact\/search/g, (match, currentState, previousState) => {
        console.log('you are on a search!');
    });
}