import httpApi from './HttpApi.js';

class UsersApi {
    find(id, next) {
        httpApi.get(`/api/users/${id}`, null, (response) => {
            next(null, response);
        });
    }
}

export default new UsersApi();