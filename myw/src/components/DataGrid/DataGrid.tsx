import React, {
  ReactNode, memo, useCallback, useEffect,
} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  OnChangeFn,
  ColumnFiltersState,
  Table,
  InitialTableState,
  PaginationState,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fuzzyFilter } from './utils';
import DataGridHeader from './DataGridHeader';
import DataGridBody from './DataGridBody';
import DataGridPagination from './DataGridPagination';
import {
  getDataGridSlice,
  setColumnFilters,
  setSorting,
  reset,
} from './dataGridSlice';
import LinearProgress from '../LinearProgress';

export interface DataGridProps {
  data: any[];
  columns: any;
  initialState?: InitialTableState;
  headerClassName?: string;
  headerClassCellName?: string;
  paginationClassName?: string;
  children?: ({ table }: { table: Table<any> }) => ReactNode;
  className?: string;
  isLoading?: boolean;
  onPaginationChange?: OnChangeFn<PaginationState>
  manualPagination?: boolean;
  paginationState?: PaginationState;
  noDataMessage?: string;
  totalCount?: number;
}

function DataGrid({
  data = [],
  columns = [],
  initialState = {},
  headerClassName,
  paginationClassName,
  className,
  children,
  isLoading = false,
  manualPagination = false,
  paginationState,
  headerClassCellName,
  onPaginationChange,
  noDataMessage,
  totalCount,
}: DataGridProps) {
  const dispatch = useDispatch();
  const { globalFilter, columnFilters, sorting } = useSelector(getDataGridSlice);
  const onSortingChange: OnChangeFn<SortingState> = useCallback(
    (newSorting) => {
      dispatch(setSorting(newSorting));
    },
    [dispatch],
  );
  const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    (newFilters) => {
      dispatch(setColumnFilters(newFilters));
    },
    [dispatch],
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      sorting,
      ...(paginationState && { pagination: paginationState }),
    },
    initialState,
    onColumnFiltersChange,
    globalFilterFn: fuzzyFilter,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    sortDescFirst: true,
    manualPagination,
    rowCount: totalCount,
    ...(onPaginationChange && { onPaginationChange }),
  });

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [dispatch],
  );

  return (
    <>
      {children && children({ table })}
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 relative">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className={className}>
            <table className="min-w-full divide-y divide-gray-300">
              <DataGridHeader
                table={table}
                className={headerClassName}
                cellClassName={headerClassCellName}
              />
              {isLoading && (
                <tbody className="relative !h-0 border-none">
                  <tr className="!h-0 border-none">
                    <td className="p-0 !h-0 border-none">
                      <div className="absolute w-full h-1">
                        <LinearProgress />
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
              <DataGridBody table={table} />
              {data.length === 0 && !isLoading && (
                <tbody>
                  <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                      {noDataMessage || 'No data found'}
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            <DataGridPagination
              table={table}
              className={paginationClassName}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(DataGrid);
