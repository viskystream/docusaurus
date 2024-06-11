import React, { memo, ChangeEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';
import { getDataGridSlice, setGlobalFilter } from './dataGridSlice';

interface DataGridGlobalSearchProps {
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}

function DataGridGlobalSearch({ className, value, onChange }: DataGridGlobalSearchProps) {
  const dispatch = useDispatch();
  const { globalFilter } = useSelector(getDataGridSlice);

  return (
    <Input
      className={className}
      icon={MagnifyingGlassIcon}
      placeholder="Search"
      value={value || globalFilter}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e.target.value);
          return;
        }
        dispatch(setGlobalFilter(e.target.value));
      }}
    />
  );
}

export default memo(DataGridGlobalSearch);
