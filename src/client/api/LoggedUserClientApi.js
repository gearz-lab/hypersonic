import request from 'axios';

class LoggedUserClientApi {

    /**
     * Gets the user logged in
     * @param next
     */
    getLoggedUser(next) {
        request.get(`/api/users/loggeduser`)
            .then(r => next(null, r.data))
            .catch(ex => next(ex));
    }

    /**
     * Gets a user by id
     * @param id
     * @param next
     */
    find(id, next) {
        request.get(`/api/users/${id}`)
            .then(r => next(null, r.data))
            .catch(ex => next(ex));
    }
}

export default new LoggedUserClientApi();