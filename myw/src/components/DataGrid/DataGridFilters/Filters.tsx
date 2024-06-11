import React, { useMemo } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { Table } from '@tanstack/react-table';
import clsx from 'clsx';
import Filter from './Filter';
import Button from '../../Button';
import { Dropdown, DropdownButton, DropdownItems } from '../../Dropdown';

export type FiltersVariant = 'primary' | 'navy';

interface FiltersProps {
  className?: string;
  table: Table<any>;
  iconOnly?: boolean;
  dropdownPosition?: 'left' | 'right';
  variant?: FiltersVariant;
  excludeColumns?: string[];
}

function Filters({
  className,
  table,
  iconOnly,
  dropdownPosition,
  variant = 'primary',
  excludeColumns = [],
}: FiltersProps) {
  const allColumns = useMemo(() => table?.getAllLeafColumns() ?? [], [table]);
  const { columnFilters: allColumnFilters } = table?.getState() ?? {
    columnFilters: [],
  };
  const clearAllFilters = () => table?.resetColumnFilters();
  const columnFilters = useMemo(
    () => allColumnFilters.filter(({ id }) => !excludeColumns.includes(id)),
    [allColumnFilters, excludeColumns],
  );
  const columns = useMemo(
    () => allColumns.filter(({ id }) => !excludeColumns.includes(id)),
    [allColumns, excludeColumns],
  );

  const filterCount = useMemo(() => {
    let total = 0;
    columnFilters.forEach(({ value }) => {
      if (Array.isArray(value)) {
        total += value.length;
      } else if (value) {
        total += 1;
      }
    });
    return total;
  }, [columnFilters]);

  return (
    <Dropdown>
      <DropdownButton
        className={className}
        icon={FunnelIcon}
        iconClassName={clsx('text-gray-400', {
          'mr-0 ml-0 lg:mr-2 lg:-ml-1': !iconOnly,
          '!m-0': iconOnly,
        })}
        iconPosition="left"
      >
        {!iconOnly && <span className="hidden lg:flex">Filters</span>}
        {!!filterCount && (
          <span
            className={clsx(
              'absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full p-2 text-xs text-white shadow-md',
              {
                'bg-primary-500': variant === 'primary',
                'bg-navy-700': variant === 'navy',
              },
            )}
          >
            {filterCount}
          </span>
        )}
      </DropdownButton>
      <DropdownItems
        className="max-h-[calc(100vh-20rem)] w-[20rem] !overflow-auto p-4"
        position={dropdownPosition}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Filters</h2>
          {clearAllFilters && (
            <Button size="xs" variant="red" onClick={clearAllFilters}>
              Clear all
            </Button>
          )}
        </div>
        <div>
          {table
            && columns.map((column) => (column.getCanFilter() ? (
              <Filter
                key={column.id}
                column={column}
                table={table}
                variant={variant}
              />
            ) : null))}
        </div>
      </DropdownItems>
    </Dropdown>
  );
}

export default Filters;
