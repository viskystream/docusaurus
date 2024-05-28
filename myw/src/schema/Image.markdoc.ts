import { Schema } from '@markdoc/markdoc';

const schema: Schema = {
    render: 'Image',
    attributes: {
        src: { type: String },
        alt: { type: String },
    },
};

export default schema;
