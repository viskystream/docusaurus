import clsx from 'clsx';
import React, { memo, ReactNode } from 'react';

const variants = {
  default: 'space-y-6',
  condensed: 'space-y-3',
  inline: '',
};
interface Props {
  children: ReactNode,
  className?: string,
  variant?: keyof typeof variants,
}
function FormContent({ children, className, variant = 'default' }: Props) {
  return <div className={clsx(variants[variant], className)}>{children}</div>;
}

export default memo(FormContent);
