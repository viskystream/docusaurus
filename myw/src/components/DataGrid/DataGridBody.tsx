import React from 'react';
import { Table, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';

type Props = {
  table: Table<any>;
};

function DataGridBody({ table }: Props) {
  const rowModel = table.getRowModel();

  return (
    <tbody className="divide-y divide-gray-200">
      {rowModel.rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell, i) => (
            <td
              className={clsx(
                'whitespace-nowrap py-4',
                i === 0
                  ? 'pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0'
                  : 'px-3 text-sm text-gray-500',
              )}
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default DataGridBody;
