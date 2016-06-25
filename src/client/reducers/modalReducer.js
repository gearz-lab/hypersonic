import {ENQUEUE_MODAL, DEQUEUE_MODAL} from '../actions/modalActions';

var defaultState = [];

export default function user(state = defaultState, action) {
    let newData;
    switch (action.type) {
        case ENQUEUE_MODAL:
            newData = state.splice(0);
            newData.push(action.data);
            return newData;
        case DEQUEUE_MODAL:
            newData = state.splice(0);
            for (let i = 0; i < action.data.number; i++)
                newData.pop();
            return newData;
        default:
            return state
    }
}
