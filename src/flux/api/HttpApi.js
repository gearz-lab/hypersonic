import request from 'axios';

class HttpApi {
    get(url, params,  next) {
        if(!params) {
            params = {}
        }
        try {
            request.get(url, params)
                .then(next)
                .catch((error) => { next(error); })
        } catch(error) {
            next(error);
        }
    }
}

let httpApi = new HttpApi();

if(window) {
    window.httpApi = httpApi;
}

export default httpApi;

