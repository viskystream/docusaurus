/* eslint-disable camelcase */
import GithubSlugger from 'github-slugger';
import { Config } from '@markdoc/markdoc';

export type ConfigWithSlugger = Config & { slugger: GithubSlugger }

export interface ESDoc {
	content: string
	route: string
	link_title: string
	page_title: string
	access_role: string
	kind: string
	uuid: string
	repo_version: string
	active: boolean
	project: string
	published: number
	file_type: string
	repo_version_major: string
	repo_version_minor: string
	repo_version_patch: string
	ID: string
}
