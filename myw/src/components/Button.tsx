import React, {
  useMemo,
  Fragment,
  ElementType,
  ComponentPropsWithoutRef,
  JSXElementConstructor,
  ReactElement,
} from 'react';
import clsx from 'clsx';
import Skeleton from './Skeleton';
import { InputSize } from './types';
import { StringKeys } from '../services/types';

const classList: StringKeys = {
  root: 'inline-flex rounded-md shadow-sm',
  rootFullWidth: 'w-full',
  common: 'border font-medium transition ease-in-out duration-150 inline-flex items-center justify-center flex-1 disabled:opacity-50 disabled:pointer-events-none',
  variant: {
    primary: 'border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    secondary: 'border-transparent rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    white: 'border-gray-300 shadow-sm rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    blue: 'border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    navy: 'border-transparent rounded-md shadow-sm text-white bg-blue-800 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500',
    black: 'border-transparent rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700',
    red: 'border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
    green: 'border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
    yellow: 'border-transparent rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400',
    transparent: 'border-none bg-transparent focus:outline-none',

  },
  size: {
    xs: 'px-2.5 py-1.5 text-xs leading-4 rounded',
    sm: 'px-3 py-2 text-sm leading-4 rounded-md',
    md: 'px-4 py-2 text-sm leading-5 rounded-md',
    lg: 'px-4 py-2 text-base leading-6 rounded-md',
    xl: 'px-6 py-3 text-base leading-6 rounded-md',
    xxl: 'w-full px-6 py-3 text-base leading-6 rounded-md md:py-4 md:text-lg md:px-10',
  },
  icon: {
    only: {
      sm: '-ml-0.5 -mr-0.5 h-4 w-4',
      md: '-ml-1 -mr-1 h-5 w-5',
      lg: '-ml-1 -mr-1 h-5 w-5',
    },
    leading: {
      sm: '-ml-0.5 mr-2 h-4 w-4',
      md: '-ml-1 mr-2 h-5 w-5',
      lg: '-ml-1 mr-3 h-5 w-5',
    },
    trailing: {
      sm: 'ml-2 -mr-0.5 h-4 w-4',
      md: 'ml-2 -mr-1 h-5 w-5',
      lg: 'ml-3 -mr-1 h-5 w-5',
    },
  },
};

interface IconProps {
  className?: string
}

export type ButtonProps<T extends ElementType> = {
  component?: T
  icon?: (React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>>) | ((props: IconProps) => (JSX.Element | ReactElement<any, string | JSXElementConstructor<any>> | null))
  size?: keyof typeof InputSize
  variant?: 'primary' | 'secondary' | 'white' | 'black' | 'blue' | 'red' | 'green' | 'yellow' | 'transparent' | 'navy'
  loading?: boolean
  children?: React.ReactNode
  className?: string
  componentClassName?: string
  fullWidth?: boolean
  iconTrailing?: boolean
  iconOnly?: boolean
  iconClassName?: string
}

function Button<T extends ElementType = 'button'>({
  component,
  icon: Icon,
  size = 'md',
  variant = 'primary',
  loading,
  children,
  className,
  componentClassName,
  fullWidth,
  iconTrailing,
  iconOnly,
  iconClassName,
  ...rest
}: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const content = useMemo(() => (
    <Fragment>
      {Icon && size !== 'xs' && iconOnly ? (
        <Icon className={clsx(iconClassName, classList.icon.only[size])} />
      ) : null}
      {Icon && size !== 'xs' && (!iconTrailing && !iconOnly) ? (
        <Icon className={clsx(iconClassName, classList.icon.leading[size] || classList.icon.leading.lg)} />
      ) : null}
      {children}
      {Icon && size !== 'xs' && (iconTrailing && !iconOnly) ? (
        <Icon className={clsx(iconClassName, classList.icon.trailing[size] || classList.icon.trailing.lg)} />
      ) : null}
    </Fragment>
  ), [
    Icon,
    iconOnly,
    size,
    children,
    iconTrailing,
  ]);

  const Component = component || 'button';

  return (
    <span className={clsx({
      [classList.root]: true,
      [classList.rootFullWidth]: fullWidth,
      'shadow-none': loading,
    }, className)}
    >
      <Skeleton active={loading}>
        <Component
          className={clsx({
            [classList.common]: true,
            [classList.size[size]]: true,
            [classList.variant[variant]]: !!classList.variant[variant],
          }, componentClassName)}
          {...rest}
        >
          {content}
        </Component>
      </Skeleton>
    </span>
  );
}

export default Button;
