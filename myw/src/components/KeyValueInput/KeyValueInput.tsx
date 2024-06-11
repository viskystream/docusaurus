import React, { memo, ReactNode } from 'react';
import clsx from 'clsx';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Item {
  key: string
  value: string
  id: string
}

interface Props {
  hint?: string | ReactNode;
  label?: string;
  values?: Item[];
  onChange?: () => void | null;
  onClear?: (id: string) => void | null;
  disabled?: boolean;
  icon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>>
  onIconClick?: () => void | null;
  error?: string
}

function KeyValueInput({
  hint = '',
  label = 'Headers',
  values = [],
  onChange = () => { },
  onClear = () => { },
  disabled = false,
  icon: Icon,
  onIconClick,
  error,
}: Props) {
  return (
    <div>
      <fieldset>
        <legend className="w-full text-sm font-medium text-gray-700 flex justify-between">
          <span>{label}</span>
          {hint && <span className="flex">{hint}</span>}
        </legend>
        <div className="mt-1 bg-white rounded-md shadow-sm -space-y-px">
          {values.map((item, index) => {
            const { key, value, id } = item;

            const keyClass = clsx(
              'focus:ring-primary-500 focus:border-primary-500 relative block w-full rounded-none bg-transparent focus:z-10 sm:text-sm border-gray-300 form-input',
              {
                'rounded-tl-md': index === 0,
                'rounded-bl-md': index === values.length - 1,
                'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': error,
              },
            );

            const valueClass = clsx(
              'focus:ring-primary-500 pr-10 focus:border-primary-500 relative block w-full rounded-none bg-transparent focus:z-10 sm:text-sm border-gray-300 form-input',
              {
                'rounded-tr-md': index === 0,
                'rounded-br-md': index === values.length - 1,
                'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': error,
              },
            );

            return (
              <div className="flex -space-x-px" key={id}>
                <div className="w-1/2 flex-1 min-w-0">
                  <label className="sr-only" htmlFor={`key_${id}`}>Key</label>
                  <input
                    type="text"
                    className={keyClass}
                    placeholder="Key"
                    name="key"
                    id={`key_${id}`}
                    value={key}
                    onChange={onChange}
                    disabled={disabled}
                  />
                </div>
                <div className="relative flex-1 min-w-0">
                  <label htmlFor="card-cvc" className="sr-only">
                    Value
                  </label>
                  <input
                    type="text"
                    className={valueClass}
                    placeholder="Value"
                    name="value"
                    id={`value_${id}`}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                  />
                  {index !== values.length - 1 && (
                    <button
                      tabIndex={-1}
                      type="button"
                      onClick={() => onClear(id)}
                      className="z-10 absolute inset-y-0 right-0 px-3 flex items-center"
                    >
                      <XCircleIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  )}
                  {index === values.length - 1 && Icon && !error && (
                    <button
                      tabIndex={-1}
                      type="button"
                      onClick={onIconClick}
                      className="z-10 absolute inset-y-0 right-0 px-3 flex items-center"
                    >
                      <Icon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  )}
                  {index === values.length - 1 && error && (
                    <div className="z-10 absolute inset-y-0 right-0 px-3 flex items-center">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {error && (
          <p
            className="text-sm text-red-600 mt-2"
          >
            {error}
          </p>
        )}
      </fieldset>
    </div>
  );
}

export default memo(KeyValueInput);
