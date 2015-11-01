export default
{
    name: "entity",
    _system: true,
    fields: [
        {
            name: "name",
            type: "string",
            displayName: "Name"

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
        fields: [
            {
                name: "name"
            },
            {
                name: "firstClass"
            },
            {
                name: "fields"
            }
        ]
    }]
};