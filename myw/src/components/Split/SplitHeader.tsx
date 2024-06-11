import React, { memo, ReactNode } from 'react';
import Breadcrumbs, { BreadcrumbsPage } from '../Breadcrumbs';

function SplitHeader({ title, children, pages }: { title: ReactNode, children?: ReactNode, pages?: BreadcrumbsPage[] }) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between mb-6">
      <div className="min-w-0 flex-1">
        {pages && <Breadcrumbs pages={pages} />}
        <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
          {title}
        </h2>
      </div>
      { children && (
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          {children}
        </div>
      ) }
    </div>
  );
}

export default memo(SplitHeader);
