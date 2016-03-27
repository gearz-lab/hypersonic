import http from 'axios';

export default {
    load(next) {
        http.get('/api/applicationdomain/load')
            .then(r => next(null, r.data))
            .catch(ex => next(ex));
    }
}