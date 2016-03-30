import editLayout from './layouts/contact.edit';

export default {
    name: "contact",
    displayNameSingular: "Contact",
    displayNamePlural: "Contacts",
    fields: [
        {
            name: "name",
            type: "string",
            displayName: "Name",
            help: "Name should have 10 or less characters",
            invalid: [
                {
                    condition: function (m) {
                        return m.name && m.name.length > 10;
                    },
                    message: 'Name is too big.'
                }
            ]
        },
        {
            name: "email",
            type: "string",
            displayName: "E-mail"
        }
    ],
    layouts: [editLayout],
    search: function (criteria, page, layoutName, ctx) {
        return new Promise((f, r) => {
            let modifiers = {where: ['id', '>', '1'], limit: 10, offset: 0};
            Promise.all([ctx.model.where('id', '>', '1').count(), ctx.model.query(modifiers).fetchAll()])
                .then(r => {
                    let count = r[0];
                    let rows = r[1].toJSON();
                    let pages = Math.ceil(count / ctx.appConfig.data.pageSize);
                    f({ count, page, pages, rows });
                })
                .catch(r);
        })
    }
};