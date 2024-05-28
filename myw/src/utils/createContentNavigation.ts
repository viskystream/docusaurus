import { log } from '../../log';
import { ContentManifest } from './createContentManifest';
import { createPlaceholderDoc } from './createPlaceholderDoc';
import { filterEsDocsByUserRole } from './filterEsDocsByUserRole';
import { createInternalDocsNav, sortInternalDocsNav } from './docHelpers';

export interface ContentNavigation {
	key: string
	route: string
	pageTitle: string
	documents: ContentNavigation | Record<string, never>
	roles: string[]
	kind: string
}

/**
 * This object determines the layout of the links within the side nav.
 *
 * If you are adding to this object, make sure that the route in your doc's frontmatter matches
 * the nested path in this object.
 *
 * Example:
 *
 * route: /introduction/types-of-streaming/choosing-a-streaming-method
 *
 */
const navOrder = {
    introduction: {
        'types-of-streaming': {
            'choosing-a-streaming-method': {},
        },
        'types-of-streams': {
            'choosing-a-stream-type': {},
        },
        'device-support': {},
    },
    'broadcasting-a-livestream': {
        'streaming-with-external-software': {
            'stream-with-obs-studio': {},
            'input-a-private-key': {},
        },
        'streaming-with-a-web-browser': {
            'set-up-a-livestream-video': {},
            'livestream-a-canvas-element': {},
        },
        'geographic-distribution': {},
        'adjust-for-geographic-distribution': {},
    },
    'consuming-a-livestream': {
        'view-a-stream': {},
        'what-is-a-manifest': {},
        'play-a-stream-using-a-manifest': {},
        'server-side-stream-consumption': {
            'consume-a-stream-server-side': {},
        },
    },
    'livestream-interactions': {
        'types-of-interactions': {},
        'direct-streaming-broadcaster': {},
        'direct-streaming-viewer': {},
        'create-a-group-call': {},
    },
    'basic-operator-integration': {
        'video-client': {
            'event-handling': {},
            'core-concepts': {},
        },
        'native-mobile-applications': {
            'livestream-from-an-ios-application': {
                'broadcast-a-livestream': {},
                'consume-a-livestream': {},
                'create-a-group-call': {},
            },
            'livestream-from-an-android-application': {
                'broadcast-a-livestream': {},
                'consume-a-livestream': {},
            },
        },
        'methods-of-authorization': {
            'authentication-tokens': {
                'set-up-token-based-authorization': {},
                'using-an-auth-token-in-the-browser': {},
            },
            'authentication-webhooks': {
                'set-up-webhook-based-authorization': {},
            },
            'authorized-vs-public-streams': {
                'generate-private-key-for-a-streamer': {},
                'configure-viewer-authentication': {},
            },
        },
        'configure-chat': {},
        'bring-your-own-infrastructure': {},
    },
    'customizing-a-stream': {
        'transcode-configuration': {},
        'add-watermarks': {},
        'stream-blurring': {
            'blur-a-stream': {},
        },
    },
    'archiving-a-stream': {
        'archive-a-full-broadcast': {},
        'record-clips': {},
        'record-snippets-at-an-interval': {},
        'create-still-images': {},
    },
    'administration-tools': {
        'identifying-streams': {},
        'backend-video-infrastructure': {},
        'monitoring-streams': {
            'integrate-with-stats': {},
            'monitor-stream-stability': {},
            'monitor-stream-quality': {},
        },
        'monitoring-archives': {},
        'transcoding-details': {},
        'authorization-events': {},
        'other-events': {},
    },
    chat: {
        'getting-started': {},
        configuration: {},
        roles: {},
        commands: {},
    },
    glossary: {},
};

export const createContentNavigation = (contentManifest: ContentManifest, roles: string[]) => {
    const nav: ContentNavigation = {
        key: 'root',
        route: '',
        pageTitle: '',
        documents: {},
        roles: [],
        kind: '',
    };

    // Remove any undefined docs from the manifest
    contentManifest = Object.fromEntries(
        Object.entries(contentManifest).filter(([key]) => key !== 'undefined'),
    );

    function recursivelyCreateNavTree<T extends object>(navTree: ContentNavigation, navOrderNode: T, route) {
        const keys = Object.keys(navOrderNode);
        keys.forEach((key) => {
            const currentRoute = `${route}/${key}`;
            let doc = contentManifest[currentRoute];

            let hasRole = true;

            if (doc && doc.frontmatter.access_role) {
                hasRole = false;
                roles.forEach((group) => {
                    if (doc.frontmatter.access_role.includes(group)) {
                        hasRole = true;
                    }
                });
            }

            if (!doc) {
                log.error('Error in nav structure. No document with route:', { route: currentRoute });
                doc = createPlaceholderDoc(currentRoute);
            } else {
                // remove the doc from the manifest, we will handle any remaining docs later
                delete contentManifest[currentRoute];
            }

            if (!hasRole) {
                return;
            }

            navTree.documents[key] = {
                key,
                documents: {},
                ...doc.frontmatter,
            };

            recursivelyCreateNavTree(navTree.documents[key], navOrderNode[key], currentRoute);
        });
    }

    recursivelyCreateNavTree(nav, navOrder, '');

    /**
	 * Handle Internal Developer Docs, which use plain-text `routes` as well
	 * as an optional `index` property to sort the document in relation to
	 * other docs at the same level of the hierarchy as itself.
	 *
	 * e.g. Example Frontmatter
	 * ------------------
	 * route: "/Internal Developer Docs/Dev Center/Dev Center Groups"
	 * index: 2
	 * ....
	 * ------------------
	 */
    const devDocsNamePlain = '/Internal Developer Docs';
    const devDocsNameSlug = '/internal-developer-docs';
    // Checking plain & slugged names is meant to be a temporary check but
    // we might want to leave it in in case devs forget the plain-text `route` format
    const devDocsNameRegex = new RegExp(`(${devDocsNamePlain}|${devDocsNameSlug})`);
    if (roles.includes('admin')) {
        const devDocs = Object.values(contentManifest)
            .filter((doc) => {
                const route = doc?.frontmatter?.route;
                return route && devDocsNameRegex.test(route);
            })
        // sort by route name to make the later grouping easier
            ?.sort((a, b) => a.frontmatter.route.localeCompare(b.frontmatter.route));

        if (devDocs.length) {
            const groupedDevDocs = createInternalDocsNav(devDocs);
            const sortedDevDocs = sortInternalDocsNav(groupedDevDocs.documents);

            nav.documents['internal-developer-docs'] = sortedDevDocs['internal-developer-docs'];
        }
    }
    // Remove internal developer docs from the manifest
    // so they aren't seen as missing from the config
    Object.keys(contentManifest).forEach((key) => {
        if (devDocsNameRegex.test(key)) {
            delete contentManifest[key];
        }
    });

    /**
	 * Handle any docs that remain in the manifest, meaning they were not added to the navOrder config
	 */
    if (roles.includes('admin')) {
        const remainingDocs = Object.values(contentManifest)
            .filter((doc) => doc.frontmatter?.route)
            .map((doc) => ({ ...doc.frontmatter, access_role: doc.frontmatter.access_role || '' }));

        const filteredDocs = filterEsDocsByUserRole(roles, remainingDocs);
        filteredDocs.forEach((doc) => {
            const key = doc.route.split('/').pop();

            nav.documents[key] = {
                key,
                documents: {},
                ...doc,
                linkTitle: `Fix Config - ${doc.linkTitle}`,
            };
        });
    }

    return nav;
};
