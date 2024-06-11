import React, { ReactNode, useMemo } from 'react';
import clsx from 'clsx';

interface Props {
	children: ReactNode,
	item?: boolean,
  className?: string,
	columns?: string,
	span?: string,
	gap?:string,
}

function DashboardGrid({
  children,
  className,
  columns,
  span,
  item,
  gap,
  ...otherProps
}:Props) {
  const includeDefaultSpan = useMemo(() => {
    if (!item) {
      return false;
    }

    if (typeof span !== 'string') {
      return true;
    }

    return span.indexOf(':') === 2;
  }, [
    span,
    item,
  ]);

  if (item) {
    return (
      <div
        className={clsx({ 'col-span-full': includeDefaultSpan }, span, className)}
        {...otherProps}
      >
        { children }
      </div>
    );
  }

  return (
    <div className={clsx('grid', columns, gap, className)} {...otherProps}>
      { children }
    </div>
  );
}

DashboardGrid.defaultProps = {
  gap: 'gap-6 md:gap-8',
  columns: 'grid-cols-12',
};

export default DashboardGrid;
