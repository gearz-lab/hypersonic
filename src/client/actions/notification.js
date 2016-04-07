export const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export function enqueue(notification) {
    if (!notification) throw Error('\'notification\' should be truthy');
    return {
        type: ENQUEUE_NOTIFICATION,
        data: notification
    }
}

export function clear() {
    return {
        type: CLEAR_NOTIFICATION
    };
}