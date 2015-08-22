import request from 'axios';

class HttpApi {

    /**
     * Performs a GET request to the given URL
     * @param url
     * @param params
     * @param next
     */
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

    /**
     * Performs a POST request to the given URL
     * @param url
     * @param object
     * @param next
     */
    post(url, object, next) {
        if(!object) {
            object = {}
        }
        try {
            request.post(url, object)
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

