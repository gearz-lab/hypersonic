import request from 'axios';

class HttpApi {
    get(url, params,  next) {
        if(!params) {
            params = {}
        }
        request.get(url, params).then(next);
    }
}

let httpApi = new HttpApi();

if(window) {
    window.httpApi = httpApi;
}

export default httpApi;

