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
    search: function (criteria, layoutName, ctx) {
        return new Promise((f, r) => {
            ctx.model.fetchAll()
                .then(m => {
                    f(m.toJSON());
                    console.log(m.toJSON());
                })
                .catch(r);
        })
    }
};