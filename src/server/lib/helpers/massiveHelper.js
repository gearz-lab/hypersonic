import Promise from 'bluebird';
import massive from 'massive';

/**
 * 
 * @param connectionString
 * @returns {*}
 */
export function buildMassive(connectionString) {
    if (!connectionString) throw Error('connectionString should be truthy');
    let massiveInstance = massive.connectSync({connectionString: connectionString});
    Promise.promisifyAll(massiveInstance);
    //Promise.promisifyAll(massiveInstance.user);
    return massiveInstance;
}