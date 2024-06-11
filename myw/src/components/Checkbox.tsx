import React, { InputHTMLAttributes, ReactNode, useMemo } from 'react';
import clsx from 'clsx';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  name?: string
  children?: ReactNode
  className?: string
  inputClassName?: string
}

function Checkbox({
  id,
  name,
  children,
  className,
  inputClassName,
  ...rest
}: CheckboxProps) {
  const identifier = useMemo(() => {
    if (id) {
      return id;
    }

    return `checkbox__${Math.round(Date.now() * Math.random())}`;
  }, [id]);

  return (
    <div className={clsx('flex items-center', className)}>
      <input
        name={name}
        id={identifier}
        type="checkbox"
        className={clsx(inputClassName, 'h-4 w-4 cursor-pointer text-primary-600 focus:ring-primary-500 border-gray-300 rounded form-checkbox')}
        {...rest}
      />
      <label htmlFor={identifier} className="ml-2 block text-sm text-gray-900 cursor-pointer truncate">
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
