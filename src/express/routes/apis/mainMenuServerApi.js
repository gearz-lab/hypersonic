import UserDal from '../../../lib/dal/UserDal.js';
import db from '../../../lib/database/dbHelper.js';
let users = new UserDal();

export default {
    setup(router) {

        // routes

        router.route('/mainmenu/load').get(function(req, res) {

            const mainMenu = {
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
                                            display: "Search"
                                        },
                                        new: {
                                            display: "New"
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