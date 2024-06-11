import React, {
  memo, Fragment, ReactNode, useMemo,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

interface SlideOverProps {
  children?: ReactNode
  open?: boolean
  setOpen?: (open: boolean) => void
  slideFrom?: 'left' | 'right'
  className?: string
}

function SlideOver({
  children,
  open = false,
  setOpen = () => { },
  slideFrom = 'right',
  className = '',
}: SlideOverProps) {
  const transitionPositions = useMemo(() => {
    if (slideFrom === 'right') {
      return {
        enterFrom: 'translate-x-full',
        enterTo: 'translate-x-0',
        leaveFrom: 'translate-x-0',
        leaveTo: 'translate-x-full',
      };
    }

    return {
      enterFrom: '-translate-x-full',
      enterTo: '-translate-x-0',
      leaveFrom: '-translate-x-0',
      leaveTo: '-translate-x-full',
    };
  }, [slideFrom]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="z-30 fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div
            className={clsx('fixed inset-y-0 max-w-full flex', {
              'right-0 pl-10 sm:pl-16': slideFrom === 'right',
              'left-0 pr-10 sm:pr-16': slideFrom === 'left',
            }, className)}
          >
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom={transitionPositions.enterFrom}
              enterTo={transitionPositions.enterTo}
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom={transitionPositions.leaveFrom}
              leaveTo={transitionPositions.leaveTo}
            >
              <div className="w-screen max-w-2xl">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default memo(SlideOver);
