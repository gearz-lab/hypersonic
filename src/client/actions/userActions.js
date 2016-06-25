import api from '../api/LoggedUserClientApi';

export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';

function userLoading() {
    return {
        type: USER_LOADING
    }
}

function userLoaded(user) {
    if (!user) throw Error('\'user\' should be truthy');
    return {
        type: USER_LOADED,
        data: user
    }
}

export function loadUser() {
    return dispatch => {
        dispatch(userLoading());
        api.getLoggedUser()
            .then(r => dispatch(userLoaded(r.data)))
            .catch(ex => { throw Error(ex) });
    };
}