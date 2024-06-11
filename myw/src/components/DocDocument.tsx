import React, {
    Fragment, memo, useCallback, useRef,
} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

/**
 * Components
 */

import Prose from './Prose';
import { useDispatch } from 'react-redux';
import DocsTableOfContents from './DocsTableOfContents';

/**
 * Hooks
 */
import useFetchMarkdoc from '../hooks/useFetchMarkdoc';
import useDocParams from '../hooks/useDocParams';
import usePages from '../hooks/usePages';
import useResizeObserver from '../hooks/useResizeObserver';
import { increment } from './docsSlice';
import useScrollToHash from '../hooks/useScrollToHash';
interface DocsDocumentProps {
    externalData?: any; // Adjust the type based on your AST structure
}
function DocsDocument({ externalData }: DocsDocumentProps) {
    const dispatch = useDispatch();
    const { section, path } = useDocParams();
    const { activePage, nextPage, prevPage } = usePages();
    const data = externalData || useFetchMarkdoc({ path });
    const {
        render, tableOfContents, error, loading, loadedPath, roles,
    } = data;

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [activePage]);

    /**
     * Check loaded state
     */
    const loaded = !loading && loadedPath === path;
    const loadedClass = clsx({
        'opacity-0': !loaded,
        'opacity-1 transition-opacity duration-200': loaded,
    });

    useScrollToHash(loaded);

    /**
     * Trigger TOC render on layout change
     */
    const docRef = useRef(null);
    const onResize = useCallback(() => dispatch(increment()), [dispatch]);
    useResizeObserver(docRef.current, onResize);

    const isGlossary = path === '/glossary';

    if (error) {
        console.log('NOT FOUND', error);
        return
    }

    return (
        <Fragment>
            <div className={`min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16 ${loadedClass}`}>
                <article>
                    {(roles.length === 1 && roles.includes('admin')) && (
                        <div className="font-bold mb-2">This page can only be viewed by internal employees.</div>
                    )}
                    {(activePage?.pageTitle || section) && (
                        <header className="mb-9 space-y-1">
                            {section && !isGlossary && (
                                <p className="font-display text-sm font-medium text-primary-500 capitalize">
                                    {section}
                                </p>
                            )}
                            {activePage?.pageTitle && (
                                <h1 className="font-display text-3xl tracking-tight text-gray-900 ">
                                    {activePage?.pageTitle}
                                </h1>
                            )}
                        </header>
                    )}
                    <div ref={docRef} id="portal-destination">
                        <Prose>{render}</Prose>
                    </div>
                </article>

                <dl className="mt-12 flex border-t border-gray-200 pt-6">
                    {prevPage && (
                        <div>
                            <dt className="font-display text-sm font-medium text-gray-900 ">Previous</dt>
                            <dd className="mt-1">
                                <Link
                                    to={`/docs${prevPage?.route}`}
                                    className="text-base font-semibold text-gray-500 hover:text-gray-600"
                                >
                                    &larr;
                                    {' '}
                                    {prevPage?.title}
                                </Link>
                            </dd>
                        </div>
                    )}
                    {nextPage && (
                        <div className="ml-auto text-right">
                            <dt className="font-display text-sm font-medium text-gray-900 ">Next</dt>
                            <dd className="mt-1">
                                <Link
                                    to={`/docs${nextPage?.route}`}
                                    className="text-base font-semibold text-gray-500 hover:text-gray-600"
                                >
                                    {nextPage?.title}
                                    {' '}
                                    &rarr;
                                </Link>
                            </dd>
                        </div>
                    )}
                </dl>
            </div>
            {tableOfContents && (
                <DocsTableOfContents className={loadedClass} tableOfContents={tableOfContents} />
            )}
        </Fragment>
    );
}

export default memo(DocsDocument);
