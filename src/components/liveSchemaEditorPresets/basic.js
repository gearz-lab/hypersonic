export default
{
    "entities":
        [
            {
                "name": "contact",
                "fields": [
                    {
                        "name": "type",
                        "type": "string",
                        "displayName": "Type of something goes here",
                        "component": "lookup",
                        "options" : [
                            { value: "one", text: "Person" },
                            { value: "two", text: "Company" }
                        ],
                        "placeholder": "Select something here"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "displayName": "Name",
                        "addonBefore": "Something 2",
                        "invisible": function(m) { return m.type == "two" }
                    },
                    {
                        "name": "date",
                        "type": "date",
                        "displayName": "Date"
                    }
                ]
            },
            {
                "name": "phone",
                "fields": [
                    {
                        "name": "number",
                        "type": "string"
                    }
                ]
            }
        ],
    "layouts":
        [
            {
                "name": "contact-edit",
                "fields": [
                    {
                        "name": "type"
                    },
                    {
                        "name": "name"
                    },
                    {
                        "name": "date"
                    }
                ]
            },
            {
                "name": "phone-edit",
                "fields": [
                    {
                        "name": "number"
                    }
                ]
            }
        ]
}