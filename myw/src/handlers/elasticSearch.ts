/* eslint-disable camelcase */
import config from 'config';
import _ from 'lodash';
import { RequestParams } from '@elastic/elasticsearch';
import { RequestBody } from '@elastic/elasticsearch/lib/Transport';
import type { RequestHandler } from 'express';
import { log } from '../../log';
import esClient from './lib/elasticSearchClient';
import { filterEsDocsByUserRole } from '../utils/filterEsDocsByUserRole';
import { ESDoc } from '../utils/types';

const esIndex = config.get<string>('elastic.index');

const getESDocs = async function getESDocs<TRequestBody extends RequestBody>(
    esQuery: RequestParams.Search<TRequestBody>['body'],
    userRoles: string[],
) {
    try {
        const es = await esClient.search({
            index: esIndex,
            size: 300,
            body: {
                query: esQuery,
            },
        });

        log.debug('Elasticsearch response', {
            hits: es?.body?.hits?.hits?.length,
        });

        if (es?.body && es.body.hits.hits.length) {
            const hits = es.body.hits.hits.map((hit) => hit._source);
            const docs = filterEsDocsByUserRole(userRoles, hits) as ESDoc[];
            log.debug('Filtered results', {
                docs: docs && docs.map((d) => d.route || d.uuid),
            });
            return docs;
        }

        return [];
    } catch (err) {
        log.error('Elasticsearch error', { err });
        return [];
    }
};

const parseSearchResults = (results: ESDoc[]) => {
    // matches - doc utility snippets | headings | Markdoc tags | links | backticks used for inline code
    const regexpStrip = /(<<[^.]*>>)|((#+?)(.*))|({%(.*?)%})|((\[.*\])(\(.*\))|(```))/g;

    return results.map((hit) => {
        const parsedContent = hit.content
            .replace(/{% (\/*?)company-name (.*?)%}/g, config.get('companyName'))
            .replace(regexpStrip, '');

        return {
            uuid: hit.uuid,
            page_title: hit.page_title,
            route: hit.route,
            access_role: hit.access_role,
            repo_version: hit.repo_version,
            active: hit.active,
            project: hit.project,
            published: hit.published,
            kind: hit.kind,
            content: parsedContent,
        };
    });
};

const search: RequestHandler = async (req, res) => {
    try {
        const userRoles = _.get(res, 'locals.user.roles', []) as string[];
        const q = decodeURIComponent(req.query.q as string);
        const esQuery = {
            bool: {
                must: [
                    {
                        multi_match: {
                            query: q,
                            fields: ['content', 'page_title^2'],
                            fuzziness: 'AUTO',

                        },
                    },
                    { match: { file_type: 'markdown' } },
                ],
                filter: {
                    term: {
                        active: true,
                    },
                },
            },
        };

        const docs = await getESDocs(esQuery, userRoles);
        const parsedDocs = parseSearchResults(docs);

        return res.status(200).json(parsedDocs);
    } catch (err) {
        log.error('Elasticsearch error', { err });
        return res.sendStatus(500);
    }
};

const getSpecs: RequestHandler = async function getSpecs(req, res) {
    try {
        const userRoles = _.get(res, 'locals.user.roles', []);
        const esQuery = {
            bool: {
                must: [
                    { term: { 'file_type.keyword': 'yaml' } },
                    { term: { active: true } },
                ],
            },
        };

        log.debug('Elastic search get all specs', { esQuery, userRoles });
        const docs = await getESDocs(esQuery, userRoles);
        return res.status(200).json(docs);
    } catch (err) {
        return res.sendStatus(500);
    }
};

const getSpecProject: RequestHandler = async function getSpecProject(req, res) {
    const userRoles = _.get(res, 'locals.user.roles', []);
    try {
        const { project } = req.params;

        log.debug('Search for project:', { project });

        const esQuery = {
            bool: {
                must: [
                    { term: { 'project.keyword': project } },
                    { term: { 'file_type.keyword': 'yaml' } },
                    { term: { active: true } },
                ],
            },
        };
        const docs = await getESDocs(esQuery, userRoles);

        return res.status(200).json(docs);
    } catch (err) {
        log.error('Elasticsearch error', { err });
        return res.sendStatus(500);
    }
};

export default {
    search,
    getESDocs,
    getSpecs,
    getSpecProject,
};
