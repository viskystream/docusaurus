import { Schema } from '@markdoc/markdoc';

const schema: Schema = {
    render: 'NumberedListItem',
    attributes: {
        header: { type: String },
        id: { type: String },
        number: { type: String },
        size: { type: String },
    },
};

export default schema;
