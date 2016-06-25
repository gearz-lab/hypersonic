import {browserHistory} from 'react-router';

/**
 * Redirects the browser to the new form of the given entity
 * @param entityName
 */
export function redirectToNew(entityName) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    browserHistory.push(`/e/${entityName}/new`);
}