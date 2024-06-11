import React, { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type LinkGridProps = {
  children: ReactNode;
};

const LinkGrid = memo(({ children }: LinkGridProps) => (
  <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>
));

type LinkGridLinkProps = {
  title: string;
  description: string;
  href: string;
};

const LinkGridLink = memo(({
  title, description, href,
}: LinkGridLinkProps) => (
  <div className="group relative rounded-xl border border-gray-200 ">
    <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--link-grid-hover-bg,theme(colors.primary.50)),var(--link-grid-hover-bg,theme(colors.primary.50)))_padding-box,linear-gradient(to_top,theme(colors.secondary.400),theme(colors.primary.400),theme(colors.primary.500))_border-box] group-hover:opacity-100" />
    <div className="relative overflow-hidden rounded-xl p-6">
      <h2 className="font-display text-base text-gray-900">
        <Link to={`/docs${href}`}>
          <span className="absolute -inset-px rounded-xl" />
          {title}
        </Link>
      </h2>
      <p className="mt-1 text-sm text-gray-700">{description}</p>
    </div>
  </div>
));

export { LinkGrid, LinkGridLink };
