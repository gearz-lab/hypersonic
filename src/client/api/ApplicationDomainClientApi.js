import http from 'axios';

export default {
    load() {
        return http.get('/api/applicationdomain/load');
    }
}