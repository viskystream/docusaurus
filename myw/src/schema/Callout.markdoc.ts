import { Tag, Schema } from '@markdoc/markdoc';

const schema: Schema = {
    render: 'Callout',
    attributes: {
        title: { type: String },
        type: {
            type: String,
            default: 'note',
            matches: ['note', 'warning', 'todo'],
            errorLevel: 'critical',
        },
    },
    transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);

        const { variables } = config;

        if (attributes.type === 'todo' && !variables.roles.includes('admin')) {
            return null;
        }

        return new Tag(
            'Callout',
            { ...attributes },
            children,
        );
    },
};
export default schema;
