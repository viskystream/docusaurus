import React from 'react';
import clsx from 'clsx';
import Input, { InputProps } from './Input';

interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

interface BaseSelectProps {
  labelClassName?: string,
  options: Option[]
}

export type SelectProps = BaseSelectProps & Omit<InputProps<'select'>, keyof BaseSelectProps>

function Select({
  options,
  inputClassName,
  ...rest
}: SelectProps) {
  return (
    <Input {...rest} as="select" inputClassName={clsx('invalid:text-gray-400', inputClassName)}>
      {options.map(({ value, label, ...props }) => <option value={value} key={value} {...props}>{label}</option>)}
    </Input>
  );
}

export default Select;
