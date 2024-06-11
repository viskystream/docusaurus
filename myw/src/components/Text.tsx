import React, { ElementType, useMemo } from 'react';
import clsx from 'clsx';
import { StringKeys } from '../services/types';

const sizes = {
  default: 'text-base',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const weights = {
  default: 'font-normal',
  bold: 'font-bold',
  light: 'font-light',
  medium: 'font-medium',
  semibold: 'font-semibold',
};

const transforms = {
  none: 'normal-case',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
};

const lineHeights = {
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loos',
};

const variants: StringKeys = {
  primary: {
    transform: transforms,
    weight: weights,
    size: sizes,
    lineHeight: lineHeights,
    shade: {
      white: 'text-white',
      default: 'text-gray-700',
      light: 'text-gray-500',
      dark: 'text-gray-900',
    },
  },
  secondary: {
    transform: transforms,
    weight: weights,
    size: sizes,
    lineHeight: lineHeights,
    shade: {
      white: 'text-white',
      default: 'text-cool-gray-500',
      dark: 'text-cool-gray-700',
      light: 'text-cool-gray-400',
    },
  },
};

interface ClassNames extends StringKeys {
  lineHeight?: keyof typeof lineHeights,
  transform?: string,
  weight?: keyof typeof weights,
  shade?: string,
  size: keyof typeof sizes,
}

interface TextProps extends ClassNames {
  component?: ElementType,
  children: React.ReactNode,
  className?: string,
  truncate?: boolean,
  variant?: keyof typeof variants,
}

function Text({
  component: Component = 'p',
  lineHeight,
  transform,
  className,
  children,
  truncate,
  variant = 'primary',
  weight,
  shade,
  size,
  ...rest
}: TextProps) {
  const classNames = useMemo(() => {
    const params: ClassNames = {
      size, shade, weight, transform, lineHeight,
    };
    const modifiers = variants[variant];

    return clsx(Object.keys(params).map((name) => {
      const value = params[name];

      if (modifiers[name] && modifiers[name][value]) {
        return modifiers[name][value];
      }

      if (modifiers[name] && modifiers[name].default) {
        return modifiers[name].default;
      }

      return null;
    }).filter((clssName) => !!clssName), {
      truncate,
    }, className);
  }, [
    size,
    shade,
    weight,
    variant,
    truncate,
    transform,
    lineHeight,
    className,
  ]);

  return (
    <Component {...rest} className={classNames}>
      {children}
    </Component>
  );
}

Text.defaultProps = {
  variant: 'primary',
  component: 'p',
};

export function TextSecondary(props:TextProps) {
  return <Text {...props} variant="secondary" />;
}

export default Text;
