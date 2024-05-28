import { Schema } from '@markdoc/markdoc';

const schema: Schema = {
    render: 'TabHeader',
    attributes: {
        spacing: { type: String },
        className: { type: String },
    },
};

export default schema;
