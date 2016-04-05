export const ENQUEUE_MODAL = 'ENQUEUE_MODAL';

export function enqueueConfirmation(title, text) {
    return {
        type: ENQUEUE_MODAL,
        data: {
            title: title,
            text: text
        }
    };
}