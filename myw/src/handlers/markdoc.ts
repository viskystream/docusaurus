
import Markdoc from '@markdoc/markdoc';
import config from 'config';
import path from 'path';
import _ from 'lodash';
import GithubSlugger from 'github-slugger';
import fs from 'fs';
import type { RequestHandler } from 'express';
import elasticSearch from './elasticSearch';
import { log } from '../../log';
import { createContentManifest, createContentManifestES } from '../utils/createContentManifest';
import { createContentNavigation } from '../utils/createContentNavigation';
import { createPlaceholderDoc } from '../utils/createPlaceholderDoc';

/**
 * Tags Schemas
 */
import tags from '../schema';

/**
 * Nodes Schemas
 */
import fence from '../schema/Fence.markdoc';
import heading from '../schema/Heading.markdoc';
import link from '../schema/Link.markdoc';
import { findMatchingKey, sluggify, unslugify } from '../utils/docHelpers';

const LOCAL_DOCS = true || process.env.LOCAL_DOCS || config.get('localDocs');

const LOCAL_ARTICLES_DIR = path.join(__dirname, '../content/local-docs');
const ARTICLES_DIR = path.join(__dirname, '../content/articles');
const GLOSSARY_DIR = path.join(__dirname, '../content/glossary');

/**
 * Get glossary terms from the glossary directory
 */
const glossaryDirPath = path.join(__dirname, '../content/glossary');
const glossaryFileNames = fs.readdirSync(glossaryDirPath);
const glossaryTerms = [];
glossaryFileNames.forEach((fileName) => {
    glossaryTerms.push(fileName.replace('.md', ''));
});

/**
 * Functions
 */
const requiredRoles = {
    transform(parameters: Record<string, any>) {
        const [roles, targetRoles] = Object.values(parameters);

        if (Array.isArray(targetRoles)) {
            return roles.some((role) => targetRoles.includes(role));
        }

        return Array.isArray(roles) ? roles.includes(targetRoles) : false;
    },
};

const getNavigation: RequestHandler = async (req, res) => {
    log.debug('Building navigation', { LOCAL_DOCS });
    const roles = _.get(res, 'locals.user.roles', []) as string[];

    let contentManifest = {};
    if (LOCAL_DOCS) {
        contentManifest = createContentManifest(ARTICLES_DIR);
    } else {
        const esQuery = {
            bool: {
                must: [
                    { match: { active: true } },
                    { match: { file_type: 'markdown' } },
                ],
            },
        };
        const docs = await elasticSearch.getESDocs(esQuery, roles);
        if (docs.length) {
            contentManifest = createContentManifestES(docs.filter((doc) => doc.kind !== 'glossary'));
        } else {
            log.debug('No docs found in elastic search, using local docs');
            contentManifest = createContentManifest(ARTICLES_DIR);
        }
    }

    const contentNavigation = createContentNavigation(contentManifest, roles);

    res.json(contentNavigation);
};

export const getDoc: any = async () => {
    log.debug('Getting doc', {
        LOCAL_DOCS,
        path: '/example',
    });
    // const host = req.get('host');
    // const username = _.get(res, 'locals.user.name', '').replace(' ', '');
    // const roles = _.get(res, 'locals.user.roles', []);
    // const slugger = new GithubSlugger();

    let document;
    if (LOCAL_DOCS) {
        const contentManifest = createContentManifest(ARTICLES_DIR, glossaryTerms);
        const matchingKey = findMatchingKey(contentManifest, '/example');
        document = contentManifest[matchingKey];
    } else {/*
        const route = '/example';
        const unsluggifiedRoute = unslugify(route);
        const esQuery = {
            bool: {
                must: [
                    { match: { active: true } },
                    { match: { file_type: 'markdown' } },
                ],
                should: [
                    { match: { route } },
                    { match: { route: unsluggifiedRoute } },
                ],
                minimum_should_match: 1,
            },
        };

        const esDocs = await elasticSearch.getESDocs(esQuery, roles);
        const doc = esDocs.filter((d) => sluggify(d.route) === route);

        if (doc.length) {
            const contentManifest = createContentManifestES(doc, glossaryTerms);
            const matchingKey = findMatchingKey(contentManifest, req.query.path as string);
            document = contentManifest[matchingKey];
        } else {
            log.debug('Doc not found in elastic search, using local doc', { path: req.query.path });
            // If doc is not found in elastic search, fallback to the doc from /articles
            const contentManifest = createContentManifest(ARTICLES_DIR, glossaryTerms);
            const matchingKey = findMatchingKey(contentManifest, req.query.path as string);
            document = contentManifest[matchingKey];
        }
        */
    }

    if (!document) {
        document = createPlaceholderDoc('/example');
    }

    // if (document?.frontmatter?.access_role) {
    //     let hasRole = false;
    //     roles.forEach((role) => {
    //         if (document.frontmatter.access_role.includes(role)) {
    //             hasRole = true;
    //         }
    //     });

    //     if (!hasRole) {
    //         return res.sendStatus(404);
    //     }
    // }

    const { ast } = document;
    return {
        ast,
        document
    };
    const conf = {

        tags,
        nodes: {
            fence,
            heading,
            link,
        },
        variables: {

        },
        functions: {
            requiredRoles,
        },
    };

    const content = await Markdoc.transform(ast, conf);
    const ret = {
        markdoc: {
            content,
        },
        frontmatter: document.frontmatter,
    };
    return ret;
    // return res.json({
    //     markdoc: {
    //         content,
    //     },
    //     frontmatter: document.frontmatter,
    // });
};

