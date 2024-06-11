import clsx from 'clsx';
import React, { memo, ReactNode } from 'react';
import { NumberedListItemProps } from './NumberedListItem';

interface NumberedListProps {
  children: ReactNode
  spacing?: 'sm' | 'md' | 'lg'
  size?: 'sm' | 'md' | 'lg'
  listItemProps?: Omit<NumberedListItemProps, 'size' | 'number'>
  marginY?: 'sm' | 'md' | 'lg'
}

const spacingValues = {
  sm: 'gap-3',
  md: 'gap-7',
  lg: 'gap-14',
};

const marginYValues = {
  sm: 'my-2',
  md: 'my-8',
  lg: 'my-12',
};

const NumberedList = memo(({
  children,
  spacing = 'sm',
  size = 'sm',
  listItemProps,
  marginY = 'sm',
}: NumberedListProps) => {
  const { alignNumberWithHeader = 'top', withBorderBottom = false, ...restOfListItemProps } = listItemProps ?? {};

  return (
    <div className={clsx(spacingValues[spacing], marginYValues[marginY], 'flex flex-col')}>
      {React.Children.map(children, (child, index) => (
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<NumberedListItemProps>, {
            size,
            number: `${index + 1}`,
            alignNumberWithHeader,
            withBorderBottom,
            ...restOfListItemProps,
          })
          : null
      ))}
    </div>
  );
});

export default NumberedList;
