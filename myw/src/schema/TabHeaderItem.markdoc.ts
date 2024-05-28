import { Schema } from '@markdoc/markdoc';

const schema: Schema = {
    render: 'TabHeaderItem',
    attributes: {
        disabled: { type: Boolean },
        className: { type: String },
    },
};

export default schema;
