import React, {
  memo, Fragment, FormEventHandler, ElementType,
} from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import Skeleton from '../Skeleton';

interface Option {
  name: string,
  description: string
}

interface RadioGroupListProps {
  loading?: boolean
  label?: string
  options?: Option[]
  onChange: ((value: any) => void) | (FormEventHandler<HTMLDivElement> & ((value: any) => void))
  value?: ElementType<any> | Option
}

/**
 * Used:
 * apps/events
 */
function RadioGroupList({
  loading = false, label, options = [], value, onChange,
}: RadioGroupListProps) {
  return (
    <Skeleton active={loading}>
      <RadioGroup value={value} onChange={onChange} className="mt-2">
        {label && <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>}
        <div className="bg-white rounded-md -space-y-px">
          {options.map((option, optionIndex) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ checked }) => clsx(
                optionIndex === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                optionIndex === options.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                checked ? 'bg-primary-50 border-primary-200 z-10' : 'border-gray-200',
                'relative border p-4 flex cursor-pointer focus:outline-none',
              )}
            >
              {({ active, checked }) => (
                <Fragment>
                  <span
                    className={clsx(
                      checked ? 'bg-primary-600 border-transparent' : 'bg-white border-gray-300',
                      active ? 'ring-2 ring-offset-2 ring-primary-500' : '',
                      'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center',
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <div className="ml-3 flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={clsx(
                        checked ? 'text-primary-900' : 'text-gray-900',
                        'block text-sm font-medium',
                      )}
                    >
                      {option.name}
                    </RadioGroup.Label>
                    {option.description && (
                      <RadioGroup.Description
                        as="span"
                        className={clsx(checked ? 'text-primary-700' : 'text-gray-500', 'block text-sm')}
                      >
                        {option.description}
                      </RadioGroup.Description>
                    )}
                  </div>
                </Fragment>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </Skeleton>
  );
}

export default memo(RadioGroupList);
