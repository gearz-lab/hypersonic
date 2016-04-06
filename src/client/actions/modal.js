import {MODAL_BUTTON_SET_YES_NO} from '../../constants'

export const ENQUEUE_MODAL = 'ENQUEUE_MODAL';
export const DEQUEUE_MODAL = 'DEQUEUE_MODAL';
export const MODAL_TYPE_CONFIRMATION = 'confirmation';


export function enqueueConfirmation(title, text, onSubmit, onCancel, buttonSet = MODAL_BUTTON_SET_YES_NO) {
    return {
        type: ENQUEUE_MODAL,
        data: {
            modalType: MODAL_TYPE_CONFIRMATION,
            buttonSet: buttonSet,
            onSubmit: onSubmit,
            onCancel: onCancel,
            title: title,
            text: text
        }
    };
}

export function dequeue(number = 1) {
    return {
        type: DEQUEUE_MODAL,
        data: {
            number: number
        }
    };
}