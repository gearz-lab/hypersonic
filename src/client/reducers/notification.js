import {ENQUEUE_NOTIFICATION, CLEAR_NOTIFICATION} from '../actions/notification';

var defaultState = [];

export default function user(state = defaultState, action) {
    let newData;
    switch (action.type) {
        case ENQUEUE_NOTIFICATION:
            newData = state.splice(0);
            newData.push(action.data);
            return newData;
        case CLEAR_NOTIFICATION:
            return [];
        default:
            return state
    }
}
