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
    ...nodes.heading,
    transform: async (node, config) => {
        const base = await nodes.heading.transform(node, config) as Tag;
        base.attributes.id = generateID(base.children, base.attributes, config.slugger);
        return base;
    },
};

export default schema;
