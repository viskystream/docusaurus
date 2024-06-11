import React, { ReactNode, memo } from 'react';
import clsx from 'clsx';

type ProseProps = {
  className?: string;
  id?: string;
  children: ReactNode;
};

function Prose({ className = '', ...props }: ProseProps) {
  return (
    <div
      className={clsx(
        className,
        'prose prose-gray max-w-none',
        // headings
        'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8rem]',
        // lead
        'prose-lead:text-gray-500',
        // links
        'prose-a:font-semibold',
        // link underline
        'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.primary.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.gray.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.primary.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
        // pre
        'prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:shadow-lg',
        // hr
        '',
      )}
      {...props}
    />
  );
}

export default memo(Prose);
