/* eslint-disable no-use-before-define */
import { Column, Header, Table } from '@tanstack/react-table';
import React, {
  ChangeEvent, Fragment, useMemo, useState,
} from 'react';
import ActiveFilter from './ActiveFilter';
import Button from '../../Button';
import Input from '../../Input';
import { FiltersVariant } from './Filters';

interface FilterProps<T> {
  header?: Header<T, unknown>;
  column: Column<T, unknown>;
  table: Table<T>;
  variant: FiltersVariant;
}

function Filter<T>({ column, table, variant }: FilterProps<T>) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  const filterValue = column.getFilterValue();
  const isNumber = typeof firstValue === 'number';
  const clearFilter = (value: string | number) => {
    column.setFilterValue((prev: any) => {
      if (Array.isArray(prev)) {
        return prev.filter((item) => item !== value);
      }
      if (typeof prev === 'string' || typeof prev === 'number') {
        return value;
      }
      return prev;
    });
  };

  return (
    <div className="border-t border-gray-200 py-4">
      <h3 className="font-semibold capitalize">{column.id}</h3>
      <div>
        <div>
          {isNumber && filterValue ? (
            <div className="my-2">
              <ActiveFilter
                variant={variant}
                value={`MIN: ${
                  filterValue[0 as keyof typeof filterValue] || 'N/A'
                }  MAX: ${filterValue[1 as keyof typeof filterValue] || 'N/A'}`}
                onClick={() => column.setFilterValue(undefined)}
              />
            </div>
          ) : null}
        </div>
        <div>
          {Array.isArray(filterValue) && !isNumber && (
            <div className="my-2 flex gap-2 flex-wrap">
              {filterValue.map((value) => (
                <ActiveFilter value={value} onClick={clearFilter} key={value} variant={variant} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        {isNumber ? (
          <NumberInput column={column} variant={variant} />
        ) : (
          <StringInput column={column} variant={variant} />
        )}
      </div>
    </div>
  );
}

export default Filter;

interface NumberInputProps<T> {
  column: Column<T, unknown>;
  variant: FiltersVariant;
}

function NumberInput<T>({ column, variant }: NumberInputProps<T>) {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  return (
    <Fragment>
      <div className="flex justify-between gap-2">
        <Input
          type="number"
          className="w-32"
          min={0}
          value={minValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMinValue(e.target.value)}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
        />
        <Input
          type="number"
          className="w-32"
          value={maxValue}
          min={minValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxValue(e.target.value)}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
        />
      </div>
      <Button
        size="xs"
        className="mt-2"
        variant={variant}
        onClick={() => {
          column.setFilterValue([minValue, maxValue]);
          setMaxValue('');
          setMinValue('');
        }}
      >
        Apply
      </Button>
    </Fragment>
  );
}

interface StringInputProps<T> {
  column: Column<T, unknown>;
  variant: FiltersVariant;
}

function StringInput<T>({ column, variant }: StringInputProps<T>) {
  const [value, setValue] = useState('');
  const hasArrayFilterFn = useMemo(
    () => column.getFilterFn()?.toString().includes('.some'),
    [column],
  );
  const sortedUniqueValues = React.useMemo(() => {
    const activeFilterValues = column.getFilterValue();
    let uniqueValues = Array.from(
      column.getFacetedUniqueValues().keys(),
    ).sort();

    if (hasArrayFilterFn && Array.isArray(activeFilterValues)) {
      uniqueValues = uniqueValues.filter(
        (filterValue) => !activeFilterValues.includes(filterValue),
      );
    }
    return uniqueValues;
  }, [column.getFacetedUniqueValues()]);

  return (
    <Fragment>
      <datalist id={`${column.id}list`}>
        {sortedUniqueValues.slice(0, 5000).map((uniqueValue) => (
          <option value={uniqueValue} key={uniqueValue} />
        ))}
      </datalist>
      <div className="flex gap-4">
        <Input
          className="flex-1"
          list={`${column.id}list`}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        <Button
          size="xs"
          variant={variant}
          onClick={() => {
            if (hasArrayFilterFn) {
              column.setFilterValue((prev?: string[]) => {
                const newValue = prev?.filter((prevVal) => prevVal !== value);
                return [...(newValue ?? []), value];
              });
            } else {
              column.setFilterValue(value);
            }
            setValue('');
          }}
        >
          Add
        </Button>
      </div>
    </Fragment>
  );
}
