import { ENQUEUE_MODAL } from '../actions/modal';

var defaultState = [];

export default function user(state = defaultState, action) {
    switch (action.type) {
        case ENQUEUE_MODAL:
            let newData = state.splice(0);
            newData.push(action.data);
            return newData;
        default:
            return state
    }
}
