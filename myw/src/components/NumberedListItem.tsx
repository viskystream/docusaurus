import Markdoc from '@markdoc/markdoc';
import clsx from 'clsx';
import React, { memo, ReactNode } from 'react';

export interface NumberedListItemProps {
  children: ReactNode
  header: string
  number: string
  id?: string
  size?: 'sm' | 'md' | 'lg'
  alignNumberWithHeader: 'bottom' | 'top' | 'center'
  withBorderBottom?: boolean
}

const numberStyles = {
  sm: 'text-sm m-[0.095rem]',
  md: 'text-base m-[0.125rem]',
  lg: 'text-lg m-[0.150rem]',
};
const fontSize = {
  sm: 'text-base',
  md: 'text-2xl',
  lg: 'text-3xl',
};
const dimensions = {
  sm: 'w-8 h-8',
  md: 'w-9 h-9',
  lg: 'w-10 h-10',
};
const numberAlign = {
  bottom: 'items-end',
  top: 'items-start',
  center: 'items-center',
};
const cols = {
  sm: 'grid-cols-[40px_1fr]',
  md: 'grid-cols-[40px_1fr]',
  lg: 'grid-cols-[45px_1fr]',
};

const NumberedListItem = memo(({
  children,
  number,
  header,
  id,
  size = 'md',
  alignNumberWithHeader = 'top',
  withBorderBottom = false,
}: NumberedListItemProps) => {
  const ast = Markdoc.parse(header);
  const content = Markdoc.transform(ast);

  return (
    <div
      id={id}
      className={clsx({
        'border-b': withBorderBottom,
      })}
    >
      <div className={clsx('grid', cols[size])}>
        <div className={clsx(numberAlign[alignNumberWithHeader], 'flex')}>
          <div className={clsx(dimensions[size], 'border-2 border-primary-200 rounded-full flex justify-center items-center')}>
            <div
              className={clsx(
                numberStyles[size],
                'bg-primary-400 border-transparent rounded-full flex justify-center items-center w-full h-[-webkit-fill-available] text-white',
              )}
            >
              {number}
            </div>
          </div>
        </div>
        <div className={clsx(fontSize[size], `prose-code:${fontSize[size]}`, 'prose-p:m-0 flex items-center font-semibold')}>
          {Markdoc.renderers.react(content, React)}
        </div>
      </div>
      <div className="grid grid-cols-[40px_1fr]">
        <div />
        <div className="overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
});

export default NumberedListItem;
