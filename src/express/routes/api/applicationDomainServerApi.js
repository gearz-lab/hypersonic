export default {
    setup(router) {

        // routes
        router.route('/applicationdomain/load').get(function(req, res) {
            let schema = {
                entities: [
                    {
                        name: 'contact',
                        fields: [
                            {
                                name: 'name',
                                type: 'string',
                                displayName: 'Name',
                                addonBefore: 'Something 2'
                            },
                            {
                                name: 'date',
                                type: 'date',
                                displayName: 'Date'
                            }
                        ]
                    },
                    {
                        name: 'phone',
                        fields: [
                            {
                                name: 'number',
                                type: 'string'
                            }
                        ]
                    }
                ],
                layouts: [
                    {
                        name: 'contact-edit',
                        fields: [
                            {
                                name: 'name'
                            },
                            {
                                name: 'date'
                            }
                        ]
                    },
                    {
                        name: 'phone-edit',
                        fields: [
                            {
                                name: 'number'
                            }
                        ]
                    }
                ]
            };

            res.send(schema);
        });
    }
}