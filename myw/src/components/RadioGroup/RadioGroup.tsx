import React, { ElementType, FormEventHandler } from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import Skeleton from '../Skeleton';

interface RadioGroupComponentProps {
  loading?: boolean
  title: string
  options?: { name: string, value: ElementType<any> | string }[]
  value?: ElementType<any> | string
  onChange: ((value: any) => void) | (FormEventHandler<HTMLDivElement> & ((value: any) => void))
}

function RadioGroupComponent({
  loading = false, title, options = [], value, onChange,
}: RadioGroupComponentProps) {
  return (
    <Skeleton active={loading}>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">{title}</h2>
        </div>

        <RadioGroup value={value} onChange={onChange} className="mt-2">
          <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {options.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option.value}
                className={({ active, checked }) => clsx(
                  active ? 'ring-2 ring-offset-2 ring-primary-500' : '',
                  checked
                    ? 'bg-primary-600 border-transparent text-white hover:bg-primary-700'
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                  'cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                )}
              >
                <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </Skeleton>
  );
}

export default RadioGroupComponent;
