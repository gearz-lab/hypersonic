import api from '../api/MainMenuClientApi';

export const MENU_LOADING = 'MENU_LOADING';
export const MENU_LOADED = 'MENU_LOADED';

function menuLoading() {
    return {
        type: MENU_LOADING
    }
}

function menuLoaded(menu) {
    if (!menu) throw Error('\'menu\' should be truthy');
    return {
        type: MENU_LOADED,
        data: menu
    }
}

export function loadMenu() {
    return dispatch => {
        dispatch(menuLoading());
        api.load()
            .then(r => dispatch(menuLoaded(r.data)))
            .catch(ex => { throw Error(ex) });
    };
}