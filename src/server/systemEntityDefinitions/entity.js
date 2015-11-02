export default
{
    name: "entity",
    _system: true,
    fields: [
        {
            name: "name",
            type: "string",
            displayName: "Name",
            required: true

        },
        {
            name: "displayNameSingular",
            type: "string",
            displayName: "Display name singular",
            required: true
        },
        {
            name: "displayNamePlural",
            type: "string",
            displayName: "Display name plural",
            required: true
        },
        {
            name: "firstClass",
            type: "bool",
            displayName: "First class",
            help: "Whether or not this entity can be accessed from the menu"
        },
        {
            name: "fields",
            displayName: "Fields",
            type: "array",
            arrayType: "entity",
            entityType: "field",
            layoutName: "field-edit",
            addText: "Add field"
        }
    ],
    layouts: [{
        name: "entity-edit",
        groups: [
            {
                fields: [
                    {
                        name: "name"
                    }
                ]
            },
            {
                orientation: "horizontal",
                fields: [
                    {
                        name: "displayNameSingular"
                    },
                    {
                        name: "displayNamePlural"
                    }
                ]
            },
            {
                fields: [
                    {
                        name: "firstClass"
                    },
                    {
                        name: "fields"
                    }
                ]
            }
        ]
    }]
};