import { Schema } from '@markdoc/markdoc';

const schema = {
    render: 'NumberedList',
    attributes: {
        spacing: { type: String },
        size: { type: String },
        marginY: { type: String },
        listItemProps: {
            type: Object,
            withBorderBottom: { type: Boolean },
        },
    },
};

export default schema as Schema;
