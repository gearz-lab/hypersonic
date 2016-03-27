import api from '../api/ApplicationDomainClientApi';

export const APPLICATION_DOMAIN_LOADING = 'APPLICATION_DOMAIN_LOADING';
export const APPLICATION_DOMAIN_LOADED = 'APPLICATION_DOMAIN_LOADED';

function applicationDomainLoading() {
    return {
        type: APPLICATION_DOMAIN_LOADING
    }
}

function applicationDomainLoaded(applicationDomain) {
    if (!applicationDomain) throw Error('\'applicationDomain\' should be truthy');
    return {
        type: APPLICATION_DOMAIN_LOADED,
        data: applicationDomain
    }
}

export function loadApplicationDomain() {
    return dispatch => {
        dispatch(applicationDomainLoading());
        api.load()
            .then(r => dispatch(applicationDomainLoaded(r.data)))
            .catch(ex => {
                throw Error(ex)
            });
    };
}