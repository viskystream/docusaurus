/* eslint-disable no-restricted-syntax */
import { log } from '../../log';

/**
 * Replace glossary terms with Markdoc definition-hover tags
 * returns markdownContent with glossary terms replaced
 */
export const injectGlossaryTerms = (markdownContent: string, glossaryTerms: string[]) => {
    try {
        /**
     * Strip out sections that should not be modified.
     * - frontmatter, headers, code snippets, links, util tool snippets, markdoc tags
     *
     * @todo we may need to account for some content between open/closing
     *       mardoc tags, but some must also be included (e.g. {% tab-panel-item %}).
     */
        const regexpStrip = /(`[^`]*`)|(?:\|.*\|)|(<<[^.]*>>)|(---[^.]*---)|((#+?)(.*))|({%(.*?)%})|(^```(?:[a-zA-Z]*?)\n([\s\S]*?)```$)|((\[.*\])(\(.*\)))/g;
        const matchesToIgnore = markdownContent.match(regexpStrip);

        if (matchesToIgnore) {
            matchesToIgnore.forEach((match, index) => {
                markdownContent = markdownContent.replace(match, `<---${index}--->`);
            });
        }

        /**
     * Replace glossary terms with markdoc tags.
     * Only replace first instance within each page.
     */
        const regexpReplaceTerm = (term) => new RegExp(`(\\b${`${term.replace('-', ' ')}`}\\b)`, 'i');
        const replacerFunction = (match) => `{% definition-hover path="${match.toLowerCase().replace(/\s+/g, '-')}" %}${match}{% /definition-hover %}`;
        for (const term of glossaryTerms) {
            markdownContent = markdownContent.replace(regexpReplaceTerm(term), replacerFunction);
        }

        /**
     * Restore sections that we stripped out earlier
     */
        const regexpRestore = /<---[0-9]+--->/g;
        const matchesToRestore = markdownContent.match(regexpRestore);
        matchesToRestore.forEach((match, index) => {
            markdownContent = markdownContent.replace(match, matchesToIgnore[index]);
        });

        return markdownContent;
    } catch (error) {
        log.error('Error injecting glossary terms', { error });
        return markdownContent;
    }
};
