import { ViewColumnsIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Table } from '@tanstack/react-table';
import Button from '../Button';
import Checkbox from '../Checkbox';
import { Dropdown, DropdownButton, DropdownItems } from '../Dropdown';

type Props = {
  table: Table<any>;
}

function DataGridColumns({ table }: Props) {
  const columns = table.getAllLeafColumns();
  const allVisible = table.getIsAllColumnsVisible();
  const toggleAll = table.getToggleAllColumnsVisibilityHandler();

  return (
    <Dropdown>
      <DropdownButton
        icon={ViewColumnsIcon}
        iconClassName="mr-0 ml-0 lg:mr-2 lg:-ml-1 text-gray-400"
        iconPosition="left"
      >
        <span className="hidden lg:flex">Columns</span>
      </DropdownButton>
      <DropdownItems className="w-40">
        <div className="flex flex-col gap-2 p-2">
          {columns.map((column) => (column.columnDef.enableHiding !== false ? (
            <Checkbox
              key={column.id}
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            >
              { /* eslint-disable-next-line */}
              { /* @ts-ignore-next-line */ }
              {column.columnDef.header}
            </Checkbox>
          ) : null))}
        </div>
        <div className="border-t border-gray-200 p-2">
          <Button className="w-full" size="xs" variant="secondary" onClick={toggleAll}>
            { allVisible ? 'Hide all columns' : 'Show all columns'}
          </Button>
        </div>
      </DropdownItems>
    </Dropdown>
  );
}

export default DataGridColumns;