export const transformData = async (ast, document) => {
    const conf = {

        tags,
        nodes: {
            fence,
            heading,
            link,
        },
        variables: {

        },
        functions: {
            requiredRoles,
        },
    };

    const content = await Markdoc.transform(ast, conf);
    const ret = {
        markdoc: {
            content,
        },
        frontmatter: document.frontmatter,
    };
    return ret;
};
const getGlossary: RequestHandler = async (req, res) => {
    const host = req.get('host');
    const username = _.get(res, 'locals.user.name', '').replace(' ', '');
    const roles = _.get(res, 'locals.user.roles', []);
    const slugger: GithubSlugger = new GithubSlugger();
    const glossaryRoute = '/glossary';

    const esQuery = {
        bool: {
            must: [
                { match: { active: true } },
                { match: { file_type: 'markdown' } },
                { match: { route: glossaryRoute } },
            ],
        },
    };

    const esDocs = await elasticSearch.getESDocs(esQuery, roles);
    const doc = esDocs.filter((d) => d.route === glossaryRoute);

    const contentManifest = createContentManifestES(doc);
    const glossaryManifest = createContentManifest(GLOSSARY_DIR);
    const glossaryContent = contentManifest[glossaryRoute];

    const { ast } = glossaryContent;
    Object.keys(glossaryManifest).forEach((key) => {
        glossaryManifest[key].ast.children.forEach((node) => {
            ast.children.push(node);
        });
    });

    const conf = {
        slugger,
        tags,
        nodes: {
            fence,
            heading,
            link,
        },
        variables: {
            roles,
            username,
            host,
        },
    };

    const content = await Markdoc.transform(ast, conf);

    return res.json({
        markdoc: {
            content,
        },
        frontmatter: glossaryContent.frontmatter,
    });
};

const getGlossaryDefinition: RequestHandler = async (req, res) => {
    const host = req.get('host');
    const username = _.get(res, 'locals.user.name', '').replace(' ', '');
    const roles = _.get(res, 'locals.user.roles', []);
    const slugger: GithubSlugger = new GithubSlugger();
    const glossaryManifest = createContentManifest(GLOSSARY_DIR);
    const definition = glossaryManifest[`/glossary/${req.params.definition}`];

    if (!definition) {
        return res.sendStatus(404);
    }

    const { ast } = definition;

    const conf = {
        slugger,
        tags,
        nodes: {
            fence,
            heading,
            link,
        },
        variables: {
            roles,
            username,
            host,
        },
    };

    const content = await Markdoc.transform(ast, conf);

    return res.json({
        markdoc: {
            content,
        },
        frontmatter: definition.frontmatter,
    });
};

const getLocalDoc: RequestHandler = async (req, res) => {
    const host = req.get('host');
    const username = _.get(res, 'locals.user.name', '').replace(' ', '');
    const roles = _.get(res, 'locals.user.roles', []);
    const slugger = new GithubSlugger();
    const contentManifest = createContentManifest(LOCAL_ARTICLES_DIR, glossaryTerms);
    const document = contentManifest[req.query.path as string];

    if (!document) {
        return res.sendStatus(404);
    }

    if (document?.frontmatter?.access_role) {
        let hasRole = false;
        roles.forEach((role) => {
            if (document.frontmatter.access_role.includes(role)) {
                hasRole = true;
            }
        });

        if (!hasRole) {
            return res.sendStatus(404);
        }
    }

    const { ast } = document;

    const markdocConfig = {
        slugger,
        tags,
        nodes: {
            fence,
            heading,
            link,
        },
        variables: {
            roles,
            username,
            host,
        },
        functions: {
            requiredRoles,
        },
    };

    const content = await Markdoc.transform(ast, markdocConfig);

    return res.json({
        markdoc: {
            content,
        },
        frontmatter: document.frontmatter,
    });
};

export default {
    getNavigation,
    getDoc,
    getGlossary,
    getGlossaryDefinition,
    getLocalDoc,
};
