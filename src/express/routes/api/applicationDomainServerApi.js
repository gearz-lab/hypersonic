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
                                displayName: 'Name'
                            },
                            {
                                name: 'profession',
                                type: 'string',
                                displayName: 'Profession'
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
                                name: 'profession'
                            }
                        ]
                    },
                    {
                        name: 'contact-details',
                        fields: [
                            {
                                name: 'name',
                                component: 'label'
                            },
                            {
                                name: 'profession',
                                component: 'label'
                            }
                        ]
                    }
                ]
            };

            res.send(schema);
        });
    }
}