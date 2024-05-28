import { Schema } from '@markdoc/markdoc';

const schema: Schema = {
    selfClosing: true,
    render: 'LinkCard',
    attributes: {
        title: { type: String },
        description: { type: String },
        icon: { type: String },
        href: { type: String },
    },
};

export default schema;
