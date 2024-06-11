import React, { memo, useMemo, ElementType } from 'react';
import Button, { ButtonProps } from './Button';

const Collection = (
  <path
    vectorEffect="non-scaling-stroke"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
  />
);

const PlusCircle = (
  <path
    vectorEffect="non-scaling-stroke"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
  />
);

const FolderAdd = (
  <path
    vectorEffect="non-scaling-stroke"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
  />
);

interface EmptyStateProps<T extends ElementType = 'button'> {
  variant?: 'CollectionIcon' | 'PlusCircleIcon'
  title?: string
  description?: string
  action?: string
  buttonProps?: ButtonProps<T>
  children?: React.ReactNode
}

function EmptyState({
  variant, title = '', description = '', action = '', buttonProps = {}, children,
}: EmptyStateProps) {
  const Icon = useMemo(() => {
    switch (variant) {
      case 'CollectionIcon':
        return Collection;
      case 'PlusCircleIcon':
        return PlusCircle;
      default:
        return FolderAdd;
    }
  }, [variant]);

  return (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        {Icon}
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && (
        <div className="mt-6">
          <Button {...buttonProps} type="button">
            {action}
          </Button>
        </div>
      )}
      {!!children && <div className="mt-6">{children}</div>}
    </div>
  );
}

export default memo(EmptyState);
