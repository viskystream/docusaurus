/* eslint-disable camelcase */
import fs from 'fs';
import glob from 'glob';
import yaml from 'js-yaml';
import Markdoc, { Node } from '@markdoc/markdoc';
import { injectGlossaryTerms } from './injectGlossaryTerms';
import { ESDoc } from './types';

interface MarkdocFrontmatter {
	route: string
	pageTitle: string
	linkTitle?: string
	kind: string
	access_role?: string
	uuid?: string
}

export type ContentManifest = Record<string, { frontmatter: MarkdocFrontmatter, ast: Node }>

const isMarkdocFrontmatter = (frontmatter: unknown): frontmatter is MarkdocFrontmatter => (
    typeof frontmatter === 'object'
		&& 'route' in frontmatter && typeof (frontmatter as { route: unknown }).route === 'string'
);

const parseMarkdocFrontmatter = (ast: Node): MarkdocFrontmatter | Record<string, never> => {
    if (ast.attributes.frontmatter) {
        return yaml.load(ast.attributes.frontmatter) as MarkdocFrontmatter;
    }
    return {};
};

export const createContentManifest = (ROOT_DIR: string, glossaryTerms?: string[]) => {
    const files = glob.sync(`${ROOT_DIR}/**/*.md`);

    const contentManifest: ContentManifest = {};

    files.forEach((file) => {
        const rawText = fs.readFileSync(file, 'utf-8');
        const ast = Markdoc.parse(
            glossaryTerms ? injectGlossaryTerms(rawText, glossaryTerms) : rawText,
        );
        const frontmatter = (parseMarkdocFrontmatter(ast));

        if (isMarkdocFrontmatter(frontmatter)) {
            contentManifest[frontmatter.route] = {
                ast,
                frontmatter,
            };
        }
    });

    return contentManifest;
};

export const createContentManifestES = (docs: ESDoc[], glossaryTerms?: string[]) => {
    const contentManifest = {};

    docs.forEach((doc) => {
        const rawText = doc.content;
        const ast = Markdoc.parse(
            glossaryTerms ? injectGlossaryTerms(rawText, glossaryTerms) : rawText,
        );
        const frontmatter = {
            route: doc.route,
            linkTitle: doc.link_title,
            pageTitle: doc.page_title,
            kind: doc.kind,
            uuid: doc.uuid,
            access_role: doc.access_role,
        };

        contentManifest[frontmatter.route] = {
            ast,
            frontmatter,
        };
    });

    return contentManifest;
};
