import GithubSlugger from 'github-slugger';
import { nodes, RenderableTreeNode, Schema, Tag } from '@markdoc/markdoc';
import { ConfigWithSlugger } from '../utils/types';

function generateID(children: RenderableTreeNode[], attributes: Record<string, any>, slugger: GithubSlugger) {
    if (attributes.id && typeof attributes.id === 'string') {
        return attributes.id;
    }

    const headingString = children
        .filter((child) => typeof child === 'string')
        .join(' ');

    return slugger.slug(headingString);
}

const schema: Schema<ConfigWithSlugger> = {
    ...nodes.link,
    attributes: {
        ...nodes.link.attributes,
        target: { type: String },
    },
    transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        const id = generateID(children, attributes, config.slugger);

        return new Tag(
            'a',
            { ...attributes, id },
            children,
        );
    },
};

export default schema;
