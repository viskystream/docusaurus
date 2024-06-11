import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface InputLabelProps {
  id?: string
  hint?: ReactNode | string
  inline?: boolean
  hidden?: boolean
  children: React.ReactNode
  className?: string,
  labelClassName?: string,
}

function InputLabel({
  id,
  hint,
  inline,
  hidden,
  children,
  className,
  labelClassName,
}: InputLabelProps) {
  return (
    <div className={clsx({
      'sr-only': hidden,
      'flex justify-between mb-1': !hidden,
      'sm:mt-px sm:pt-2': inline,
    }, className)}
    >
      <label htmlFor={id} className={clsx('block text-sm font-medium text-gray-700', labelClassName)}>{children}</label>
      {hint ? (
        <span className="flex text-sm text-gray-500">{hint}</span>
      ) : null}
    </div>
  );
}

export default InputLabel;
