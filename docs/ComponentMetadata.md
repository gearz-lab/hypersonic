ComponentMetadata contains information about a particular component

Examples:

    let componentMetadata = {
        required: {
            value: false
        },
        invisible: {
            value: true,
            messages: [
                'This field only makes sense when the other field has value'
            ]
        }
    }

