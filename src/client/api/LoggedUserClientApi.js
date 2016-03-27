import http from 'axios';

export default {
    /**
     * Gets the user logged in
     * @param next
     */
    getLoggedUser: function(next) {
        return http.get(`/api/users/loggeduser`);
    },

    /**
     * Gets a user by id
     * @param id
     * @param next
     */
    find: function(id, next) {
        return http.get(`/api/users/${id}`);
    }
}