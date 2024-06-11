import clsx from 'clsx';
import React, { ReactNode, memo } from 'react';
import { GradientIcon } from './GradientIcon';

const variants: StringKeys = {
  note: {
    container: 'bg-sky-50',
    title: 'text-sky-900',
    body: 'text-sky-800 prose-code:text-sky-900 prose-a:text-sky-900 [--tw-prose-background:theme(colors.sky.50)]',
  },
  warning: {
    container: 'bg-amber-50',
    title: 'text-amber-900',
    body: `
      text-amber-800 prose-code:text-amber-900 prose-a:text-amber-900 
      [--tw-prose-underline:theme(colors.amber.400)][--tw-prose-background:theme(colors.amber.50)]
    `,
  },
  todo: {
    container: 'bg-indigo-50',
    title: 'text-indigo-900',
    body: `
      text-indigo-800 prose-code:text-indigo-900 prose-a:text-indigo-900 
      [--tw-prose-underline:theme(colors.indigo.400)][--tw-prose-background:theme(colors.indigo.50)]
    `,
  },
};

type CalloutProps = {
  type: 'note' | 'warning' | 'todo';
  title: string;
  children: ReactNode;
};

const Callout = memo(({ type = 'note', title, children }: CalloutProps) => (
  <div className={clsx('my-8 flex rounded-3xl p-6', variants[type].container)}>
    {type === 'note' && <GradientIcon icon="LightBulbIcon" />}
    {type === 'todo' && <GradientIcon color="indigo" icon="ExclamationCircleIcon" />}
    {type === 'warning' && <GradientIcon color="amber" icon="ExclamationCircleIcon" />}
    <div className="ml-4 flex-auto">
      <p className={clsx('m-0 font-display text-xl', variants[type].title)}>{title}</p>
      <div className={clsx('prose mt-2.5', variants[type].body)}>{children}</div>
    </div>
  </div>
));

export default Callout;
