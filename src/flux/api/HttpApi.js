import request from 'axios';

class HttpApi {
    get(url, params,  next) {
        if(!params) {
            params = {}
        }
        request.get(url, params).then(next);
    }
}

export default new HttpApi();

