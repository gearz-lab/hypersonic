import httpApi from './HttpApi.js';

class LoggedUserClientApi {

    /**
     * Gets the user logged in
     * @param next
     */
    getLoggedUser(next) {
        httpApi.get('/api/users/loggeduser', null, (response) => {
            next(null, response.data);
        })
    }

    /**
     * Gets a user by id
     * @param id
     * @param next
     */
    find(id, next) {
        httpApi.get(`/api/users/${id}`, null, (response) => {
            next(null, response.data);
        });
    }
}

export default new LoggedUserClientApi();