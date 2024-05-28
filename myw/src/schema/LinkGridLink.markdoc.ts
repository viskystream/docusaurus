import { Schema } from '@markdoc/markdoc';

const schema: Schema = {
    selfClosing: true,
    render: 'LinkGridLink',
    attributes: {
        title: { type: String },
        description: { type: String },
        href: { type: String },
    },
};

export default schema;
