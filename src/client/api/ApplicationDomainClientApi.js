import request from 'axios';

export default {
    load(next) {
        request.get('/api/applicationdomain/load')
            .then(r => next(null, r.data))
            .catch(ex => next(ex));
    }
}