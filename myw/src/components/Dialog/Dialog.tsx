import React, { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../Button';

interface Props {
  children: ReactNode
  open: boolean,
  onClose?: (open: boolean) => void
  setOpen: (open: boolean) => void
  className?: string
  overlayClassName?: string
  withCloseButton?: boolean
}

function DialogComponent({
  children,
  open,
  onClose = () => { },
  setOpen,
  className = '',
  overlayClassName = '',
  withCloseButton = false,
  ...otherProps
}: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[999] inset-0 overflow-y-auto"
        onClose={(e) => {
          setOpen(false);
          onClose?.(e);
        }}
        {...otherProps}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={clsx('fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity', overlayClassName)} />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={clsx('inline-block relative align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full', className)}>
              {withCloseButton && (
                <Button
                  variant="transparent"
                  className="absolute top-5 right-6 !shadow-none text-gray-400 hover:text-gray-500"
                  componentClassName="!p-0"
                  onClick={() => setOpen(false)}
                  icon={XMarkIcon}
                  iconOnly
                />
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default DialogComponent;
