import { v4 } from 'uuid';
import path from 'path';
import glob from 'glob';
import fs from 'fs';
import Markdoc from '@markdoc/markdoc';

const PLACEHOLDER_DOC = path.join(__dirname, '/placeholder.md');

export function createPlaceholderDoc(route: string) {
    const file = glob.sync(PLACEHOLDER_DOC)[0];
    const rawText = fs.readFileSync(file, 'utf-8');
    const ast = Markdoc.parse(rawText);

    const doc = {
        ast,
        frontmatter: {
            route,
            linkTitle: 'Missing Doc',
            pageTitle: `Missing Doc ${route}`,
            kind: 'concept',
            uuid: v4(),
            access_role: 'admin',
        },
    };
    return doc;
}

