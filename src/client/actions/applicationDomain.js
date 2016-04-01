export const APPLICATION_DOMAIN_LOADED = 'APPLICATION_DOMAIN_LOADED';

export default function applicationDomainLoaded(applicationDomain) {
    if (!applicationDomain) throw Error('\'applicationDomain\' should be truthy');
    return {
        type: APPLICATION_DOMAIN_LOADED,
        data: applicationDomain
    }
}