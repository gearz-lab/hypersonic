export default
{
    name: "entity",
    fields: [
        {
            name: "name",
            type: "string",
            displayName: "Name"

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
                name: "fields"
            }
        ]
    }]
};