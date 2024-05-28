import GithubSlugger from 'github-slugger';

const sluggify = (str: string): string => str.split('/').map((s) => GithubSlugger.slug(s)).join('/');

const unslugify = (routeName: string): string => {
    // replace hyphens with spaces
    let unslugified = routeName.replace(/-/g, ' ');
    // capitalize first letter of each word
    unslugified = unslugified.replace(/\b\w/g, (c) => c.toUpperCase());
    return unslugified;
};

function insertDocsIntoNav(obj: any, routeParts: string[], frontmatter: any) {
    if (routeParts.length === 0) {
        const linkTitleInRoute = unslugify(frontmatter.route.split('/').pop());
        const route = sluggify(frontmatter.route);
        const key = route.split('/').pop();
        Object.assign(obj, {
            ...frontmatter,
            key,
            route,
            linkTitle: frontmatter.linkTitle || linkTitleInRoute,
            documents: {}, // empty object needed for client (usePages.ts hook)
        });
        return;
    }

    const [head, ...tail] = routeParts;

    const sluggedHead = sluggify(head);

    if (!obj.documents) {
        obj.documents = {};
    }

    if (!obj.documents[sluggedHead]) {
        obj.documents[sluggedHead] = {};
    }

    insertDocsIntoNav(obj.documents[sluggedHead], tail, frontmatter);
}

export const createInternalDocsNav = (docs: any[]) => {
    const nav: any = {};

    docs.forEach((item) => {
        const { route } = item.frontmatter;
        const routeParts = route.split('/').slice(1); // Remove the leading empty string
        insertDocsIntoNav(nav, routeParts, item.frontmatter);
    });

    return nav;
};

// Since Internal Dev Docs have plain text routes, we need to find the matching slugged key
export const findMatchingKey = (obj: any, slug: string): string | null => {
    const inputSlug = sluggify(slug);
    const objKeys = Object.keys(obj);

    let foundKey: string | null = null;
    for (let i = 0; i < objKeys.length; i += 1) {
        const key = objKeys[i];
        const keySlug = sluggify(key);
        if (inputSlug === keySlug) {
            foundKey = key;
            break;
        }
    }

    return foundKey;
};

// Create a safe number that we know will be higher than any `index` value
const MAX_SORTING_INDEX = 2000;

// Will sort first by optional index, then alphabetically
function sortInternalDocsNav(documents: any) {
    const sortedKeys = Object.keys(documents).sort((a, b) => {
        const indexA = documents[a].index || MAX_SORTING_INDEX;
        const indexB = documents[b].index || MAX_SORTING_INDEX;

        if (indexA !== indexB) {
            return indexA - indexB;
        }

        return a.localeCompare(b);
    });

    const sortedDocuments: any = {};
    sortedKeys.forEach((key) => {
        const doc = documents[key];
        if (doc.documents && Object.keys(doc.documents).length > 0) {
            doc.documents = sortInternalDocsNav(doc.documents);
        }
        sortedDocuments[key] = doc;
    });

    return sortedDocuments;
}

export { sluggify, unslugify, sortInternalDocsNav };
