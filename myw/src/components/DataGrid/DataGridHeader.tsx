import React from 'react';
import {
  Table,
  flexRender,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowSmallUpIcon, ArrowSmallDownIcon } from '@heroicons/react/24/solid';

type Props = {
  table: Table<any>;
  className?: string;
  cellClassName?: string;
};

const sortingArrows: Record<string, JSX.Element> = {
  asc: <ArrowSmallUpIcon height={20} />,
  desc: <ArrowSmallDownIcon height={20} />,
};

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

function DataGridHeader({ table, className, cellClassName }: Props) {
  const headerGroups = table.getHeaderGroups();

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id} className={className}>
          {headerGroup.headers.map((header, i) => (
            <th
              colSpan={header.colSpan}
              key={header.id}
              scope="col"
              className={clsx(
                cellClassName,
                'py-3.5 text-left text-sm font-semibold text-gray-900 truncate',
                i === 0 ? 'pl-4 pr-3 sm:pl-6 md:pl-0' : 'px-3',
              )}
            >
              {header.isPlaceholder ? null : (
                <div
                  {...{
                    className: header.column.getCanSort()
                      ? 'cursor-pointer select-none flex gap-1 group'
                      : '',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.columnDef.enableSorting !== false && (
                    sortingArrows[header.column.getIsSorted() as string]
                    ?? <ArrowSmallDownIcon className="invisible group-hover:visible text-gray-400" height={20} />)}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export default DataGridHeader;
