import UserDal from '../../../lib/dal/UserDal.js';
import db from '../../../lib/database/dbHelper.js';
let users = new UserDal();

export default {
    setup(router) {

        // routes

        router.route('/mainmenu/load').get(function(req, res) {

            const mainMenu = {
                page: {
                    display: "PageControl",
                    nodes: {
                        editPanel: {
                            display: "StackPanelControl",
                            nodes: {
                                panel: {
                                    display: "Panel (Main)",
                                    nodes: {
                                        name: {
                                            display: "TexboxControl (Name)"
                                        },
                                        dateOfBirth: {
                                            display: "DatePickerControl (Date of Birth)"
                                        },
                                        gender: {
                                            display: "ToggleButtonControl (Gender)"
                                        }
                                    }
                                },
                                panel2: {
                                    display: "Panel (Additional Info)",
                                    nodes: {
                                        isResponsible: {
                                            display: "ToogleButtonControl (Is Responsible)"
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