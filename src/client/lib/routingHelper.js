import {browserHistory} from 'react-router';

/**
 * Gets the new URL 
 * @export
 * @param {string} entityName
 * @returns
 */
export function getNewUrl(entityName) {
    if (!entityName) throw Error('Argument \'entityName\' should be truthy');
    return `/e/${entityName}/new`;
}

/**
 * Gets the edit URL 
 * @export
 * @param {string} entityName
 * @param {number} entityId
 * @returns
 */
export function getEditUrl(entityName, entityId) {
    if (!entityName) throw Error('Argument \'entityName\' should be truthy');
    if (!entityId) throw Error('Argument \'entityId\' should be truthy');
    return `/e/${entityName}/edit/${entityId}`;
}

/**
 * Gets the details URL 
 * @export
 * @param {string} entityName
 * @param {number} entityId
 * @returns
 */
export function getDetailsUrl(entityName, entityId) {
    if (!entityName) throw Error('Argument \'entityName\' should be truthy');
    if (!entityId) throw Error('Argument \'entityId\' should be truthy');
    return `/e/${entityName}/details/${entityId}`;
}

/**
 * Gets the search URL
 * @export
 * @param {string} entityName
 * @param {string} criteira
 * @returns
 */
export function getSearchUrl(entityName, criteira) {
    if (!entityName) throw Error('Argument \'entityName\' should be truthy');
    if (!criteira) throw Error('Argument \'criteira\' should be truthy');
    return `/e/${entityName}/search?q=${criteria}`;
}

/**
 * Redirects the browser to the new form
 * @param entityName
 */
export function redirectToNew(entityName) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    browserHistory.push(getNewUrl(entityName));
}

/**
 * Redirects the browser to the edit form
 * @param entityName
 * @param entityId
 */
export function redirectToEdit(entityName, entityId) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entityId) throw Error('\'entityId\' should be truthy');
    browserHistory.push(getEditUrl(entityName, entityId));
}

/**
 * Redirects to the details page
 * @export
 * @param {any} entityName
 * @param {any} entityId
 */
export function redirectToDetails(entityName, entityId) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entityId) throw Error('\'entityId\' should be truthy');
    browserHistory.push(getDetailsUrl(entityMame, entityId));
}

/**
 * Redirects to the search page
 * @export
 * @param {any} entityName
 * @param {any} criteria
 */
export function redirectToSearch(entityName, criteria) {
    if (!entityName) throw Error('Argument \'entityName\' should be truthy');
    browserHistory.push(getSearchUrl(entityName, criteria));
}