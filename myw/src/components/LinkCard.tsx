import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { GradientIcon, IconName } from './GradientIcon';

type Props = {
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

function LinkCard({
  title, description, href, icon,
}: Props) {
  return (
    <div className="group relative rounded-xl border border-gray-200 mb-10">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--link-grid-hover-bg,theme(colors.primary.50)),var(--link-grid-hover-bg,theme(colors.primary.50)))_padding-box,linear-gradient(to_top,theme(colors.secondary.400),theme(colors.primary.400),theme(colors.primary.500))_border-box] group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-xl p-6 flex items-center">
        <div className="mr-6">
          {icon && <GradientIcon color="primary" icon={icon} />}
        </div>
        <div>
          <h2 className="my-2 text-gray-900">
            <Link to={`/docs${href}`} className="!shadow-none">
              <span className="absolute -inset-px rounded-xl" />
              {title}
            </Link>
          </h2>
          <p className="mt-1 text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(LinkCard);
