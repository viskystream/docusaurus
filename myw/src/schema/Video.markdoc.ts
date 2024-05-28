import { Schema } from '@markdoc/markdoc';

const schema: Schema = {
    selfClosing: true,
    render: 'Video',
    attributes: {
        src: { type: String },
    },
};

export default schema;
