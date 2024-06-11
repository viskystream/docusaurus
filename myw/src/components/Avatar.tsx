import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import clsx from 'clsx';
import { UserIcon } from '@heroicons/react/24/solid';
import Skeleton from './Skeleton';

const sizes = {
  xs: 'w-6 h-6 text-xs font-medium leading-none text-white',
  sm: 'w-8 h-8 text-sm font-medium leading-none text-white',
  md: 'w-10 h-10 font-medium leading-none text-white',
  lg: 'w-12 h-12 text-lg font-medium leading-none text-white',
  xl: 'w-14 h-14 text-xl font-medium leading-none text-white',
  full: 'w-full h-full',
};

const radiuses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
  none: '',
};

type AvatarProps<T extends ElementType> = {
  component?: T
  src?: string
  alt?: string
  size?: keyof typeof sizes
  radius?: keyof typeof radiuses
  loading?: boolean
  children?: ReactNode
  className?: string
  username?: string
}

function Avatar<T extends ElementType = 'div'>({
  component,
  src,
  alt = 'User',
  size = 'sm',
  radius = 'none',
  loading,
  children,
  className,
  username,
  ...rest
}: AvatarProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof AvatarProps<T>>) {
  const Component = component || 'div';
  return (
    <Component {...rest} className={clsx('relative inline-flex overflow-hidden', radiuses[radius])}>
      <Skeleton active={loading}>
        <div className={clsx('flex items-center justify-center', className, sizes[size], {
          rounded: !radius,
          'bg-gray-500': !src,
        })}
        >
          {src && <img src={src} className="w-full h-full" alt={alt} />}
          {username ? (
            <span className="uppercase">{username?.substring(0, 1)}</span>
          ) : (
            <UserIcon className="w-7/12 h-7/12" />
          )}
        </div>
      </Skeleton>
      {children}
    </Component>
  );
}

export default Avatar;
