import React from 'react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';

type Props = {
  label: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};

function SwitchComponent({ label, enabled, setEnabled }: Props) {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={clsx(
          enabled ? 'bg-primary-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm font-medium text-gray-700">
        {label}
      </Switch.Label>
    </Switch.Group>
  );
}

export default SwitchComponent;
