import clsx from 'clsx';
import React, { ReactNode } from 'react';

const variants = {
  default: '',
  slideOver: 'space-y-6 divide-y divide-gray-200',
};

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}

function Form({
  children, className = '', variant = 'default', ...otherProps
}: Props) {
  return (
    <form
      className={clsx(variants[variant], className)}
      action="/a-fake-action"
      method="POST"
      {...otherProps}
    >
      {children}
    </form>
  );
}

export default Form;
