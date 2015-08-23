import UserDal from '../../../lib/dal/UserDal.js';
import db from '../../../lib/database/dbHelper.js';
let users = new UserDal();

export default {
    setup(router) {

        // routes

        router.route('/mainmenu/load').get(function (req, res) {

            const mainMenu = {
                contacts: {
                    display: "Contacts",
                    nodes: {
                        new: {
                            display: "New contact",
                            route: {
                                name: "new",
                                params: {
                                    entity: "contact"
                                }
                            }
                        }
                    }
                },
                settings: {
                    display: "Settings",
                    nodes: {
                        customization: {
                            display: "Customization",
                            nodes: {
                                entities: {
                                    display: "Entities",
                                    nodes: {
                                        search: {
                                            display: "Search",
                                            route: {
                                                name: "liveSchemaEditor"
                                            }
                                        },
                                        new: {
                                            display: "New",
                                            route: {
                                                name: "new",
                                                params: {
                                                    entity: "entity"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            res.send(mainMenu);

        });

    }
}