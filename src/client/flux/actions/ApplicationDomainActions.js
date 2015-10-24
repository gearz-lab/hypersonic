import Actions from './Actions.js';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import ApplicationDomainConstants from './ApplicationDomainConstants.js';
import clientApi from '../../api/clientApi.js';

class ApplicationDomainActions extends Actions {

    /**
     * Loads the current logged user
     */
    loadApplicationDomain() {

        this.trigger({
            loadAction: ApplicationDomainConstants.LOAD_APPLICATION_DOMAIN,
            failAction: ApplicationDomainConstants.LOAD_APPLICATION_DOMAIN_FAILED,
            successAction: ApplicationDomainConstants.LOAD_APPLICATION_DOMAIN_SUCCESS,
            clientApiFunction: clientApi.applicationDomain.load
        });

    }
}

export default new ApplicationDomainActions();