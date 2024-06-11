import React, {
  Fragment, memo, useMemo, useRef,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Text from './Text';
import Button from './Button';

interface NotificationModalProps {
  title?: string
  open?: boolean
  setOpen: (params: boolean) => void
  message?: string
  variant?: 'success' | 'failure' | 'warning'
  children?: React.ReactNode
  cancel?: boolean
}

function NotificationModal({
  title, open, setOpen, message, variant, children, cancel,
}: NotificationModalProps) {
  const cancelButtonRef = useRef(null);

  const icon = useMemo(() => {
    switch (variant) {
      case 'success':
        return <CheckIcon className="w-6 h-6 text-green-600" />;
      case 'failure':
        return <ExclamationCircleIcon className="w-6 h-6 text-red-600" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />;
      default:
        return null;
    }
  }, [variant]);

  const indicator = useMemo(() => (
    <div
      className={clsx('mb-5 mx-auto flex items-center justify-center h-12 w-12 rounded-full', {
        'bg-green-100': variant === 'success',
        'bg-red-100': variant === 'failure',
        'bg-yellow-100': variant === 'warning',
      })}
    >
      {icon}
    </div>
  ), [icon, variant]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                {indicator}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    {title}
                  </Dialog.Title>
                  <Text className="mt-2" size="sm" shade="light">
                    {message}
                  </Text>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                {cancel && (
                  <Button variant="white" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                )}
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default memo(NotificationModal);
