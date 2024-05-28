import { Schema } from '@markdoc/markdoc';

const schema: Schema = {
    render: 'Feedback',
    selfClosing: true,
    attributes: {
        page: { type: String },
    },
};

export default schema;
