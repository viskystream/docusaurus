import clsx from 'clsx';
import React, { ReactNode } from 'react';
import get from 'lodash.get';

type DataType = number | string | undefined | null

interface TableColumn<T extends object> {
  headerLabel: string
  selector: string
  headerCellClassName?: string
  cellClassName?: string
  cellComponent?: (props: { data: T }) => JSX.Element
}

interface TableRow {
  [key: string]: DataType | object
}

interface TableProps<T extends object> {
  columns: TableColumn<T>[]
  rows: T[]
  footer?: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  density?: 'standard' | 'comfortable' | 'compact' | 'huge'
  footerClassName?: string
}

const variants = {
  primary: {
    wrapper: 'overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg',
    table: 'min-w-full divide-y divide-gray-300',
    header: 'bg-gray-50',
    headerRow: 'bg-gray-50 text-gray-500',
    headerCell: 'text-left text-sm font-semibold text-gray-900',
    cell: 'whitespace-nowrap text-sm text-gray-500',
    row: '',
    footer: 'border',
  },
  secondary: {
    wrapper: '',
    table: '',
    header: 'bg-gray-white',
    headerRow: 'bg-white text-gray-700 border-b',
    headerCell: 'text-xs md:text-base text-left',
    cell: 'text-xs md:text-base text-gray-500',
    row: 'border-b last:border-b-0',
    footer: '',
  },
};

const densities = {
  huge: {
    headerCell: 'px-3 py-4',
    cell: 'px-3 py-7',
  },
  comfortable: {
    headerCell: 'px-3 py-3',
    cell: 'px-3 py-6',
  },
  standard: {
    headerCell: 'px-3 py-3.5',
    cell: 'px-3 py-3.5',
  },
  compact: {
    headerCell: 'px-2 py-1',
    cell: 'px-2 py-1',
  },
};

function Table<T extends TableRow>({
  columns,
  rows,
  footer,
  className = '',
  variant = 'primary',
  density = 'standard',
  footerClassName = '',
}: TableProps<T>) {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 px-2 align-middle md:px-6 lg:px-8">
          <div className={clsx(variants[variant].wrapper)}>
            <table className={clsx(className, variants[variant].table, 'w-full')}>
              <thead className={clsx(variants[variant].header)}>
                <tr className={clsx(variants[variant].headerRow)}>
                  {columns.map(({ headerLabel, headerCellClassName }, headerIndex) => (
                    <th
                      key={`${headerLabel}-${headerIndex}`}
                      scope="col"
                      className={
                        clsx(
                          headerCellClassName,
                          variants[variant].headerCell,
                          densities[density].headerCell,
                        )
                      }
                    >
                      {headerLabel}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row, rowIndex) => (
                  <tr className={clsx(variants[variant].row)} key={rowIndex}>
                    {columns.map(({ selector, cellClassName, cellComponent: CellComponent }, idx) => (
                      <td
                        key={`${selector}-${rowIndex}-${idx}`}
                        className={
                          clsx(
                            cellClassName,
                            variants[variant].cell,
                            densities[density].cell,
                          )
                        }
                      >
                        {CellComponent ? <CellComponent data={row} /> : (get(row, selector) as DataType)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              {footer && (
                <tfoot className="bg-white">
                  <tr>
                    <td
                      colSpan={columns.length}
                      className={
                        clsx(
                          footerClassName,
                          densities[density].cell,
                          variants[variant].cell,
                        )
                      }
                    >
                      {footer}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
