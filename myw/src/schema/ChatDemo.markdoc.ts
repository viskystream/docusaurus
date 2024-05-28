import { Schema } from '@markdoc/markdoc';

const schema = {
    render: 'ChatDemo',
    attributes: {
        controls: {
            type: Boolean,
        },
        logger: {
            type: Boolean,
        },
        initialState: {
            type: Object,
            required: true,
            errorLevel: 'critical',
            options: {
                type: Object,
                required: true,
                errorLevel: 'critical',
            },
        },
    },
    selfClosing: true,
};

export default schema as Schema;
