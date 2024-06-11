import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import clsx from 'clsx';

interface SwitchProps {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  checkedColor?: string;
}

function Switch({
  checked, className, disabled, checkedColor, onChange,
}: SwitchProps) {
  return (
    <HeadlessSwitch.Group>
      <HeadlessSwitch
        checked={checked}
        className={clsx('relative inline-flex h-6 w-11 items-center rounded-full', {
          [checkedColor || 'bg-primary-600']: checked,
          'bg-gray-200': !checked,
        }, className)}
        disabled={disabled}
        onChange={onChange}
      >
        <span
          className={clsx('inline-block h-5 w-5 transform rounded-full bg-white transition', {
            'translate-x-[1.4rem]': checked,
            'translate-x-[0.15rem]': !checked,
          })}
        />
      </HeadlessSwitch>
    </HeadlessSwitch.Group>
  );
}

export default Switch;
