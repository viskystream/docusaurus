import React from 'react';
import { Table } from '@tanstack/react-table';
import clsx from 'clsx';
import Button from '../Button';

type Props = {
  table: Table<any>;
  className?: string;
};

function DataGridPagination({ table, className }: Props) {
  const tableState = table.getState();
  const rowModel = table.getRowModel();
  const count = table.getRowCount();
  const { pageSize, pageIndex } = tableState.pagination;

  const paginationMetadata = {
    positionOfFirstItem: (pageIndex * pageSize) + 1,
    positionOfLastItem: ((pageIndex * pageSize) + rowModel.rows.length),
    currentPage: pageIndex + 1,
    totalCount: count,
  };

  return (
    <div className={clsx('text-sm flex justify-between items-center border-t	border-gray-200 py-4 px-4 sm:px-0', className)}>
      <div>
        Showing
        {' '}
        <strong>{paginationMetadata.totalCount === 0 ? 0 : paginationMetadata.positionOfFirstItem}</strong>
        {' '}
        to
        {' '}
        <strong>{paginationMetadata.positionOfLastItem}</strong>
        {' '}
        of
        {' '}
        <strong>{paginationMetadata.totalCount}</strong>
        {' '}
        results
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="white"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="white"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default DataGridPagination;
