import {browserHistory} from 'react-router';

/**
 * Redirects the browser to the new form
 * @param entityName
 */
export function redirectToNew(entityName) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    browserHistory.push(`/e/${entityName}/new`);
}

/**
 * Redirects the browser to the edit form
 * @param entityName
 * @param entityId
 */
export function redirectToEdit(entityName, entityId) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entityId) throw Error('\'entityId\' should be truthy');
    browserHistory.push(`/e/${entityName}/edit/${entityId}`);
}

export function redirectToSearch(entityName, criteria) {
    if (!entityName) throw Error('Argument \'entityName\' should be truthy');
    browserHistory.push(`/e/${entityName}/search?q=${criteria}`);
}