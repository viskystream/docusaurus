import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import useHighlightTOC from '../hooks/useHighlightTOC';
import { TableOfContents } from '../utils/generateTableOfContents';

type DocsTableOfContentsProps = {
    tableOfContents: TableOfContents
    className?: string
}

function DocsTableOfContents({ className = '', tableOfContents = [] }: DocsTableOfContentsProps) {
    const highlightedTOC = useHighlightTOC({ tableOfContents });
    return (
        // eslint-disable-next-line max-len
        <div className={`hidden self-start xl:sticky xl:top-[7.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-7.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6 ${className}`}>
            <nav aria-labelledby="on-this-page-title" className="w-56">
                {highlightedTOC.length > 0 && (
                    <>
                        <h2 id="on-this-page-title" className="font-display text-sm font-medium text-gray-900">
                            On this page
                        </h2>
                        <ul className="mt-4 space-y-3 text-sm">
                            {highlightedTOC.map((section) => (
                                <li key={section.id}>
                                    <h3 className={section.tagName === 'h3' ? 'pl-5' : ''}>
                                        <Link
                                            reloadDocument
                                            to={`${window.location.search}#${section.id}`}
                                            className={section.highlighted ? 'text-primary-500' : 'font-normal text-gray-500 hover:text-gray-700'}
                                        >
                                            {section.title}
                                        </Link>
                                    </h3>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </nav>
        </div>
    );
}

export default memo(DocsTableOfContents);
