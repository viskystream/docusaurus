import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Dialog } from '@headlessui/react';

interface Props {
  children: ReactNode;
  className?: string;
}

function DialogTitle({ children, className }: Props) {
  return (
    <Dialog.Title
      className={clsx('text-lg leading-6 font-medium text-gray-900', className)}
    >
      {children}
    </Dialog.Title>
  );
}

export default DialogTitle;
