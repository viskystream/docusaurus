import React, { useId, memo } from 'react';
import clsx from 'clsx';
import OutlineIcon, { IconName } from '../components/OutlineIcon';

/* eslint-disable */
const config = require('../tailwindcss-config-client');
/* eslint-enable */

const gradients: StringKeys = {
  primary: [
    { stopColor: config.theme.extend.colors.primary['500'] },
    { stopColor: config.theme.extend.colors.primary['400'], offset: '.527' },
    { stopColor: config.theme.extend.colors.secondary['400'], offset: 1 },
  ],
  blue: [
    { stopColor: '#0EA5E9' },
    { stopColor: '#22D3EE', offset: '.527' },
    { stopColor: '#818CF8', offset: 1 },
  ],
  amber: [
    { stopColor: '#FDE68A', offset: '.08' },
    { stopColor: '#F59E0B', offset: '.837' },
  ],
  indigo: [
    { stopColor: '#C7D2FE', offset: '.08' },
    { stopColor: '#6366F1', offset: '.837' },
  ],
};

const variants: StringKeys = {
  indigo: 'stroke-indigo-900',
  amber: 'stroke-amber-900',
  blue: 'stroke-slate-900',
  primary: 'stroke-gray-900',
};

type GradientProps = {
  color?: 'blue' | 'amber' | 'indigo' | 'primary';
  id?: string;
  gradientTransform: string;
};

const Gradient = memo(({ color = 'blue', ...props }: GradientProps) => (
  <radialGradient cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" {...props}>
    {gradients[color].map((stop: { stopColor: string; offset: string | number }) => (
      <stop key={stop.stopColor} {...stop} />
    ))}
  </radialGradient>
));

type GradientIconProps = {
  icon: IconName;
  color?: 'blue' | 'amber' | 'indigo' | 'primary';
  className?: string;
};

const GradientIcon = memo(
  ({
    color = 'blue', icon, className = '', ...props
  }: GradientIconProps) => {
    const id = useId();

    return (
      <div className="relative h-10 w-10">
        <OutlineIcon icon={icon} className={clsx('absolute h-10 w-10', variants[color])} />
        <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className={className} {...props}>
          <defs>
            <Gradient
              id={`${id}-gradient`}
              color={color}
              gradientTransform="rotate(65.924 1.519 20.92) scale(25.7391)"
            />
          </defs>

          <circle cx={20} cy={20} r={12} fill={`url(#${id}-gradient)`} />
        </svg>
      </div>
    );
  },
);

export { Gradient, GradientIcon };
export type { IconName };
