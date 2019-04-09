export const notes = [
    {
        name : 'topic',
        type : 'text',
        label : 'Topic',
        required : true
    },
    {
        name : 'text',
        type : 'textarea',
        label : 'Text',
        required : false
    },
    {
        name : 'color',
        type : 'select',
        label : 'Color',
        required : true,
        options: [
            {
                label: 'Red',
                value: 'red'
            },
            {
                label: 'Green',
                value: 'green'
            },
            {
                label: 'Blue',
                value: 'blue'
            },
        ]
    }
];