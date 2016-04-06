import {ENQUEUE_MODAL, DEQUEUE_MODAL} from '../actions/modal';

var defaultState = [];

export default function user(state = defaultState, action) {
    let newData = state.splice(0);
    switch (action.type) {
        case ENQUEUE_MODAL:
            newData.push(action.data);
            return newData;
        case DEQUEUE_MODAL:
            for (let i = 0; i < action.data.number; i++)
                newData.pop();
            return newData;
        default:
            return state
    }
}
