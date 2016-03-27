import http from 'axios';

export default {
    load() {
        return http.get(`/api/mainmenu/load`);
    }
}