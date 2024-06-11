import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Dialog } from '@headlessui/react';

interface Props {
  children: ReactNode;
  className?: string;
}

function DialogDescription({ children, className }: Props) {
  return (
    <Dialog.Description
      className={clsx('mt-2 text-sm text-gray-500', className)}
    >
      {children}
    </Dialog.Description>
  );
}

export default DialogDescription;
