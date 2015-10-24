import httpApi from './HttpApi.js';

class ApplicationDomainClientApi {

    load(next) {
        httpApi.get('/api/applicationdomain/load', null, (response) => {
            next(null, response.data);
        })
    }
}

export default new ApplicationDomainClientApi();