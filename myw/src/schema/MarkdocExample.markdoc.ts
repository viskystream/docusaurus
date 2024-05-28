import { Schema, Tag } from '@markdoc/markdoc';

const schema: Schema = {
    render: 'Fence',
    attributes: {},
    transform(node, config) {
        const attributes = node.transformAttributes(config);
        const { content, language } = node.children[0].attributes;

        return new Tag(this.render, { ...attributes, language }, [content]);
    },
};

export default schema;
