import React, { memo } from 'react';
import clsx from 'clsx';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SlideOverHeaderProps {
  className?: string
  title: string
  description?: string
  setOpen?: (params: boolean) => void
}

function SlideOverHeader({
  className = '', title = '', description = '', setOpen = () => { },
}: SlideOverHeaderProps) {
  return (
    <div className={clsx('px-4 py-6 bg-gray-50 sm:px-6', className)}>
      <div className="flex items-start justify-between space-x-3">
        <div className="space-y-1">
          <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="h-7 flex items-center">
          <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setOpen(false)}>
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(SlideOverHeader);
