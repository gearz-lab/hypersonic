import Promise from 'bluebird';
import massive from 'massive';
import _ from 'underscore';

Promise.config({warnings: false});

/**
 * 
 * @param connectionString
 * @returns {*}
 */
export function buildMassive(connectionString, entities) {
    if (!connectionString) throw Error('connectionString should be truthy');
    let massiveInstance = massive.connectSync({connectionString: connectionString});
    Promise.promisifyAll(massiveInstance);
    if(entities) {
        _.each(entities, e => Promise.promisifyAll(massiveInstance[e]));
    }
    return massiveInstance;
}