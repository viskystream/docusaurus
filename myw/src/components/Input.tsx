import React, {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import InputLabel from './InputLabel';
import Skeleton from './Skeleton';

export interface BaseInputProps<T extends ElementType = 'input'> {
  icon?: (
    React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>
  ) | (
    (props: React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }) => JSX.Element
  )
  id?: string
  name?: string
  as?: T
  type?: 'text' | 'email' | 'password' | 'number' | 'date'
  hint?: string | ReactNode
  label?: ReactNode
  description?: ReactNode
  addon?: string
  error?: { text?: string } | string
  inline?: boolean
  loading?: boolean
  className?: string
  labelClassName?: string
  disabled?: boolean
  children?: ReactNode
  iconPosition?: 'start' | 'end'
  inputClassName?: string,
  adornmentClassName?: string,
  onAdornmentClick?: React.MouseEventHandler<SVGSVGElement>
  textAdornmentEnd?: string | null
  textAdornmentStart?: string | null
  renderLabel?: string
  ref?: any
}

export type InputProps<T extends ElementType = 'input'> = BaseInputProps<T>
  & Omit<ComponentPropsWithoutRef<T>, keyof BaseInputProps<T>>

function Input<T extends ElementType = 'input'>({
  icon,
  id,
  name,
  type,
  as,
  hint,
  label,
  description,
  children,
  addon,
  error,
  inline,
  loading,
  className,
  disabled,
  iconPosition = 'start',
  inputClassName,
  labelClassName,
  adornmentClassName,
  onAdornmentClick,
  textAdornmentEnd = null,
  textAdornmentStart = null,
  renderLabel,
  ...rest
}: InputProps<T>) {
  const identifier = useMemo(() => {
    if (id) {
      return id;
    }

    return `input__${Math.round(Date.now() * Math.random())}`;
  }, [id]);

  const adornment = useMemo(() => {
    const Component = error ? ExclamationCircleIcon : icon;
    const position = as === 'select' ? 'start' : error ? 'end' : iconPosition;

    if (!Component) {
      return {};
    }

    return {
      [position]: (
        <div className={clsx('absolute inset-y-0 flex items-center', {
          'right-0 pr-3': position === 'end',
          'left-0 pl-3': position === 'start',
          'pointer-events-none': !onAdornmentClick,
        })}
        >
          <Component
            onClick={onAdornmentClick}
            className={clsx({
              'h-5 w-5': true,
              'text-gray-400': !error,
              'text-red-500': error,
              'cursor-pointer select-none': onAdornmentClick,
            }, adornmentClassName)}
          />
        </div>
      ),
    };
  }, [error, icon, as, iconPosition, onAdornmentClick, adornmentClassName]);

  const classNames = useMemo(() => clsx('block w-full sm:text-sm', {
    'rounded-md': !addon,
    'rounded-r-md': addon,
    'focus:ring-primary-500 focus:border-primary-500 border-gray-300': !error,
    'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': error,
    'pr-10': adornment.end,
    'pl-10': adornment.start,
    'pl-7': textAdornmentStart,
    'pr-12': textAdornmentEnd,
    'form-textarea': as === 'textarea',
    'form-select': as === 'select',
    'form-input': as !== 'select' && as !== 'textarea',
  }, inputClassName), [
    inputClassName,
    adornment,
    addon,
    textAdornmentStart,
    textAdornmentEnd,
    error,
    as,
  ]);

  const Component = useMemo(() => {
    switch (as) {
      case 'textarea':
        return 'textarea';
      case 'select':
        return 'select';
      default:
        return 'input';
    }
  }, [as]);

  return (
    <div className={clsx({
      'sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5': inline,
      'opacity-50': disabled,
    }, className)}
    >
      {label ? (
        <InputLabel id={identifier} hint={hint} inline={inline} className={inputClassName} labelClassName={labelClassName}>{label}</InputLabel>
      ) : null}
      {renderLabel}
      <div className={clsx({
        flex: !!addon,
        'shadow-sm': !loading,
        'sm:col-span-2 sm:max-w-lg': inline,
      }, 'relative rounded-md')}
      >
        {addon ? (
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            {addon}
          </span>
        ) : null}
        {adornment.start}
        {textAdornmentStart && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              {textAdornmentStart}
            </span>
          </div>
        )}
        <Skeleton active={loading}>
          <Component
            id={identifier}
            name={name}
            type={type}
            className={classNames}
            disabled={disabled}
            {...rest}
          >
            {children}
          </Component>
        </Skeleton>
        {textAdornmentEnd && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm" id="price-currency">
              {textAdornmentEnd}
            </span>
          </div>
        )}
        {adornment.end}
      </div>
      {error ? (
        <p
          className={clsx('text-sm text-red-600', {
            'mt-2': !inline,
            'mt-2 sm:-mt-2 sm:col-start-2 sm:col-span-2 sm:max-w-lg': inline,
          })}
          id={`${id}-error`}
        >
          {typeof error === 'object' ? error?.text : error}
        </p>
      ) : (
        description ? (
          <p className="text-gray-500 pt-1">{description}</p>
        ) : null
      )}
    </div>
  );
}

export default Input;
